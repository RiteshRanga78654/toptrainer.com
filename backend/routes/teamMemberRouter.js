import express from "express";
import {
  createTeamMember,
  getAllTeamMembers,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/teamMemberController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/", protectAdmin, createTeamMember);
router.get("/", protectAdmin, getAllTeamMembers);
router.get("/:id", protectAdmin, getSingleTeamMember);
router.put("/:id", protectAdmin, updateTeamMember);
router.delete("/:id", protectAdmin, deleteTeamMember);

export default router;
