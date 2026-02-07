import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "./models/Question.js";

dotenv.config();

const questions = [
  {
    title: "1. Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    problemStatement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    sampleInput: "nums = [2,7,11,15], target = 9",
    sampleOutput: "[0,1]",
    starterCode: {
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Your code here\n        pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}"
    },
    testCases: [
      { id: 1, input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], isHidden: false },
      { id: 2, input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], isHidden: false }
    ],
    hints: ["Try using a hash map to store values.", "What if you store the complement?"],
    solution: "Use a hash map to store each number's index. For each number, check if target - num exists in the map.",
    activeDate: new Date().toISOString().split("T")[0]
  },
  {
    title: "2. Palindrome Number",
    difficulty: "Easy",
    description: "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.",
    problemStatement: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    sampleInput: "x = 121",
    sampleOutput: "true",
    starterCode: {
      python: "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        # Your code here\n        pass",
      java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Your code here\n        return false;\n    }\n}"
    },
    testCases: [
      { id: 1, input: { x: 121 }, expected: true, isHidden: false },
      { id: 2, input: { x: -121 }, expected: false, isHidden: false }
    ],
    hints: ["Negative numbers are not palindromes.", "Can you reverse only half of the number?"],
    solution: "Reverse half the number and compare with the other half to avoid overflow.",
    activeDate: new Date(Date.now() + 86400000).toISOString().split("T")[0]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();
