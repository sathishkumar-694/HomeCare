import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Made optional for Google OAuth users
  shopName: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  googleId: { type: String, unique: true, sparse: true }, // For Google OAuth
  isGoogleUser: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);