import Question from '../models/Question.js';

// Fetch today's question
export const getTodayQuestion = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const question = await Question.findOne({ activeDate: today });

    if (!question) {
      return res.status(404).json({ message: "No question assigned for today." });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Evaluation

// 1. Define the Judge0 Language IDs
const LANGUAGE_MAP = {
  "java": 62,   // OpenJDK 13
  "python": 71, // Python 3.8.1
  "c": 54       // GCC 9.2.0
};

export const submitSolution = async (req, res) => {
  try {
    const { questionId, code, language } = req.body; // language will be "c", "python", or "java"

    // 2. Look up the ID based on the incoming request
    const languageId = LANGUAGE_MAP[language.toLowerCase()];

    if (!languageId) {
      return res.status(400).json({ message: "Unsupported language" });
    }

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    // 3. Dynamic Fetch call
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.JUDGE0_KEY 
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId, // Dynamic ID based on user selection
        stdin: question.sampleInput,
        expected_output: question.sampleOutput
      })
    });

    const judgeResult = await response.json();

    res.status(200).json({
      status: judgeResult.status.description,
      runtime: judgeResult.time,
      memory: judgeResult.memory,
      stdout: judgeResult.stdout
    });

  } catch (error) {
    res.status(500).json({ message: "Evaluation failed", error: error.message });
  }
};