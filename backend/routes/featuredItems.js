import express from "express"
import { isToggle, getFeaturedList } from "../controllers/featuredController.js";



const router = express.Router();


// for toggling featured items

router.get("/", getFeaturedList)
router.post("/toggle", isToggle)


export default router;
