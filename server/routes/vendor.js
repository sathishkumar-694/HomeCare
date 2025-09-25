import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// POST: Register vendor
router.post("/register", async (req, res) => {
  try {
    const vendor = new Vendor(req.body); // takes data from frontend
    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully!", vendor });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
