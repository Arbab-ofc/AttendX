import { markAttendance , getAttendanceByDate , getAttendanceByMonth , updateAttendance , deleteAttendance ,exportAttendanceCSV , getAttendanceStats } from '../controllers/AttendanceRecord.js'
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const AttendanceRecordRouter = express.Router();

AttendanceRecordRouter.post('/mark/:categoryId', authMiddleware, markAttendance);
AttendanceRecordRouter.post('/date', authMiddleware, getAttendanceByDate);
AttendanceRecordRouter.get('/month/:categoryId', authMiddleware, getAttendanceByMonth);
AttendanceRecordRouter.put('/month/:categoryId/:recordId', authMiddleware, updateAttendance);
AttendanceRecordRouter.delete('/:categoryId/:recordId', authMiddleware, deleteAttendance);
AttendanceRecordRouter.get("/stats", authMiddleware, getAttendanceStats);
AttendanceRecordRouter.get('/export/:categoryId', authMiddleware, exportAttendanceCSV);

export default AttendanceRecordRouter;