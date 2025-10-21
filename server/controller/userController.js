import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyGoogleToken } from "../utils/googleAuth.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Get All Users Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// 📝 REGISTER USER
// ============================================
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // 'username' from form
    let imagePath = req.file ? req.file.path : null;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: username, // Save 'username' as 'name' in the DB
      email,
      password: hashedPassword,
      profilePicture: imagePath,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// 🔐 LOGIN USER
// ============================================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    let account = await User.findOne({ email });
    let role = "user";

    if (!account) {
      account = await Vendor.findOne({ email });
      if (account) role = "vendor";
    }

    if (!account) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: account._id, role },
      process.env.JWT_KEY ,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      role,
      user: {
        _id: account._id, // Use _id
        name: account.name || account.shopName,
        email: account.email,
        role,
        phone: account.phone || "", // Include phone
        address: account.address || "", // Include address
        shopName: account.shopName || "",
        service: account.service || "",
        location: account.location || ""
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// 👤 GET USER PROFILE BY ID
// ============================================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// ✏️ UPDATE USER PROFILE (For Profile.jsx)
// ============================================
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // Find user and update only an "allowed" list of fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address }, // Only update these fields
      { new: true, runValidators: true } // Return the new, updated doc
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send back the updated user object
    // Profile.jsx will use this to update localStorage
    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ============================================
// 🗑️ DELETE USER (For Admin)
// ============================================
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, profilePicture } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user for Google OAuth
      user = new User({
        name,
        email,
        profilePicture: profilePicture || "",
        isGoogleUser: true,
        isActive: true,
        lastLogin: new Date()
      });
      await user.save();
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || "",
        address: user.address || "",
        profilePicture: user.profilePicture || ""
      }
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};