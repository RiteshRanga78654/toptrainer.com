import express from "express";
import {
  addVideo,
  getVideos,
  deleteVideo,
} from "../controllers/youtubeVideoController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public: homepage ya filtered entity videos fetch karne ke liye
router.get("/", getVideos);

// Admin only: video add
router.post("/",  addVideo);

// Admin only: video delete
router.delete("/:id",  deleteVideo);

export default router;