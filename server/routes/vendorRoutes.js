import express from "express";
import multer from "multer";
import fs from "fs";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup
const upload = multer({ dest: uploadDir });

// POST: Register vendor
router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const vendor = new Vendor({
      name: req.body.name,
      shopName: req.body.shopName,
      service: req.body.service,
      contact: req.body.contact,
      location: req.body.location,
      photo: req.file ? req.file.filename : null,
    });

    await vendor.save();
    console.log("Vendor registered:", vendor.name);
    res.status(201).json({ message: "Vendor registered successfully!", vendor });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.patch("/:id/approve", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor approved", vendor });
  } catch (err) {
    console.error("Vendor approval failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Reject vendor
// This matches: DELETE /api/admin/vendors/:id/reject
router.delete("/:id/reject", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor rejected" });
  } catch (err) {
    console.error("Vendor rejection failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Remove vendor
// This matches: DELETE /api/admin/vendors/:id/remove
router.delete("/:id/remove", async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(4404).json({ error: "Vendor not found" });
    }
    res.json({ message: "Vendor removed" });
  } catch (err) {
    console.error("Vendor removal failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;