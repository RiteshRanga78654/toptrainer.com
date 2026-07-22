import express from 'express' 

import { createWorkshop,getDraftWorkshops, getPublishedWorkshops, getSingleWorkshop, publishWorkshop, updateWorkshop, deleteWorkshop, getAllPublicWorkshops, getPublicSingleWorkshop, isToggle, getFeaturedWorkshops } from '../controllers/workshopController.js';
import { protectTrainer } from '../middleware/trainerAuthMiddleware.js';
import { protectAdmin } from '../middleware/adminAuthMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';  


                                   
const router = express.Router();
const workshopUploadFields = upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
    { name: "snapshots", maxCount: 10 },
]);

router.get("/published", getAllPublicWorkshops);
router.get("/published/:id", getPublicSingleWorkshop);

router.post("/trainer/create", protectTrainer, workshopUploadFields, createWorkshop );
router.get("/trainer/drafts", protectTrainer, getDraftWorkshops);
router.get("/trainer/published", protectTrainer, getPublishedWorkshops)
router.put("/trainer/publish/:id", protectTrainer, publishWorkshop);
router.put("/trainer/:id", protectTrainer, workshopUploadFields, updateWorkshop );
router.get("/trainer/One-workshop/:id", protectTrainer, getSingleWorkshop);
router.delete("/trainer/:id", protectTrainer, deleteWorkshop);


//admin
router.post("/admin/create", protectAdmin,workshopUploadFields, createWorkshop );
router.get("/admin/drafts", protectAdmin, getDraftWorkshops);
router.get("/admin/published", protectAdmin, getPublishedWorkshops)
router.put("/admin/publish/:id", protectAdmin, publishWorkshop);
router.put("/admin/:id", protectAdmin, workshopUploadFields, updateWorkshop );
router.get("/admin/One-workshop", protectAdmin, getSingleWorkshop)
router.delete("/admin/:id", protectAdmin, deleteWorkshop);


export default router;