import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// GET: Fetch all vendors
router.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
