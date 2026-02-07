import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true
  },
  code: String,
  language: String,
  result: {
    type: String,
    enum: ["Correct", "Incorrect"]
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Submission", submissionSchema);
