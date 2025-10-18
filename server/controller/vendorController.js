import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";

// POST /api/vendor/register
export const registerVendor = async (req, res) => {
  try {
    console.log("Vendor registration request body:", req.body);
    console.log("Vendor registration request file:", req.file);
    
    const { name, email, password, shopName, service, contact, location } = req.body;

    // Validate required fields
    if (!name || !email || !password || !shopName || !service || !contact || !location) {
      console.log("Missing required fields:", { name, email, password, shopName, service, contact, location });
      return res.status(400).json({ 
        message: "All fields are required",
        received: { name, email, password, shopName, service, contact, location }
      });
    }

    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      shopName,
      service,
      contact,
      location,
      photo: req.file ? req.file.path : null,
    });

    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully!", vendor });
  } catch (err) {
    console.error("Vendor registration failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/vendor
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Server error" });
  }
};
