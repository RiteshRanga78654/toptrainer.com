import express from "express";
import { unifiedLogin, getCurrentSession } from "../controllers/singleAuthController.js";
import { googleAuthRedirect, googleAuthCallback } from "../config/passportGoogle.js";
import { linkedInAuthRedirect, linkedInAuthCallback } from "../config/passpotLinkedin.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/login", unifiedLogin);
router.get("/me", protectAdmin, getCurrentSession);
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);
router.get("/linkedin", linkedInAuthRedirect);
router.get("/linkedin/callback", linkedInAuthCallback);

export default router;