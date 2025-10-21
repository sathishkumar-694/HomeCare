import express from "express";
import { 
  createFeedback, 
  getFeedbackByBooking, 
  getFeedbackByVendor 
} from "../controller/feedbackController.js";

const router = express.Router();

// POST /api/feedback
router.post("/", createFeedback);

// GET /api/feedback/booking/:bookingId
router.get("/booking/:bookingId", getFeedbackByBooking);

// GET /api/feedback/vendor/:vendorId
router.get("/vendor/:vendorId", getFeedbackByVendor);

export default router;
