import {generateOrUpdateAnalytics , getMonthlyAnalytics , getAllAnalytics , getStreaks} from '../controllers/Streak.js'
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const StreakRouter = express.Router();

StreakRouter.post('/generate-or-update', authMiddleware, generateOrUpdateAnalytics);
StreakRouter.get('/monthly', authMiddleware, getMonthlyAnalytics);
StreakRouter.get('/all', authMiddleware, getAllAnalytics);
StreakRouter.get('/streaks', authMiddleware, getStreaks);

export default StreakRouter;