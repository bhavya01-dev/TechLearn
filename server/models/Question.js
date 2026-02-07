import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Easy", "Medium", "Hard"], default: "Medium" },
  description: { type: String, required: true },
  problemStatement: { type: String, required: true },
  sampleInput: String,
  sampleOutput: String,
  starterCode: {
    type: Map,
    of: String
  },
  testCases: [{
    id: Number,
    input: mongoose.Schema.Types.Mixed,
    expected: mongoose.Schema.Types.Mixed,
    isHidden: { type: Boolean, default: false }
  }],
  hints: [String],
  solution: { type: String, select: false }, // Hidden by default
  activeDate: { type: String, required: true, unique: true } // Format: YYYY-MM-DD
});

export default mongoose.model("Question", questionSchema);
