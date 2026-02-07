import express from "express";
import leaderboard from "../controllers/leaderboardController.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router = express.Router();

router.get("/:difficulty", optionalAuth, leaderboard);

export default router;
