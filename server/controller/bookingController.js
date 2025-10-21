import Booking from "../models/booking.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

export const createBooking = async (req, res) => {
  try {
    console.log("Booking request body:", req.body);

    // --- 1. DESTRUCTURE ALL FIELDS FROM REQ.BODY ---
    const {
      userId,
      vendorId,
      service,
      serviceName,
      date,
      time,
      amount,
      price,
      location,
      clientContact, // <-- ADDED
      vendorContact, // <-- ADDED
      notes,
    } = req.body;

    // --- 2. VALIDATE ALL REQUIRED FIELDS ---
    if (
      !userId ||
      !vendorId ||
      !service ||
      !serviceName ||
      !date ||
      !time ||
      !amount ||
      !price ||
      !location ||
      !clientContact || // <-- ADDED
      !vendorContact    // <-- ADDED
    ) {
      return res.status(400).json({
        message: "All required booking fields are missing",
      });
    }

    // Get user and vendor details
    const user = await User.findById(userId);
    const vendor = await Vendor.findById(vendorId);

    if (!user || !vendor) {
      return res.status(404).json({ message: "User or vendor not found" });
    }

    // --- 3. CREATE BOOKING WITH DATA FROM REQ.BODY ---
    const newBooking = new Booking({
      user: userId,
      vendor: vendorId,
      service,
      serviceName,
      date,
      time,
      amount,
      price,
      location,
      notes: notes || "",
      // Additional fields for better tracking
      clientName: user.name,
      clientEmail: user.email,
      clientContact: clientContact, // <-- CHANGED (from user.phone)
      vendorName: vendor.name,
      vendorContact: vendorContact, // <-- CHANGED (from vendor.contact)
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({ message: err.message });
  }
};

//all bookings
export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId })
      .populate("vendor", "name shopName service contact location photo")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Get User Bookings Error:", err);
    res.status(500).json({ message: err.message });
  }
};

//Vendor Dashboard
export const getVendorBookings = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const bookings = await Booking.find({ vendor: vendorId })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Get Vendor Bookings Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings/:id
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("user", "name email phone")
      .populate("vendor", "name shopName service contact location photo");

    if (!booking) {
      return res.status(4404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    console.error("Get Booking Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// 🔄 UPDATE BOOKING STATUS (For Vendor Dashboard)
// ============================================
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["pending", "confirmed", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )
      .populate("user", "name email phone")
      .populate("vendor", "name shopName");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    console.error("Update Booking Status Error:", err);
    res.status(500).json({ message: err.message });
  }
};