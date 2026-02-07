import { Router } from "express";
import leaderboard from "../controllers/leaderboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:difficulty", authMiddleware, leaderboard);

export default router;
