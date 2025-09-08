"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("./department.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.get("/", department_controller_1.DepartmentController.getAll);
router.get("/:id", department_controller_1.DepartmentController.getById);
router.get("/:id/doctors", department_controller_1.DepartmentController.getDoctors); //  new route
// Admin routes
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), department_controller_1.DepartmentController.create);
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), department_controller_1.DepartmentController.update);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), department_controller_1.DepartmentController.delete);
exports.default = router;
