import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration (UPDATED)
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "A profile image is required." });
    }

    // Get the path of the uploaded file
    const imagePath = req.file.path;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword,
      // Add the image path to the user document before saving
      // IMPORTANT: Replace 'profilePicture' with the actual field name from your User model
      profilePicture: imagePath 
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("User registration failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login (User or Vendor) - no changes needed here
export const loginUser = async (req, res) => {
  // ... your existing login code remains the same
  const { email, password } = req.body;
  try {
    let account = await User.findOne({ email });
    let role = "user";

    if (!account) {
      account = await Vendor.findOne({ email });
      if (account) role = "vendor";
    }

    if (!account) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, account.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: account._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      role,
      user: { id: account._id, name: account.name || account.shopName, email: account.email, role },
    });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: "err.message" });
  }
};