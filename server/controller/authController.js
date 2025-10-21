import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let imagePath = req.file ? req.file.path : null;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
      name: username, 
      email, 
      password: hashedPassword,
      profilePicture: imagePath 
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("User registration failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login (User or Vendor)
export const loginUser = async (req, res) => {
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

    const token = jwt.sign({ id: account._id, role }, process.env.JWT_KEY, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      role,
      user: { 
        _id: account._id,
        name: account.name || account.shopName, 
        email: account.email, 
        role,
        phone: account.phone || "",
        address: account.address || "",
        shopName: account.shopName || "",
        service: account.service || "",
        location: account.location || ""
      },
    });
  } catch (err) {
    console.error("Login failed:", err);
    res.status(500).json({ message: err.message });
  }
};