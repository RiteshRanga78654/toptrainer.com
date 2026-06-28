import express from 'express';
import {
    registerTrainer,
    loginTrainer,
    logoutTrainer,
    getMyProfile,
    updateMyProfile
} from "../controllers/trainerController.js";
import { protectTrainer } from '../middleware/trainerAuthMiddleware.js.js';

const router = express.Router();

router.post("/register", registerTrainer);
router.post("/login", loginTrainer);

router.post("/logout", logoutTrainer);

router.get("/me", protectTrainer, getMyProfile);

router.put("/update-profile", protectTrainer, updateMyProfile);

export default router;

