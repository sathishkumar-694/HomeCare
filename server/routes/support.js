import express from "express";
import Support from "../models/Support.js";

const router = express.Router();

// Create support request
router.post("/", async (req, res) => {
  const request = new Support(req.body);
  await request.save();
  res.json({ message: "Support request created", request });
});

// Get all support requests
router.get("/", async (req, res) => {
  const requests = await Support.find().sort({ createdAt: -1 });
  res.json(requests);
});

export default router;
