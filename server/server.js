// FILE: server.js (Simplified Version)

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import vendorRoutes from "./routes/vendor.js";
import userRoutes from "./routes/User.js";
import adminRoutes from "./routes/admin.js";
import supportRoutes from "./routes/support.js";
import bookingRoutes from "./routes/booking.js"; 

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // This can now be at the top

// Routes
app.use("/api/vendor", vendorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/bookings", bookingRoutes); // Use the simplified booking routes

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));