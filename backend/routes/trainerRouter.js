import express from 'express';
import {
    registerTrainer,
    loginTrainer,
    logoutTrainer,
    getMyProfile,
    updateMyProfile,
    getAllTrainer,
    getTrainerById,
} from "../controllers/trainerController.js";
import upload from '../middleware/uploadMiddleware.js';
import { protectTrainer } from '../middleware/trainerAuthMiddleware.js';

const router = express.Router();

router.post("/register", upload.fields([
    {name: "profilePhoto", maxCount:1},
    {name: "bannerPhoto", maxCount:1},
    {name: "profilepdf", maxCount:1},
    {name: "galleryImages", maxCount:1},
    {name: "uploadCertificates", maxCount:1},
    {name: "certificaationFiles", maxCount:1},
    {name: "workshopPhotos", maxCount:1},
]), registerTrainer);
router.post("/login", loginTrainer);
router.get("/", getAllTrainer);

router.get("/:id", getTrainerById);

router.post("/logout", protectTrainer, logoutTrainer);

router.get("/me", protectTrainer, getMyProfile);

router.put("/update-profile", protectTrainer, upload.fields([
    {name: "profilePhoto", maxCount:1},
    {name: "bannerPhoto", maxCount:1},
    {name: "profilepdf", maxCount:1},
    {name: "galleryImages", maxCount:1},
    {name: "uploadCertificates", maxCount:1},
    {name: "certificaationFiles", maxCount:1},
    {name: "workshopPhotos", maxCount:1},
]), updateMyProfile);

export default router;

