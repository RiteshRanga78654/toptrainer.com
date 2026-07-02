import express from "express";
import { createCompetency, getAllCompetencies, getSingleCompetency, updateCompetency,deleteCompetency, toggleCompetencyStatus } from "../controllers/competencyController.js"
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/",protectAdmin, createCompetency);
router.get("/", protectAdmin, getAllCompetencies);
router.get("/:id",protectAdmin, getSingleCompetency);
router.put("/:id", protectAdmin, updateCompetency);
router.delete("/:id", protectAdmin, deleteCompetency);
router.put("/toggle-status/:id",protectAdmin, toggleCompetencyStatus);

export default router;