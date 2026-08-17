import express from "express";

import { createArticle, getDraftArticles, getMyPublishedArticles, publishArticle,deleteArticle, updateArticle, getAllArticles,getAllAdminArticles, getAllTrainerArticles, getArticleByIdPublic, getAllTrainerArticlesAdmin, getTrainerPublishedArticles } from "../controllers/articleContoller.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";
import { protectTrainer } from "../middleware/trainerAuthMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/trainer/create", protectTrainer, upload.single("coverImage"), createArticle);
router.get("/trainer/drafts", protectTrainer, getDraftArticles);
router.get("/trainer/published", protectTrainer, getMyPublishedArticles);
router.put("/trainer/publish/:id", protectTrainer, publishArticle);
router.put("/trainer/:id", protectTrainer, upload.single("coverImage"), updateArticle);
router.delete("/trainer/:id", protectTrainer, deleteArticle);

//Admin

router.post("/admin/create", protectAdmin, upload.single("coverImage"), createArticle);
router.get("/admin/drafts", protectAdmin, getDraftArticles);
router.get("/admin/published", protectAdmin, getMyPublishedArticles);
router.put("/admin/publish/:id", protectAdmin, publishArticle);
router.put("/admin/:id", protectAdmin, upload.single("coverImage"), updateArticle);
router.delete("/admin/:id", protectAdmin, deleteArticle);

router.get("/", getAllArticles)
router.get("/admin/articles",  getAllAdminArticles);
router.get("/admin/trainer-articles", protectAdmin, getAllTrainerArticlesAdmin);
router.get("/trainer/articles", getAllTrainerArticles);
router.get("/trainer/:trainerId/published", getTrainerPublishedArticles);

// Public: fetch a single published article by its id (used by /blogs/[slug])
router.get("/:id", getArticleByIdPublic);

export default router;