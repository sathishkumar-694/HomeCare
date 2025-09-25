import Vendor from "../models/Vendor.js";

// POST: /api/vendor/register
export const registerVendor = async (req, res) => {
  try {
    const { ownerName, shopName, service, nationalProof, location } = req.body;

    const vendor = new Vendor({
      ownerName,
      shopName,
      service,
      nationalProof,
      location,
      photo: req.file ? req.file.filename : null, // multer handles file uploads
      user: req.user?._id, // if logged in
    });

    await vendor.save();
    res.status(201).json({ message: "Vendor registered successfully!", vendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET: /api/vendor
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
