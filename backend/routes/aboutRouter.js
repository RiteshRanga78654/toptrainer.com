import express from "express";
import upload from '../middleware/uploadMiddleware.js';
import { getAboutPage, updateAboutPage } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/", getAboutPage);

router.put(
  "/",
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "leadershipImages", maxCount: 20 },
    { name: "teamImages", maxCount: 50 },
    { name: "cultureImages", maxCount: 20 },
  ]),
  updateAboutPage
);

export default router;