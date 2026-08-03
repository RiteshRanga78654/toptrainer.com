import express from "express";
import {
  createCompetency,
  getAllCompetencies,
  getSingleCompetency,
  getActiveCompetencies,
  updateCompetency,
  deleteCompetency,
  toggleCompetencyStatus,
} from "../controllers/competencyController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/active", getActiveCompetencies);

// Admin
router.post("/", protectAdmin, createCompetency);
router.get("/", protectAdmin, getAllCompetencies);
router.get("/:id", protectAdmin, getSingleCompetency);
router.put("/:id", protectAdmin, updateCompetency);
router.delete("/:id", protectAdmin, deleteCompetency);
router.patch("/:id/toggle-status", protectAdmin, toggleCompetencyStatus);

export default router;
