import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import vendorRoutes from "./routes/vendor.js";
import userRoutes from "./routes/User.js";
import adminRoutes from "./routes/admin.js";
import supportRoutes from "./routes/support.js";
import bookingRoutes from "./routes/booking.js";
import contactRoutes from "./routes/Contact.js";
import feedbackRoutes from "./routes/feedback.js";
import emailRoutes from "./routes/email.js";

import path from "path";
import { fileURLToPath } from "url";

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_KEY) {
    console.error("Missing JWT secret. Set JWT_KEY in your .env");
    process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Validate critical env vars early

connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/vendor", vendorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    { console.log(`Server running on port ${PORT}`)
        console.log(`uri:${process.env.MONGODB_URI}`)
})
