import Booking from "../models/booking.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

export const createBooking = async (req, res) => {
  try {
    console.log("Booking request body:", req.body);
    const {
      userId, vendorId, service, serviceName, date, time,
      amount, price, location, clientContact, vendorContact, notes
    } = req.body;
    if (!userId || !vendorId || !service || !serviceName || !date || !time ||
        !amount || !price || !location || !clientContact || !vendorContact) {
      return res.status(400).json({ message: "All required booking fields are missing" });
    }
    const user = await User.findById(userId);
    const vendor = await Vendor.findById(vendorId);
    if (!user || !vendor) {
      return res.status(404).json({ message: "User or vendor not found" });
    }
    const newBooking = new Booking({
      user: userId, vendor: vendorId, service, serviceName, date, time,
      amount, price, location, notes: notes || "", clientName: user.name,
      clientEmail: user.email, clientContact: clientContact, vendorName: vendor.name,
      vendorContact: vendorContact
    });
    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({ message: err.message });
  }
};

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

export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("user", "name email phone")
      .populate("vendor", "name shopName service contact location photo");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    console.error("Get Booking Error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true })
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

export const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true })
      .populate("user", "name email phone")
      .populate("vendor", "name shopName");
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking rejected successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error rejecting booking:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// In controller/bookingController.js

export const approveBooking = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Make sure 'paymentStatus' is included in the update object
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { 
        status: 'confirmed', 
        paymentStatus: 'pending' ,// <-- This must be included
      }, 
      { new: true }
    )
    .populate("user", "name email phone") 
    .populate("vendor", "name shopName");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    console.log("Approve Response:", updatedBooking); // Verify this log after the fix
    
    res.status(200).json({ 
      message: "Booking approved successfully", 
      booking: updatedBooking 
    });
  } catch (error) {
    console.error("Error approving booking:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const completeBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status: 'completed' }, { new: true })
      .populate("user", "name email phone")
      .populate("vendor", "name shopName");
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking marked as complete", booking: updatedBooking });
  } catch (error) {
    console.error("Error completing booking:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params; 
    const updatedBooking = await Booking.findByIdAndUpdate(id, { paymentStatus: 'completed' }, { new: true })
      .populate("user", "name email phone") 
      .populate("vendor", "name shopName");
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Payment confirmed successfully", booking: updatedBooking });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ message: 'Server error' });
  }
};