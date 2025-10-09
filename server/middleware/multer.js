// In middleware/multer.js

import multer from "multer";
import path from "path";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Create a unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;