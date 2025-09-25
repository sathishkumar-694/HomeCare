const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shopName: { type: String, required: true },
  service: { type: String, required: true },
  nationalProof: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String }, // filename of uploaded photo
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);
