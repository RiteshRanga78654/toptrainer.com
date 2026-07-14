import express from "express";
import {createReview, getMyReviews, getAllReviews, getSingleReview, getTrainerReviews, getWorkshopReviews, getFeaturedReviews, approveReview, toggleFeaturedReview, updateReview, deleteReview} from "../controllers/reviewController.js"
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


//public
router.get("/:id", getSingleReview);
router.get("/trainer/:trainerId", getTrainerReviews);
router.get("/workshop/:workshopId", getWorkshopReviews);
router.get("/featured", getFeaturedReviews);

//trainer-dashboard
router.get("/trainer-dashboard/my-reviews",protectTrainer,getTrainerReviews);

//admin
router.get("/admin/all", protectAdmin, getAllReviews);
router.put("/admin/approve/:id",protectAdmin,approveReview);
router.put("/admin/featured/:id",protectAdmin,toggleFeaturedReview);
router.delete("/admin/:id",protectAdmin,deleteReview);

export default router;

  