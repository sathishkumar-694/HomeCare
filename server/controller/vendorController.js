import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utils/googleAuth.js";

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

// POST /api/vendor/login
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update last login
    vendor.lastLogin = new Date();
    await vendor.save();

    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Vendor login successful",
      token,
      user: {
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        role: "vendor",
        shopName: vendor.shopName,
        service: vendor.service,
        contact: vendor.contact,
        location: vendor.location,
        photo: vendor.photo
      }
    });
  } catch (err) {
    console.error("Vendor login error:", err);
    res.status(500).json({ message: err.message });
  }
};

// POST /api/vendor/google-login
export const googleLoginVendor = async (req, res) => {
  try {
    const { email, name, profilePicture } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    // Check if vendor exists
    let vendor = await Vendor.findOne({ email });
    
    if (!vendor) {
      return res.status(400).json({ 
        message: "Vendor not found. Please register as a vendor first." 
      });
    }

    // Update last login
    vendor.lastLogin = new Date();
    await vendor.save();

    const token = jwt.sign(
      { id: vendor._id, role: "vendor" },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google vendor login successful",
      token,
      user: {
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        role: "vendor",
        shopName: vendor.shopName,
        service: vendor.service,
        contact: vendor.contact,
        location: vendor.location,
        photo: vendor.photo
      }
    });
  } catch (err) {
    console.error("Google vendor login error:", err);
    res.status(500).json({ message: err.message });
  }
};
