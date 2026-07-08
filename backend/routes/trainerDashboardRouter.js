import express from "express";
import { getTrainerAnalytics, getMyWorkshops, getMyArticles, getTrainerDashboardData } from "../controllers/trainerDashboard.js";
import { protectTrainer } from "../middleware/trainerAuthMiddleware.js";
const router = express.Router();
router.use(protectTrainer);
router.get('/dashboard', getTrainerDashboardData);
router.get('/workshops', getMyWorkshops);
router.get('/articles', getMyArticles);
router.get('/analytics', getTrainerAnalytics);

export default router;