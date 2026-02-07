import express from 'express';
import { getTodayQuestion, submitSolution } from '../controllers/qotdController.js';
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// Route: GET /api/v1/qotd
// Desc:  Fetch the daily challenge
router.get('/', getTodayQuestion);

// Route: POST /api/v1/qotd/submit
// Desc:  Submit code for evaluation, restrict the submition for once a day and leaderboard details
router.post("/submit", authMiddleware, submitSolution);

export default router;