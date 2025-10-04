import express from "express";
import multer from "multer";
import Vendor from "../models/Vendor.js";

const router = express.Router();

// file upload config (store in 'uploads/' folder)
const upload = multer({ dest: "uploads/" });

// POST: create vendor
router.post("/", upload.single("photo"), async (req, res) => {
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
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: all vendors (for admin)
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;