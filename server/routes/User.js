import express from "express";
import { 
  getAllUsers, 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  deleteUser, 
  googleLogin 
} from "../controller/userController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// ============================================
// 👥 GET ALL USERS (For Admin)
// ============================================
router.get("/", getAllUsers);

// ============================================
// 📝 REGISTER USER
// ============================================
router.post("/register", upload.single('profileImage'), registerUser);

// ============================================
// 🔐 LOGIN USER
// ============================================
router.post("/login", loginUser);

// ============================================
// 🔐 GOOGLE OAUTH LOGIN
// ============================================
router.post("/google-login", googleLogin);

// ============================================
// 👤 GET USER PROFILE BY ID
// ============================================
router.get("/:id", getUserProfile);

// ============================================
// ✏️ UPDATE USER PROFILE
// ============================================
router.put("/:id", updateUserProfile);

// ============================================
// 🗑️ DELETE USER
// ============================================
router.delete("/:id", deleteUser);

export default router;