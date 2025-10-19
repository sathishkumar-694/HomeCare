import express from "express";
import Vendor from "../models/Vendor.js";

const router = express.Router();

router.get("/vendors", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/vendors/:id/approve", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/vendors/:id/reject", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor rejected" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/vendors/:id/remove", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor removed" });
  } catch (err) {
    console.error("Vendor removal failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;