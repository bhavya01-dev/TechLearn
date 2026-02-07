import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  problemStatement: { type: String, required: true },
  sampleInput: String,
  sampleOutput: String,
  solution: { type: String, select: false }, // Hidden by default
  activeDate: { type: String, required: true, unique: true } // Format: YYYY-MM-DD
});

export default mongoose.model('Question', questionSchema);