import express from "express";
import { registerUser, loginUser, logoutUser, getMyProfile, updateMyProfile, updatePassword } from "../controllers/userAuthController.js"
import { protectUser } from "../middleware/userMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", protectUser, logoutUser);

router.get("/me", protectUser, getMyProfile);
router.put("/update-profile", protectUser, upload.single("avatar"), updateMyProfile);
router.put("/update-password", protectUser, updatePassword);

export default router;