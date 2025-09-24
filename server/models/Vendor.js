import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    shopName: { type: String, required: true },
    service: { type: String, required: true },
    nationalProof: { type: String, required: true },
    location: { type: String, required: true },
    photo: { type: String }, 
    approved: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
