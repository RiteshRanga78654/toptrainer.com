import express from "express";
import { uploadMedia, getAllMedia, toggleMediaStatus, deleteMedia } from "../controllers/mediaController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

router.post( "/upload", protectAdmin, upload.single("file"), uploadMedia ); 
router.get("/", getAllMedia); 
router.delete( "/:id", protectAdmin, deleteMedia ); 
router.put( "/toggle/:id", protectAdmin, toggleMediaStatus );

export default router;