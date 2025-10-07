import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import vendorRoutes from "./routes/vendor.js";
import userRoutes from "./routes/User.js";
import adminRoutes from "./routes/admin.js";
import supportRoutes from "./routes/support.js";

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/vendor", vendorRoutes);  // Vendor registration and fetch
app.use("/api/users", userRoutes);     // User registration, login, profile
app.use("/api/admin", adminRoutes);    // Admin routes
app.use("/api/support", supportRoutes); // Support requests

// Base route for testing
app.get("/", (req, res) => res.send("API is running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
