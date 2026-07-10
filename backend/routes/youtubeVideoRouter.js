import express from "express";
import { addVideo, getVideos, deleteVideo } from "../controllers/youtubeVideoController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/", getVideos); // Public access for homepage, admin access for panel
router.post("/", addVideo);
router.delete("/:id", deleteVideo);

export default router;
