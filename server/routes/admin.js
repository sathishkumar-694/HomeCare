import express from "express";
import Vendor from "../models/Vendor.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js";
import Booking from "../models/booking.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const [userCount, vendorCount, pendingVendorCount, bookingCount, queryCount] =
      await Promise.all([
        User.countDocuments(),
        Vendor.countDocuments(),
        Vendor.countDocuments({ status: "pending" }),
        Booking.countDocuments(),
        Contact.countDocuments(),
      ]);

    res.json({
      userCount,
      vendorCount,
      pendingVendorCount,
      bookingCount,
      queryCount,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name")
      .populate("vendor", "name") // Changed "vendor" to "shop"
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching all bookings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

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

router.delete("/queries/:id", async (req, res) => {
  try {
    const query = await Contact.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ error: "Query not found" }); // Fixed status code
    }
    res.json({ message: "Query deleted successfully" });
  } catch (err) {
    console.error("Query deletion failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;