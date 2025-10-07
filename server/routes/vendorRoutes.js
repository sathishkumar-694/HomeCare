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
      nationalProof: req.body.nationalProof,
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

// GET all vendors (Admin)
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
