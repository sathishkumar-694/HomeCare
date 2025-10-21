import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Made optional for Google OAuth users
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  googleId: { type: String, unique: true, sparse: true }, // For Google OAuth
  isGoogleUser: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date }
}, { timestamps: true });

export default mongoose.model("User", userSchema);