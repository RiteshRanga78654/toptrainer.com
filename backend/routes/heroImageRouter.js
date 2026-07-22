import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getHeroImages,
  getActiveHeroImages,
  addHeroImage,
  updateHeroImage,
  deleteHeroImage,
  reorderHeroImages
} from "../controllers/heroImageController.js";

const router = express.Router();

router.get("/", getHeroImages);
router.get("/active", getActiveHeroImages);

router.post("/", upload.single("image"), addHeroImage);
router.put("/reorder", reorderHeroImages);
router.put("/:id", updateHeroImage);
router.delete("/:id", deleteHeroImage);

export default router;
