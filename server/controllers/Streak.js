import AttendanceCategory from "../models/AttendanceCategory.js";
import AttendanceRecord from "../models/AttendanceRecord.js";
import Streak from "../models/Streak.js";
import User from "../models/User.js";


export const generateOrUpdateAnalytics = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { categoryId, date } = req.body;

    if (!categoryId || !date) {
      return res.status(400).json({ success: false, message: "categoryId and date are required" });
    }

    const parsedDate = new Date(date);

    
    const startOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), 1);
    const endOfMonth = new Date(parsedDate.getFullYear(), parsedDate.getMonth() + 1, 0);

    
    const records = await AttendanceRecord.find({
      userId,
      categoryId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    
    let presentDays = 0,
      absentDays = 0,
      leaveDays = 0,
      longestStreak = 0,
      currentStreak = 0;

    records.forEach((rec) => {
      if (rec.status === "present") {
        presentDays++;
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        if (rec.status === "absent") absentDays++;
        if (rec.status === "leave") leaveDays++;
        currentStreak = 0; 
      }
    });

    const totalDays = records.length;

    
    let analytics = await Streak.findOne({ userId, month: startOfMonth });

    if (!analytics) {
      analytics = new Streak({ userId, month: startOfMonth });
    }

    
    analytics.totalDays = totalDays;
    analytics.presentDays = presentDays;
    analytics.absentDays = absentDays;
    analytics.leaveDays = leaveDays;
    analytics.longestStreak = longestStreak;

    await Streak.save();

    return res.status(200).json({
      success: true,
      message: "Analytics generated/updated successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Error in generateOrUpdateAnalytics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate analytics",
      error: error.message,
    });
  }
};


export const getMonthlyAnalytics = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month and year are required (e.g. ?month=8&year=2025)",
      });
    }

    
    const startOfMonth = new Date(year, month - 1, 1); 
    const endOfMonth = new Date(year, month, 0);

    const analytics = await Streak.findOne({
      userId,
      month: startOfMonth,
    });

    if (!analytics) {
      return res.status(404).json({
        success: false,
        message: "No analytics found for this month",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Monthly analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Error in getMonthlyAnalytics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly analytics",
      error: error.message,
    });
  }
};

export const getAllAnalytics = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const analytics = await Streak.find({ userId }).sort({ month: 1 }); 

    if (!analytics || analytics.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No analytics data found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    console.error("Error in getAllAnalytics:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};


export const getStreaks = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const records = await AttendanceRecord.find({ userId })
      .sort({ date: 1 }) 
      .lean();

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found",
      });
    }

    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    
    for (let i = 0; i < records.length; i++) {
      if (records[i].status === "present") {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }

    
    for (let i = records.length - 1; i >= 0; i--) {
      if (records[i].status === "present") {
        currentStreak++;
      } else {
        break; 
      }
    }

    return res.status(200).json({
      success: true,
      message: "Streaks fetched successfully",
      data: {
        currentStreak,
        longestStreak,
      },
    });
  } catch (error) {
    console.error("Error in getStreaks:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch streaks",
      error: error.message,
    });
  }
};