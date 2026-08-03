import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  getActiveDepartments,
  updateDepartment,
  deleteDepartment,
  toggleDepartmentStatus,
} from "../controllers/departmentController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// Public
router.get("/active", getActiveDepartments);

// Admin
router.post("/", protectAdmin, createDepartment);
router.get("/", protectAdmin, getAllDepartments);
router.get("/:id", protectAdmin, getSingleDepartment);
router.put("/:id", protectAdmin, updateDepartment);
router.delete("/:id", protectAdmin, deleteDepartment);
router.patch("/:id/toggle-status", protectAdmin, toggleDepartmentStatus);

export default router;
