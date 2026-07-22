import express from "express";

import { createArticle, getDraftArticles, getMyPublishedArticles, publishArticle,deleteArticle, updateArticle } from "../controllers/articleContoller.js";
import { createArticle, getDraftArticles, getMyPublishedArticles, publishArticle,deleteArticle, getAllArticles} from "../controllers/articleContoller.js";

import { protectAdmin } from "../middleware/adminAuthMiddleware.js";
import { protectTrainer } from "../middleware/trainerAuthMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
// protectTrainer or protect admin middleware has been removed just for testing purposes it will be added later

router.post("/trainer/create", upload.single("coverImage"),createArticle);
router.get("/trainer/drafts", getDraftArticles);
router.get("/trainer/published", getMyPublishedArticles);
router.put("/trainer/publish/:id", publishArticle);
router.put("/trainer/:id", upload.single("coverImage"), updateArticle);
router.delete("/trainer/:id", deleteArticle);

//Admin

router.post("/admin/create", createArticle);
router.get("/admin/drafts", getDraftArticles);
router.get("/admin/published", getMyPublishedArticles);
router.put("/admin/publish/:id", publishArticle);
router.put("/admin/:id", upload.single("coverImage"), updateArticle);          
router.delete("/admin/:id", deleteArticle);

router.get("/", getAllArticles)
 
export default router;