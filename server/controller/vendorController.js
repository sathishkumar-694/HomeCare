import Vendor from "../models/Vendor.js";

// POST /api/vendor/register
export const registerVendor = async (req, res) => {
  try {
    const { name, shopName, service, nationalProof, location } = req.body;

    const vendor = new Vendor({
      name,
      shopName,
      service,
      nationalProof,
      location,
      photo: req.file ? req.file.filename : null,
    });

    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully!", vendor });
  } catch (err) {
    console.error("Vendor registration failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/vendor
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Server error" });
  }
};
