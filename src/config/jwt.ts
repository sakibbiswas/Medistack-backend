
// src/config/jwt.ts
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
} from "./env"; //  Correct relative path

// Runtime checks for secrets
if (!JWT_SECRET) throw new Error("JWT_SECRET must be defined in .env");
if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET must be defined in .env");

// Payload type
export interface JwtPayload {
  id: string;
  email: string;
  role?: string;
}

// Sign options
const accessTokenOptions: SignOptions = {
  expiresIn: (JWT_EXPIRES_IN || "1h") as any,
};

const refreshTokenOptions: SignOptions = {
  expiresIn: (REFRESH_TOKEN_EXPIRES_IN || "7d") as any,
};

// Generate Access Token
export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload as object, JWT_SECRET, accessTokenOptions);
};

// Verify Access Token
export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null;
  }
};

// Generate Refresh Token
export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload as object, REFRESH_TOKEN_SECRET, refreshTokenOptions);
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as unknown as JwtPayload;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return null;
  }
};
