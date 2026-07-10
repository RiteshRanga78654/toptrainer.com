import express from 'express' 

import { createWorkshop,getDraftWorkshops, getFeaturedWorkshops, isToggle, getPublishedWorkshops, getSingleWorkshop, publishWorkshop, updateWorkshop, deleteWorkshop} from '../controllers/workshopController.js';
import { protectTrainer } from '../middleware/trainerAuthMiddleware.js';
import { protectAdmin } from '../middleware/adminAuthMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';  
import { searchWorkshops } from '../controllers/searchController.js';
                                   
const router = express.Router();

router.post("/trainer/create", protectTrainer, createWorkshop );
router.get("/trainer/drafts", protectTrainer, getDraftWorkshops);
router.get("/trainer/published", protectTrainer, getPublishedWorkshops)
router.put("/trainer/publish/:id", protectTrainer, publishWorkshop);
router.put("/trainer/:id", protectTrainer, updateWorkshop );
router.get("/trainer/One-workshop", protectTrainer, getSingleWorkshop);
router.delete("/trainer/:id", protectTrainer, deleteWorkshop);


//admin
router.post("/admin/create", protectAdmin, createWorkshop );
router.get("/admin/drafts", protectAdmin, getDraftWorkshops);
router.get("/admin/published", protectAdmin, getPublishedWorkshops)
router.put("/admin/publish/:id", protectAdmin, publishWorkshop);
router.put("/admin/:id", protectAdmin, updateWorkshop );
router.get("/admin/One-workshop", protectAdmin, getSingleWorkshop)
router.delete("/admin/:id", protectAdmin, deleteWorkshop);

// admin/homepage
router.patch("/admin/homepage/:id", isToggle) // needs :id
router.get("/admin/homepage/featworkshops", getFeaturedWorkshops)
router.get("/admin/homepage/search", searchWorkshops) // distinct path to avoid collision

export default router;