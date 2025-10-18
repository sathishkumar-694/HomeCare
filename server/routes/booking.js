import express from "express";
import { createBooking, getUserBookings, getVendorBookings, updateBookingStatus } from "../controller/bookingController.js";

const router = express.Router();

// POST /api/bookings/create
router.post("/create", createBooking);

// GET /api/bookings/user/:userId
router.get("/user/:userId", getUserBookings);

// GET /api/bookings/vendor/:vendorId
router.get("/vendor/:vendorId", getVendorBookings);

// PUT /api/bookings/:bookingId/status
router.put("/:bookingId/status", updateBookingStatus);

export default router;