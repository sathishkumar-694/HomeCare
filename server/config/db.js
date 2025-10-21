
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI ||
      process.env.MONGODB_URI ||
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/homcare"||
      "mongodb+srv://homecare026_db_user:1234567890@cluster0.x95ss9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    if (!process.env.MONGODB_URI && !process.env.MONGO_URI && !process.env.MONGODB_URL) {
      console.warn("⚠️  No cloud Mongo URI env found (MONGODB_URI/MONGO_URI/MONGODB_URL). Using localhost.");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;