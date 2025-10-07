import Vendor from "../models/Vendor.js";

// Approve vendor
export const approveVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    res.json({ message: "Vendor approved", vendor });
  } catch (err) {
    console.error("Vendor approval failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Reject vendor
export const rejectVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor rejected" });
  } catch (err) {
    console.error("Vendor rejection failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all vendors (Admin)
export const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Server error" });
  }
};
