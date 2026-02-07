import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';

dotenv.config();

const questions = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
    activeDate: new Date().toISOString().split('T')[0] // Today's Date
  },
  {
    title: "Reverse Integer",
    difficulty: "Medium",
    problemStatement: "Given a signed 32-bit integer x, return x with its digits reversed.",
    sampleInput: "x = 123",
    sampleOutput: "321",
    activeDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany(); // Clears existing questions
    await Question.insertMany(questions);
    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();