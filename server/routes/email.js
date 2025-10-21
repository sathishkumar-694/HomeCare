import express from "express";
import { 
  sendNotification, 
  getNotifications 
} from "../controller/emailController.js";

const router = express.Router();

// POST /api/email/send-notification
router.post("/send-notification", sendNotification);

// GET /api/email/notifications
router.get("/notifications", getNotifications);

export default router;
