import express from "express"

import {
    getDashboardData,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateTrainerStatus,
    toggleTrainerFeatured,
    updateWorkshopStatus,
    updateArticleStatus,
    getAdminAnalytics,
} from '../controllers/adminDashboardController.js';

import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();
router.use(protectAdmin);
router.get("/dashboard", getDashboardData)
router.get('/analytics', getAdminAnalytics);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUserById);
router.patch('/trainers/:id/status', updateTrainerStatus);
router.patch('/trainers/:id/featured', toggleTrainerFeatured);
router.patch('/workshops/:id/status', updateWorkshopStatus);
router.patch('/articles/:id/status', updateArticleStatus);

export default router;