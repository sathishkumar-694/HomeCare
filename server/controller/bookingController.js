import Booking from "../models/booking.js";

// ============================================
// 🛍️ CREATE NEW BOOKING (From PaymentPage)
// ============================================
export const createBooking = async (req, res) => {
  try {
    // req.user.id should come from your authMiddleware
    // For now, I'll get it from req.body (less secure)
    const { user, shop, service, date, time, amount } = req.body;

    if (!user || !shop || !service || !date || !time || !amount) {
      return res.status(400).json({ message: "All booking fields required" });
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
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (err) {
    console.error("Create Booking Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// 🧾 GET ALL BOOKINGS FOR A USER (For Profile.jsx)
// ============================================
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