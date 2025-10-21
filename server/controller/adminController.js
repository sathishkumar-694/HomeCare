import Vendor from "../models/Vendor.js";

// Approve vendor
export const approveVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    // --- ADD THIS LINE ---
    res.json(vendor); // Send the updated vendor as a response
  } catch (err) {
    console.error("Vendor approval failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Reject vendor (which also deletes)
export const rejectVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
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

// Remove vendor (e.g., by Admin)
export const removeVendor = async (req, res) => {
  try {
    // Find the vendor by its ID and delete it
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    // If no vendor was found with that ID
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    // Send a success message
    res.json({ message: "Vendor removed successfully" });
  } catch (err) {
    console.error("Vendor removal failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};