"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const hash_1 = require("../../utils/hash");
class UserService {
    static async getAllUsers() {
        return await user_model_1.User.find();
    }
    static async getUserById(id) {
        return await user_model_1.User.findById(id);
    }
    static async createUser(name, email, password, role) {
        const hashed = await (0, hash_1.hashPassword)(password);
        const user = new user_model_1.User({ name, email, password: hashed, role });
        return await user.save();
    }
    static async updateUser(id, update) {
        return await user_model_1.User.findByIdAndUpdate(id, update, { new: true });
    }
    static async deleteUser(id) {
        return await user_model_1.User.findByIdAndDelete(id);
    }
}
exports.UserService = UserService;
