import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shopName: { type: String, required: true },
  service: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);