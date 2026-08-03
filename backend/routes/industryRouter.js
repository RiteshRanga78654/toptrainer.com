import express from "express";
import {
  createIndustry,
  getAllIndustries,
  getSingleIndustry,
  getActiveIndustries,
  updateIndustry,
  deleteIndustry,
  toggleIndustryStatus,
} from "../controllers/industryController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/active", getActiveIndustries);

// Admin
router.post("/", protectAdmin, createIndustry);
router.get("/", protectAdmin, getAllIndustries);
router.get("/:id", protectAdmin, getSingleIndustry);
router.put("/:id", protectAdmin, updateIndustry);
router.delete("/:id", protectAdmin, deleteIndustry);
router.patch("/:id/toggle-status", protectAdmin, toggleIndustryStatus);

export default router;