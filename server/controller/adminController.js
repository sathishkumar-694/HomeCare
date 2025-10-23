import Vendor from "../models/Vendor.js";
export const getPendingVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: "pending" }).select("-password");    
    if (vendors.length === 0) {
      return res.status(200).json([]); // Send empty array, not an error
    }
    res.status(200).json(vendors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const approveVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    
    // Find the vendor by their ID and update their status to "approved"
    const vendor = await Vendor.findByIdAndUpdate(
      vendorId,
      { status: "approved" },
      { new: true } // This option returns the modified document
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor approved successfully", vendor });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const rejectVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findByIdAndDelete(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor rejected and deleted successfully" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};