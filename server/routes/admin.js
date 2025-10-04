/*
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
*/
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

// PATCH: Approve vendor
router.patch("/vendors/:id/approve", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Reject vendor
router.delete("/vendors/:id/reject", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor rejected" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;