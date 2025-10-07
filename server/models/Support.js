import mongoose from "mongoose";

const supportSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Support", supportSchema);
