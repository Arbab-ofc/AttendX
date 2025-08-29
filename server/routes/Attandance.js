import { createCategory , getCategories , deleteCategory ,  updateCategory , getCategoryById } from "../controllers/AttendanceCategory.js";
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const AttendanceCategoryRouter = express.Router();

AttendanceCategoryRouter.post('/create', authMiddleware, createCategory);
AttendanceCategoryRouter.get('/all', authMiddleware, getCategories);
AttendanceCategoryRouter.delete('/:categoryId', authMiddleware, deleteCategory);
AttendanceCategoryRouter.put('/:categoryId', authMiddleware, updateCategory);
AttendanceCategoryRouter.get('/:categoryId', authMiddleware, getCategoryById);

export default AttendanceCategoryRouter;