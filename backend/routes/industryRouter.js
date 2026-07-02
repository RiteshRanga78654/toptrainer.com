import express from "express"

import { createIndustry, getAllIndustries, getSingleIndustry, updateIndustry,deleteIndustry, toggleIndustryStatus } from "../controllers/industryController.js"
import { protectAdmin } from "../middleware/adminAuthMiddleware.js"

const router = express.Router();

router.post("/",protectAdmin, createIndustry);
router.get("/", protectAdmin, getAllIndustries);
router.get("/:id",protectAdmin, getSingleIndustry);
router.put("/:id", protectAdmin, updateIndustry);
router.delete("/:id", protectAdmin, deleteIndustry);
router.put("/toggle-status/:id",protectAdmin, toggleIndustryStatus);

export default router;