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

const router = express.Router();

router.post("/create", createBooking);
router.get("/user/:userId", getUserBookings);
router.get("/vendor/:vendorId", getVendorBookings);
router.get("/:id", getBookingById);
router.put("/:bookingId/status", updateBookingStatus);
router.put("/:id/reject", rejectBooking);
router.put("/:id/approve", approveBooking);
router.put("/:id/complete", completeBooking);
router.put("/:id/confirm-payment", confirmPayment);

export default router;