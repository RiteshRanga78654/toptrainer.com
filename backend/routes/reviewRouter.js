import express from "express";

import {
  createReview,
  getAllReviews,
  getSingleReview,
  getTrainerReviews,
  getWorkshopReviews,
  getFeaturedReviews,
  toggleFeaturedReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();


router.post(
  "/create",
  createReview
);

router.get(
  "/",
  getAllReviews
);

router.get(
  "/featured",
  getFeaturedReviews
);

router.get(
  "/trainer/:trainerId",
  getTrainerReviews
);

router.get(
  "/workshop/:workshopId",
  getWorkshopReviews
);

router.get(
  "/:id",
  getSingleReview
);

router.put(
  "/feature/:id",
  toggleFeaturedReview
);

router.put(
  "/:id",
  updateReview
);

router.delete(
  "/:id",
  deleteReview
);

export default router;