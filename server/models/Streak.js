import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: Date, 
    required: true,
  },
  totalDays: { type: Number, default: 0 },
  presentDays: { type: Number, default: 0 },
  absentDays: { type: Number, default: 0 },
  leaveDays: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
});
analyticsSchema.index({ userId: 1, month: 1 }, { unique: true });

export default mongoose.model('Analytics', analyticsSchema);