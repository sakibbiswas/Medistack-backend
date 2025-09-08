"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_EXPIRES_IN = exports.REFRESH_TOKEN_SECRET = exports.JWT_EXPIRES_IN = exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 5000;
exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRE || "1h";
exports.REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;
exports.REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRE || "7d";
