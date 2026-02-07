import Submission from "../models/Submission.js";

const leaderboard = async (req, res) => {
  try {
    const rawDifficulty = req.params.difficulty;
    const normalized = (rawDifficulty || "").toLowerCase();
    const difficulty = normalized === "easy" || normalized === "beginner"
      ? "Beginner"
      : normalized === "medium" || normalized === "intermediate"
        ? "Intermediate"
        : normalized === "hard" || normalized === "advanced"
          ? "Advanced"
          : null;

    if (!difficulty) {
      return res.status(400).json({ message: "Please choose a valid difficulty: Beginner, Intermediate, or Advanced." });
    }

    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const leaderboardData = await Submission.find({
      difficulty,
      result: "Correct",
      submittedAt: { $gte: start, $lte: end }
    })
      .sort({ submittedAt: 1 })
      .populate({
        path: "userId",
        select: "name plan",
        match: { plan: "PAID" }
      });

    const filtered = leaderboardData.filter(sub => sub.userId !== null);

    res.json(filtered.map((sub, index) => ({
      rank: index + 1,
      username: sub.userId.name,
      result: sub.result,
      submittedAt: sub.submittedAt
    })));
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong on our end. We're looking into it!" });
  }
};

export default leaderboard;
