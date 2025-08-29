import User from "../models/User.js";
import AttendanceCategory from "../models/AttendanceCategory.js";
import AttendanceRecord from "../models/AttendanceRecord.js";
import { Parser } from "json2csv";
import mongoose from "mongoose";

export const markAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;
    const { date, status } = req.body;

    const validStatuses = ["present", "absent", "leave"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    
    const [year, month, day] = date.split("-").map(Number);
    const localMidnightUTC = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

    let record = await AttendanceRecord.findOne({
      userId,
      categoryId,
      date: localMidnightUTC,
    });
    

    if (record) {
      record.status = status;
      await record.save();
      return res.status(200).json({
        success: true,
        message: "Attendance updated successfully",
        data: record,
      });
    }

    record = new AttendanceRecord({
      userId,
      categoryId,
      date: localMidnightUTC,
      status,
    });
    await record.save();

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};




export const getAttendanceByDate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.body;
    const { date } = req.query; 

    if (!userId) {
      return res.status(400).json({ message: "Date is required" });
    }
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    if (!categoryId) {
      return res.status(400).json({ message: "Date is required" });
    }

    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }
    console.log(category)
    console.log(date)
    console.log(categoryId)


    
    const [year, month, day] = date.split("-").map(Number);
    const localMidnightUTC = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

   
    const record = await AttendanceRecord.findOne({
      userId,
      categoryId,
      date: localMidnightUTC,
    });
    console.log(record)

    if (!record) {
      return res.status(200).json({
        success: true,
        message: "No attendance marked for this date",
        data: null,
      });
    }

    let recordId = record._id;

    res.status(200).json({
      success: true,
      message: "Attendance fetched successfully",
      data: record,
      recordId: recordId,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAttendanceByMonth = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;
    const { month, year } = req.query; 
    console.log("Hi")
    console.log(categoryId)
    console.log(month)
    console.log(year)
    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required" });
    }

    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); 
    endDate.setHours(23, 59, 59, 999);

    
    const records = await AttendanceRecord.find({
      userId,
      categoryId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Monthly attendance fetched successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching monthly attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const updateAttendance = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { categoryId, recordId } = req.params;
    const { status } = req.body; 

    const validStatuses = ["present", "absent", "leave"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    
    const record = await AttendanceRecord.findOne({ _id: recordId, userId, categoryId });
    if (!record) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    
    record.status = status;
    await record.save();

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { categoryId, recordId } = req.params;

   
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    const record = await AttendanceRecord.findOneAndDelete({
      _id: recordId,
      userId,
      categoryId,
    });

    if (!record) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error deleting attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const exportAttendanceCSV = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;

    
    const category = await AttendanceCategory.findOne({ _id: categoryId, userId });
    if (!category) {
      return res.status(404).json({ message: "Category not found or unauthorized" });
    }

    
    const records = await AttendanceRecord.find({ userId, categoryId }).sort({ date: 1 });

    if (!records || records.length === 0) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    
    const fields = ["date", "status", "createdAt"];
    const opts = { fields };

    
    const parser = new Parser(opts);
    const csv = parser.parse(
      records.map((rec) => ({
        date: rec.date.toISOString().split("T")[0],
        status: rec.status,
        createdAt: rec.createdAt.toISOString(),
      }))
    );

    res.header("Content-Type", "text/csv");
    res.attachment(`attendance_${category.title}.csv`);
    return res.send(csv);
  } catch (error) {
    console.error("Error exporting attendance CSV:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



export const getAttendanceStats = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { categoryId, month, year } = req.query;

    
    const match = { userId: new mongoose.Types.ObjectId(userId) };

    if (categoryId) {
      if (!mongoose.isValidObjectId(categoryId)) {
        return res.status(400).json({ success: false, message: "Invalid categoryId" });
      }
      match.categoryId = new mongoose.Types.ObjectId(categoryId);
    }

    
    if (month && year) {
      const m = Number(month), y = Number(year);
      if (
        !Number.isInteger(m) || !Number.isInteger(y) ||
        m < 1 || m > 12 || y < 1970
      ) {
        return res.status(400).json({ success: false, message: "Invalid month/year" });
      }
      const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0, 0));
      const end = new Date(Date.UTC(y, m, 0, 23, 59, 59, 999));
      match.date = { $gte: start, $lte: end };
    }

    
    const stats = await AttendanceRecord.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

   
    const counts = { present: 0, absent: 0, leave: 0 };
    for (const s of stats) {
      if (s._id === "present") counts.present = s.count;
      if (s._id === "absent") counts.absent = s.count;
      if (s._id === "leave") counts.leave = s.count;
    }

    const totalDays = counts.present + counts.absent; 
    const attendancePercent = totalDays
      ? Number(((counts.present / totalDays) * 100).toFixed(1))
      : 0;

    return res.status(200).json({
      success: true,
      data: {
        present: counts.present,
        absent: counts.absent,
        leave: counts.leave,
        totalDays,
        attendancePercent,
      },
    });
  } catch (err) {
    console.error("Error in getAttendanceStats:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};