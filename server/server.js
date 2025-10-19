import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
// Import routes
import vendorRoutes from "./routes/vendor.js";
import userRoutes from "./routes/User.js";
import adminRoutes from "./routes/admin.js";
import supportRoutes from "./routes/support.js";
import bookingRoutes from "./routes/booking.js";
import contactRoutes from "./routes/Contact.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();

// ============================================
// 		 CORRECTED ROUTES
// ============================================
// These are your public routes for login, register, and fetching lists
app.use("/api/vendor", vendorRoutes);
app.use("/api/users", userRoutes);

// This is your admin route for approving, rejecting, and removing
app.use("/api/admin", adminRoutes);

// These are your other routes
app.use("/api/support", supportRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));