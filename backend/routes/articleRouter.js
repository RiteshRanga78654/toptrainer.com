import express from "express";

import { createArticle, getDraftArticles, getMyPublishedArticles, publishArticle,deleteArticle } from "../controllers/articleContoller.js";

import { protectAdmin } from "../middleware/adminAuthMiddleware.js";
import { protectTrainer } from "../middleware/trainerAuthMiddleware.js";

const router = express.Router();
router.post("/trainer/create", protectTrainer, createArticle);
router.get("/trainer/drafts", protectTrainer, getDraftArticles);
router.get("/trainer/published", protectTrainer, getMyPublishedArticles);
router.put("/trainer/publish/:id", protectTrainer, publishArticle);
router.delete("/trainer/:id", protectTrainer, deleteArticle);

//Admin
router.post("/admin/create", protectAdmin, createArticle);
router.get("/admin/drafts", protectAdmin, getDraftArticles);
router.get("/admin/published", protectAdmin, getMyPublishedArticles);
router.put("/admin/publish/:id", protectAdmin, publishArticle);
router.delete("/admin/:id", protectAdmin, deleteArticle);
 
export default router;