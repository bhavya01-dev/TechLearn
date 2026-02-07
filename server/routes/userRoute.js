import express from "express";
import {loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router()

// Route: POST /api/v1/user/register
// Desc:  Register a new user
userRouter.post("/register", registerUser);

// Route: POST /api/v1/user/login
// Desc:  Login an existing user
userRouter.post("/login", loginUser);

export default userRouter;