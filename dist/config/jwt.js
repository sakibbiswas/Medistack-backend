"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = exports.verifyAccessToken = exports.generateAccessToken = void 0;
// src/config/jwt.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env"); //  Correct relative path
// Runtime checks for secrets
if (!env_1.JWT_SECRET)
    throw new Error("JWT_SECRET must be defined in .env");
if (!env_1.REFRESH_TOKEN_SECRET)
    throw new Error("REFRESH_TOKEN_SECRET must be defined in .env");
// Sign options
const accessTokenOptions = {
    expiresIn: (env_1.JWT_EXPIRES_IN || "1h"),
};
const refreshTokenOptions = {
    expiresIn: (env_1.REFRESH_TOKEN_EXPIRES_IN || "7d"),
};
// Generate Access Token
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.JWT_SECRET, accessTokenOptions);
};
exports.generateAccessToken = generateAccessToken;
// Verify Access Token
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
    }
    catch (error) {
        console.error("Access token verification failed:", error);
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
// Generate Refresh Token
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.REFRESH_TOKEN_SECRET, refreshTokenOptions);
};
exports.generateRefreshToken = generateRefreshToken;
// Verify Refresh Token
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, env_1.REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        console.error("Refresh token verification failed:", error);
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
