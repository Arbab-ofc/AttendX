import mongoose from "mongoose";

const attendanceRecordSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "AttendanceCategory", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["present", "absent", "leave"], required: true },
  createdAt: { type: Date, default: Date.now },
});

attendanceRecordSchema.index({ categoryId: 1, date: 1 }, { unique: true });

export default mongoose.model("AttendanceRecord", attendanceRecordSchema);
