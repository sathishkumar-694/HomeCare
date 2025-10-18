import express from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controller/userController.js";
import upload from "../middleware/multer.js";
// You should have an auth middleware to protect routes
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Use authMiddleware for protected routes (placeholder)
const authMiddleware = (req, res, next) => next();

router.get("/", authMiddleware, getAllUsers);
router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/:id", authMiddleware, getUserProfile);
router.put("/:id", authMiddleware, updateUserProfile); // ✅ This now points to your new controller
router.delete("/:id", authMiddleware, deleteUser);

export default router;