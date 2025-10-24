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

router.get("/", getAllUsers);
router.post("/register", upload.single('profileImage'), registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);
router.delete("/:id", deleteUser);

export default router;