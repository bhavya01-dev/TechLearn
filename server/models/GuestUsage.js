import mongoose from "mongoose";

const guestUsageSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  date: {
    type: String,
    required: true
  },
  dailyRunCount: {
    type: Number,
    default: 0
  },
  hasSubmitted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("GuestUsage", guestUsageSchema);
