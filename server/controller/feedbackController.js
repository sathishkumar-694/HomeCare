import Feedback from "../models/Feedback.js";
import Booking from "../models/booking.js";
import Vendor from "../models/Vendor.js";

// POST /api/feedback
export const createFeedback = async (req, res) => {
  try {
    const { bookingId, userId, vendorId, rating, comment, wouldRecommend } = req.body;

    // Validate required fields
    if (!bookingId || !userId || !vendorId || !rating || wouldRecommend === undefined) {
      return res.status(400).json({ 
        message: "Booking ID, user ID, vendor ID, rating, and recommendation are required" 
      });
    }

    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if feedback already exists for this booking
    const existingFeedback = await Feedback.findOne({ bookingId });
    if (existingFeedback) {
      return res.status(400).json({ message: "Feedback already submitted for this booking" });
    }

    // Create feedback
    const feedback = new Feedback({
      bookingId,
      userId,
      vendorId,
      rating,
      comment: comment || "",
      wouldRecommend
    });

    await feedback.save();

    // Update vendor rating
    await updateVendorRating(vendorId);

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (err) {
    console.error("Create feedback error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/feedback/booking/:bookingId
export const getFeedbackByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const feedback = await Feedback.findOne({ bookingId })
      .populate('userId', 'name email')
      .populate('vendorId', 'name shopName');
    
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(feedback);
  } catch (err) {
    console.error("Get feedback error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/feedback/vendor/:vendorId
export const getFeedbackByVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const feedbacks = await Feedback.find({ vendorId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    console.error("Get vendor feedback error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Helper function to update vendor rating
const updateVendorRating = async (vendorId) => {
  try {
    const feedbacks = await Feedback.find({ vendorId });
    
    if (feedbacks.length === 0) return;

    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = totalRating / feedbacks.length;

    await Vendor.findByIdAndUpdate(vendorId, {
      rating: averageRating,
      totalRatings: feedbacks.length
    });
  } catch (err) {
    console.error("Update vendor rating error:", err);
  }
};
