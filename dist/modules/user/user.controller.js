"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const response_1 = require("../../utils/response");
class UserController {
    static async getAll(req, res) {
        try {
            const users = await user_service_1.UserService.getAllUsers();
            return (0, response_1.successResponse)(res, users);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getById(req, res) {
        try {
            const user = await user_service_1.UserService.getUserById(req.params.id);
            return (0, response_1.successResponse)(res, user);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async create(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const user = await user_service_1.UserService.createUser(name, email, password, role);
            return (0, response_1.successResponse)(res, user);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async update(req, res) {
        try {
            const user = await user_service_1.UserService.updateUser(req.params.id, req.body);
            return (0, response_1.successResponse)(res, user);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async delete(req, res) {
        try {
            await user_service_1.UserService.deleteUser(req.params.id);
            return (0, response_1.successResponse)(res, null, "User deleted successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
}
exports.UserController = UserController;
