"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/config/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env"); //  env.ts is in the same folder (config)
const connectDB = async () => {
    try {
        if (!env_1.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose_1.default.connect(env_1.MONGO_URI);
        console.log("✅ MongoDB connected successfully");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
