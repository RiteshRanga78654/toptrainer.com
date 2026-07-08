import express from "express";

import { getUserDashboard, toggleShortlistTrainer, getShortlistedTrainers, toggleSaveWorkshop, getUserWorkshops, toggleSaveArticle, getUserArticles, getArticleById } from "../controllers/userDashboard.js";
import { protectUser } from "../middleware/userMiddleware.js";

const router = express.Router();
router.use(protectUser);

router.get("/dashboard", getUserDashboard);
router.get("/shortlisted", getShortlistedTrainers);
router.post("/shortlist/:trainerId", toggleShortlistTrainer);
router.get("/workshops", getUserWorkshops);
router.post("/save-workshop/:workshopId", toggleSaveWorkshop);
router.get("/articles", getUserArticles);
router.post("/save-article/:articleId", toggleSaveArticle);
router.get("/articles/:articleId", getArticleById);

export default router;
