import express from "express";
import {
  createRequirement,
  getMyRequirements,
  getApprovedRequirements,
  getAllRequirements,
  getSingleRequirement,
  approveRequirement,
  rejectRequirement,
  deleteRequirement,
} from "../controllers/requirementcontroller.js";
import { protectUser } from "../middleware/userMiddleware.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// user
router.post("/", protectUser, createRequirement);
router.get("/my", protectUser, getMyRequirements);

// public — only approved requirements are ever exposed
router.get("/approved", getApprovedRequirements);

// admin
router.get("/admin/all", protectAdmin, getAllRequirements);
router.get("/admin/:id", protectAdmin, getSingleRequirement);
router.put("/admin/approve/:id", protectAdmin, approveRequirement);
router.put("/admin/reject/:id", protectAdmin, rejectRequirement);
router.delete("/admin/:id", protectAdmin, deleteRequirement);

export default router;