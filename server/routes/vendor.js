import express from "express";
import { registerVendor, getVendors } from "../controller/vendorController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// POST: Register vendor
router.post("/register", upload.single("photo"), registerVendor);

// GET: Fetch all vendors
router.get("/", getVendors);

export default router;
