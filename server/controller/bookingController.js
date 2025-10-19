import Booking from "../models/booking.js";

export const createBooking = async (req, res) => {
  try {
    console.log("Booking request body:", req.body); // Debug log
    
    const { user, shop, service, date, time, amount } = req.body;
    if (!user || !shop || !service || !date || !time || !amount) {
      console.log("Missing fields:", { user, shop, service, date, time, amount });
      return res.status(400).json({ 
        message: "All booking fields required",
        received: { user, shop, service, date, time, amount }
      });
    }

    const newBooking = new Booking({
      user,
      shop,
      service,
      date,
      time,
      amount,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
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
      .populate("shop", "name address") // ✅ Fetches shop name/address for the card
      .sort({ date: -1 }); // Show newest first

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
    const bookings = await Booking.find({ shop: vendorId })
      .populate("user", "name email phone") // ✅ Fetches user details for the vendor
      .sort({ date: -1 }); // Show newest first

    res.json(bookings);
  } catch (err) {
    console.error("Get Vendor Bookings Error:", err);
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

    if (!status || !["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate("user", "name email phone").populate("shop", "name");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    console.error("Update Booking Status Error:", err);
    res.status(500).json({ message: err.message });
  }
};