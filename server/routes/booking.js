import express from "express";
import { 
  createBooking, 
  getUserBookings, 
  getVendorBookings, 
  updateBookingStatus,
  getBookingById,
  rejectBooking,
  approveBooking,
  completeBooking,
  confirmPayment
} from "../controller/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createBooking);
router.get("/user/:userId", protect, getUserBookings);
router.get("/vendor/:vendorId", protect, getVendorBookings);
router.get("/:id", protect, getBookingById);
router.put("/:bookingId/status", protect, updateBookingStatus);
router.put("/:id/reject", protect, rejectBooking);
router.put("/:id/approve", protect, approveBooking);
router.put("/:id/complete", protect, completeBooking);
router.put("/:id/confirm-payment", protect, confirmPayment);

export default router;