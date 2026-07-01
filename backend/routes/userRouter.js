import express from "express";
import { registerUser, loginUser, logoutUser, getMyProfile, updateMyProfile, updatePassword } from "../controllers/userAuthController.js"
import { protectUser } from "../middleware/userMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/me", protectUser, getMyProfile);
router.put("/update-profile", protectUser, updateMyProfile);
router.put("/update-password", protectUser, updatePassword);

export default router;