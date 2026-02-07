import express from 'express';
import { getMyStats, getSolution, getTodayQuestion, submitSolution } from '../controllers/qotdController.js';
import authMiddleware from "../middleware/authMiddleware.js";
import optionalAuth from "../middleware/optionalAuth.js";


const router = express.Router();

// Route: GET /api/v1/qotd
// Desc:  Fetch the daily challenge (optionally authenticated)
router.get('/', optionalAuth, getTodayQuestion);

// Route: POST /api/v1/qotd/submit
// Desc:  Submit code for evaluation, restrict the submition for once a day and leaderboard details
router.post("/submit", optionalAuth, submitSolution);

// Desc:  Paid-only personal stats
router.get("/stats", authMiddleware, getMyStats);

// Desc:  Paid-only solution access
router.get("/solution/:questionId", authMiddleware, getSolution);

export default router;
