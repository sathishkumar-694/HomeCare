// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ✅ RENAMED: from 'vendor' to 'shop' to match frontend
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor", // Assumes your vendor model is named "Vendor"
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    // ✅ ADDED: Fields from PaymentPage
    time: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;