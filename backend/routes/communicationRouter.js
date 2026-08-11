import express from "express";
import {
  getRecipients,
  sendCommunication,
  getCommunicationHistory,
  getCommunicationAnalytics,
  createTemplate,
  listTemplates,
  updateTemplate,
  deleteTemplate,
} from "../controllers/communicationController.js";
import { protectAdmin } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.use(protectAdmin);

router.get("/recipients", getRecipients);
router.post("/send", sendCommunication);
router.get("/", getCommunicationHistory);
router.get("/analytics", getCommunicationAnalytics);

router.get("/templates", listTemplates);
router.post("/templates", createTemplate);
router.put("/templates/:id", updateTemplate);
router.delete("/templates/:id", deleteTemplate);

export default router;
