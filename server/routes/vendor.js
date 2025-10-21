import express from "express";
import { 
  registerVendor, 
  getVendors, 
  loginVendor, 
  googleLoginVendor 
} from "../controller/vendorController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// POST: Register vendor
router.post("/register", upload.single("photo"), registerVendor);

// POST: Login vendor
router.post("/login", loginVendor);

// POST: Google OAuth login for vendor
router.post("/google-login", googleLoginVendor);

// GET: Fetch all vendors
router.get("/", getVendors);

export default router;
