"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user/user.model");
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1h";
class AuthService {
    //  Register new user
    static async register(name, email, password, role) {
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser)
            throw new Error("User already exists");
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await user_model_1.User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        // JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
        //  Return with _id
        return {
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
    //  Login existing user
    static async login(email, password) {
        const user = await user_model_1.User.findOne({ email });
        if (!user)
            throw new Error("Invalid credentials");
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid credentials");
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.email, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
        //  Return with _id
        return {
            user: {
                _id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
    //  Seed admin user
    static async seedAdmin() {
        const email = "admin@medistack.com";
        const existing = await user_model_1.User.findOne({ email });
        if (existing)
            return console.log("Admin already exists");
        const hashedPassword = await bcryptjs_1.default.hash("admin123", 10);
        await user_model_1.User.create({
            name: "Admin User",
            email,
            password: hashedPassword,
            role: "Admin",
        });
        console.log("✅ Admin user created: admin@medistack.com / admin123");
    }
}
exports.AuthService = AuthService;
