import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};
export const isAdmin = (req, res, next) => {
  // This middleware must run *after* the 'protect' middleware
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed to the controller
  } else {
    // User is logged in but is NOT an admin
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};