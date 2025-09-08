"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const zod_1 = require("zod");
const router = express_1.default.Router();
const registerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(["Admin", "Doctor", "Patient"]).optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
router.post("/register", (0, validate_middleware_1.validateRequest)(registerSchema), auth_controller_1.AuthController.register);
router.post("/login", (0, validate_middleware_1.validateRequest)(loginSchema), auth_controller_1.AuthController.login);
exports.default = router;
