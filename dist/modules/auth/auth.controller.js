"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const response_1 = require("../../utils/response");
class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            if (!["Admin", "Doctor", "Patient"].includes(role)) {
                return (0, response_1.errorResponse)(res, "Invalid role", 400);
            }
            const result = await auth_service_1.AuthService.register(name, email, password, role);
            return (0, response_1.successResponse)(res, result, "Registration successful");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message, 400);
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            return (0, response_1.successResponse)(res, result, "Login successful");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message, 400);
        }
    }
}
exports.AuthController = AuthController;
