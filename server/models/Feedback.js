import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  wouldRecommend: {
    type: Boolean,
    required: true
  },
  isVendorFeedback: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
