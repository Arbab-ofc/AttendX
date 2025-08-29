
import express from "express";
import { getLineAnalytics } from "../controllers/analyticsController.js";
import { authMiddleware } from "../middlewares/auth.js";

const AnalyticsRouter = express.Router();

router.get("/line", authMiddleware, getLineAnalytics);

export default AnalyticsRouter;
