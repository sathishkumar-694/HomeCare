import express from "express";
import { 
  sendNotification, 
  getNotifications 
} from "../controller/emailController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; // Make sure to import it!

const router = express.Router();

// POST /api/email/send-notification
// The line that was here is now GONE.

// GET /api/email/notifications
router.get("/notifications", getNotifications);

// This is now the ONLY definition, and it is correct.
router.post("/send-notification", protect, isAdmin, sendNotification);

export default router;