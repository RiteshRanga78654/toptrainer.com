import express from "express";          
import { globalSearch, searchTrainers, searchArticles, searchIndustries, searchCompetencies, searchSuggestions } from "../controllers/searchController";

const router = express.Router();

router.get("/global", globalSearch);
router.get("/trainers", searchTrainers);
router.get("/articles", searchArticles);
router.get("/industries", searchIndustries);
router.get("/competencies", searchCompetencies);
router.get("/suggestions", searchSuggestions);                                  

export default router;              