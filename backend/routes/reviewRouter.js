import express from "express";
import {createReview, getMyReviews, getAllReviews, getSingleReview, getTrainerReviews, getWorkshopReviews, getFeaturedReviews, approveReview, rejectReview, toggleFeaturedReview, updateReview, deleteReview, getMyTrainerReviews, getTrainerApprovedReviews} from "../controllers/reviewController.js"
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";
import { protectTrainer } from "../middleware/trainerAuthMiddleware.js";
import { protectUser } from "../middleware/userMiddleware.js";
import { fail } from "node:assert";

const router = express.Router();

//user
router.post("/submit-review", protectUser, createReview);
router.get("/my-review", protectUser, getMyReviews);
router.put("/:id", protectUser, updateReview);
router.delete("/:id", protectUser, deleteReview);

//trainer-dashboard
router.get("/trainer-dashboard/my-reviews",protectTrainer,getMyTrainerReviews);
router.get("/trainer-dashboard/approved-reviews", protectTrainer, getTrainerApprovedReviews);

//admin
router.get("/admin/all", protectAdmin, getAllReviews);
router.put("/admin/approve/:id",protectAdmin,approveReview);
router.put("/admin/reject/:id",protectAdmin,rejectReview);
router.put("/admin/featured/:id",protectAdmin,toggleFeaturedReview);
router.delete("/admin/:id",protectAdmin,deleteReview);

//public (kept below /admin and /trainer-dashboard so literal paths like
// "/featured" aren't shadowed by the "/:id" catch-all below)
router.get("/trainer/:trainerId", getTrainerReviews);
router.get("/workshop/:workshopId", getWorkshopReviews);
router.get("/featured", getFeaturedReviews);
router.get("/:id", getSingleReview);

export default router;