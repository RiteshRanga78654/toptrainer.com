import express from 'express';
import { loginAdmin, getMyProfile, updateProfile, logoutAdmin } from '../controllers/adminAuthController.js';
import { protectAdmin } from '../middleware/adminAuthMiddleware.js';                   

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/logout', protectAdmin, logoutAdmin);
router.get('/get-my-profile', protectAdmin, getMyProfile);
router.post('/update-profile', protectAdmin, updateProfile);



export default router;      
