

// src/config/db.ts
import mongoose from "mongoose";
import { MONGO_URI } from "./env";  //  env.ts is in the same folder (config)

const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
