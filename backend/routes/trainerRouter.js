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
    {name: "profilePhoto", maxCount:10},
    {name: "bannerPhoto", maxCount:10},
    {name: "profilepdf", maxCount:10},
    {name: "galleryImages", maxCount:10},
    {name: "uploadCertificates", maxCount:10},
    {name: "certificationFiles", maxCount:10},
    {name: "workshopPhotos", maxCount:10},
]), registerTrainer);
router.post("/login", loginTrainer);
router.get("/", getAllTrainer);

router.get("/:id", getTrainerById);

router.post("/logout", protectTrainer, logoutTrainer);

router.get("/me", protectTrainer, getMyProfile);

router.put("/update-profile", protectTrainer, upload.fields([
    {name: "profilePhoto", maxCount:10},
    {name: "bannerPhoto", maxCount:10},
    {name: "profilepdf", maxCount:10},
    {name: "galleryImages", maxCount:10},
    {name: "uploadCertificates", maxCount:10},
    {name: "certificationFiles", maxCount:10},
    {name: "workshopPhotos", maxCount:10},
]), updateMyProfile);

export default router;

