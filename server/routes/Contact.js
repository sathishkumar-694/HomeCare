import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact - user submits contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newQuery = new Contact({ name, email, message, createdAt: new Date() });
    await newQuery.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contact - admin fetches all queries
router.get("/", async (req, res) => {
  try {
    const queries = await Contact.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error("Get Queries Error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
