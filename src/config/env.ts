

// src/config/env.ts
import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRE || "1h";
export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;
export const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRE || "7d";
