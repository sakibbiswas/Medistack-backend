"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Admin only routes
router.get("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), user_controller_1.UserController.getAll);
router.get("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), user_controller_1.UserController.getById);
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), user_controller_1.UserController.create);
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), user_controller_1.UserController.update);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), user_controller_1.UserController.delete);
exports.default = router;
