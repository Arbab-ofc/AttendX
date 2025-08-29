import mongoose from "mongoose";

const attendanceCategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

attendanceCategorySchema.index({ userId: 1, title: 1 }, { unique: true });

export default mongoose.model("AttendanceCategory", attendanceCategorySchema);
