import express from "express";
import multer from "multer";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ dest: "uploads/" });

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
    res.status(201).json({ message: "Vendor registered successfully!", vendor });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Fetch all vendors
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
