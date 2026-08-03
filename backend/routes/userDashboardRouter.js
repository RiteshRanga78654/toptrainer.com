import express from "express";

import {
  getUserDashboard,
  toggleShortlistTrainer,
  getShortlistedTrainers,
  removeShortlistedTrainer,
  toggleSaveWorkshop,
  removeSavedWorkshop,
  getUserWorkshops,
  toggleSaveArticle,
  removeSavedArticle,
  getUserArticles,
  getArticleById,
  getSavedWorkshopStatus,
} from "../controllers/userDashboard.js";

import { protectUser } from "../middleware/userMiddleware.js";

const router = express.Router();

router.use(protectUser);

router.get("/dashboard", getUserDashboard);

router.get("/shortlisted", getShortlistedTrainers);
router.post("/shortlist/:trainerId", toggleShortlistTrainer);
router.delete("/shortlist/:trainerId", removeShortlistedTrainer);

router.get("/workshops", getUserWorkshops);
router.get("/save-workshop/:workshopId/status", getSavedWorkshopStatus);
router.post("/save-workshop/:workshopId", toggleSaveWorkshop);
router.delete("/save-workshop/:workshopId", removeSavedWorkshop);

router.get("/articles", getUserArticles);
router.post("/save-article/:articleId", toggleSaveArticle);
router.delete("/save-article/:articleId", removeSavedArticle);
router.get("/articles/:articleId", getArticleById);

export default router;