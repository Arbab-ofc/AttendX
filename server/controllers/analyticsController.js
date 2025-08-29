import AttendanceRecord from "../models/AttendanceRecord.js";
import mongoose from "mongoose";

export const getLineAnalytics = async (req, res) => {
  try {
    const { userId } = req.user; 
    const { days = 7 } = req.query; 

    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

   
    const records = await AttendanceRecord.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$date" },
            month: { $month: "$date" },
            year: { $year: "$date" },
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    
    const trendMap = {};
    records.forEach((rec) => {
      const dateKey = `${rec._id.year}-${rec._id.month}-${rec._id.day}`;
      if (!trendMap[dateKey]) {
        trendMap[dateKey] = { Present: 0, Absent: 0, Leave: 0 };
      }
      if (rec._id.status === "present") trendMap[dateKey].Present = rec.count;
      if (rec._id.status === "absent") trendMap[dateKey].Absent = rec.count;
      if (rec._id.status === "leave") trendMap[dateKey].Leave = rec.count;
    });

    
    const result = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      result.push({
        name: weekday,
        Present: trendMap[key]?.Present || 0,
        Absent: trendMap[key]?.Absent || 0,
        Leave: trendMap[key]?.Leave || 0,
      });
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching line analytics" });
  }
};
