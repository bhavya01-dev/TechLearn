import User from "../models/User.js";
import Submission from "../models/Submission.js";

const leaderboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.plan !== "PAID") {
      return res.status(403).json({
        message: "Upgrade to paid plan to appear on leaderboard"
      });
    }

    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    const leaderboardData = await Submission.find({
      difficulty: req.params.difficulty,
      result: "Correct",
      submittedAt: { $gte: start, $lte: end }
    }).populate("userId", "name");

    res.json(leaderboardData);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default leaderboard;