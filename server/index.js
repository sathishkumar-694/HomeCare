const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const vendorRoutes = require("./routes/vendorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// vendor API
app.use("/api/vendors", vendorRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/homecare")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ DB connection error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
