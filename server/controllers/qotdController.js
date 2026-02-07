import crypto from "crypto";
import Question from '../models/Question.js';
import User from '../models/User.js';
import Submission from "../models/Submission.js";
import GuestUsage from "../models/GuestUsage.js";

// Fetch today's question
export const getTodayQuestion = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const question = await Question.findOne({ activeDate: today });

    if (!question) {
      return res.status(404).json({ message: "No question assigned for today." });
    }

    let userProgress = {
      runsRemaining: 2,
      hasSubmitted: false,
      isPaidUser: false
    };

    if (req.user) {
      const user = await User.findById(req.user.id);
      if (user) {
        if (typeof user.dailyRunCount !== "number") {
          user.dailyRunCount = 0;
        }
        if (user.lastRunDate !== today) {
          user.dailyRunCount = 0;
          user.lastRunDate = today;
          await user.save();
        }
        const maxRuns = user.plan === "PAID" ? 4 : 2;
        const lastSubDate = user.lastSubmissionDate ? user.lastSubmissionDate.toISOString().split('T')[0] : null;
        userProgress = {
          runsRemaining: Math.max(0, maxRuns - user.dailyRunCount),
          hasSubmitted: lastSubDate === today,
          isPaidUser: user.plan === "PAID"
        };
      }
    } else {
      const guest = await getGuestUsage(req, today, false);
      if (guest) {
        userProgress = {
          runsRemaining: Math.max(0, 2 - guest.dailyRunCount),
          hasSubmitted: guest.hasSubmitted === true,
          isPaidUser: false
        };
      }
    }

    res.status(200).json({
      ...question.toObject(),
      userProgress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Evaluation

// 1. Define the Judge0 Language IDs
const LANGUAGE_MAP = {
  "java": 62,   // OpenJDK 13
  "python": 71  // Python 3.8.1
};

const difficultyToLeaderboard = (difficulty) => {
  const normalized = (difficulty || "").toLowerCase();
  if (normalized === "beginner" || normalized === "easy") return "Beginner";
  if (normalized === "intermediate" || normalized === "medium") return "Intermediate";
  if (normalized === "advanced" || normalized === "hard") return "Advanced";
  return "Beginner";
};

const getGuestKey = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(",")[0]?.trim()
    || req.ip
    || "unknown-ip";
  const userAgent = req.headers["user-agent"] || "unknown-ua";
  return crypto.createHash("sha256").update(`${ip}|${userAgent}`).digest("hex");
};

const getGuestUsage = async (req, today, createIfMissing) => {
  const key = getGuestKey(req);
  let guest = await GuestUsage.findOne({ key });
  if (!guest) {
    if (!createIfMissing) return null;
    return GuestUsage.create({ key, date: today, dailyRunCount: 0, hasSubmitted: false });
  }
  if (guest.date !== today) {
    guest.date = today;
    guest.dailyRunCount = 0;
    guest.hasSubmitted = false;
    if (createIfMissing) {
      await guest.save();
    }
  }
  return guest;
};

export const submitSolution = async (req, res) => {
  try {
    const { questionId, code, language, isSubmit } = req.body;

    const today = new Date().toISOString().split('T')[0];
    let user = null;
    let guest = null;
    let maxRuns = 2;
    let runsRemaining = 2;

    if (req.user) {
      user = await User.findById(req.user.id);
      if (user) {
        if (typeof user.dailyRunCount !== "number") {
          user.dailyRunCount = 0;
        }
        if (user.lastRunDate !== today) {
          user.dailyRunCount = 0;
          user.lastRunDate = today;
        }
        maxRuns = user.plan === "PAID" ? 4 : 2;
        runsRemaining = Math.max(0, maxRuns - user.dailyRunCount);
      }
    }

    if (user) {
      if (user.dailyRunCount >= maxRuns) {
        return res.status(429).json({
          message: "You've reached your daily run limit. Try again tomorrow or upgrade for more!",
          runsRemaining: 0,
          plan: user.plan
        });
      }

      const lastSubmissionDateStr = user.lastSubmissionDate
        ? user.lastSubmissionDate.toISOString().split('T')[0]
        : null;

      if (isSubmit && lastSubmissionDateStr === today) {
        return res.status(400).json({
          message: "You've already submitted a solution today. High-five! See you tomorrow."
        });
      }
    } else {
      guest = await getGuestUsage(req, today, true);
      if (guest.dailyRunCount >= maxRuns) {
        return res.status(429).json({
          message: "You've reached your daily run limit. Try again tomorrow!",
          runsRemaining: 0,
          plan: "FREE"
        });
      }
      if (isSubmit && guest.hasSubmitted) {
        return res.status(400).json({
          message: "You've already submitted today. Come back tomorrow for a new challenge!"
        });
      }
    }

    // 2. Look up the ID based on the incoming request
    const languageId = LANGUAGE_MAP[language.toLowerCase()];

    if (!languageId) {
      return res.status(400).json({ message: "Oops! We don't support that language yet." });
    }

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Ouch! We couldn't find that question." });

    // 3. Dynamic Fetch call
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_KEY
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: question.sampleInput,
        expected_output: question.sampleOutput
      })
    });

    const judgeResult = await response.json();

    if (!judgeResult || !judgeResult.status) {
      return res.status(500).json({
        message: "Our compiler is having a short nap. Please try again in a moment.",
        judgeResult
      });
    }

    let submissionSaved = false;
    const leaderboardDifficulty = difficultyToLeaderboard(question.difficulty);

    if (user) {
      user.dailyRunCount += 1;
      runsRemaining = Math.max(0, maxRuns - user.dailyRunCount);

      if (isSubmit) {
        const isCorrect = judgeResult.status.description === "Accepted";
        await Submission.create({
          userId: user._id,
          questionId: question._id,
          difficulty: leaderboardDifficulty,
          code,
          language,
          result: isCorrect ? "Correct" : "Incorrect"
        });
        user.lastSubmissionDate = new Date();
        submissionSaved = true;
      }
      await user.save();
    } else if (guest) {
      guest.dailyRunCount += 1;
      runsRemaining = Math.max(0, maxRuns - guest.dailyRunCount);

      if (isSubmit) {
        const isCorrect = judgeResult.status.description === "Accepted";
        await Submission.create({
          userId: null,
          questionId: question._id,
          difficulty: leaderboardDifficulty,
          code,
          language,
          result: isCorrect ? "Correct" : "Incorrect"
        });
        guest.hasSubmitted = true;
      }
      await guest.save();
    }

    res.status(200).json({
      status: judgeResult.status.description,
      runtime: judgeResult.time,
      memory: judgeResult.memory,
      stdout: judgeResult.stdout,
      runsRemaining,
      hasSubmitted: submissionSaved || (user?.lastSubmissionDate && user.lastSubmissionDate.toISOString().split('T')[0] === today) || (guest?.hasSubmitted === true)
    });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong on our end. We're looking into it!", error: error.message });
  }
};

export const getMyStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "Please log in to view your stats." });
    if (user.plan !== "PAID") {
      return res.status(403).json({ message: "Upgrade to a paid plan to view personal stats." });
    }

    const totalCorrect = await Submission.countDocuments({ userId: user._id, result: "Correct" });
    const totalIncorrect = await Submission.countDocuments({ userId: user._id, result: "Incorrect" });
    const totalSubmissions = totalCorrect + totalIncorrect;

    res.status(200).json({
      totalSubmissions,
      totalCorrect,
      totalIncorrect
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on our end. We're looking into it!", error: error.message });
  }
};

export const getSolution = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "Please log in to view solutions." });
    if (user.plan !== "PAID") {
      return res.status(403).json({ message: "Upgrade to a paid plan to view solutions." });
    }

    const question = await Question.findById(req.params.questionId).select("+solution");
    if (!question) return res.status(404).json({ message: "Ouch! We couldn't find that question." });
    if (!question.solution) {
      return res.status(404).json({ message: "Solution is not available for this question yet." });
    }

    res.status(200).json({ solution: question.solution });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong on our end. We're looking into it!", error: error.message });
  }
};
