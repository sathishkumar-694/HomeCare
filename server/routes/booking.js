// FILE: routes/booking.js (Simplified Version)

import express from "express";
import Booking from '../models/booking.js';

const router = express.Router();

// POST /api/bookings/create
// Creates a confirmed booking directly, skipping payment.
router.post("/create", async (req, res) => {
  try {
    const { userId, vendorId, service, date } = req.body;

    // Create a new booking and set its status directly to "confirmed"
    const newBooking = new Booking({
      user: userId,
      vendor: vendorId,
      service,
      date,
      status: "confirmed", // Set directly to confirmed
    });
    
    await newBooking.save();

    console.log(`✅ Direct booking created and confirmed: ${newBooking._id}`);
    
    // Send a success response back to the front-end
    res.status(201).json({ success: true, message: "Booking confirmed successfully!", booking: newBooking });

  } catch (error) {
    console.error("Error creating direct booking:", error);
    res.status(500).json({ success: false, message: "Server error during booking creation" });
  }
});

export default router;