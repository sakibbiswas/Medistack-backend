"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("./doctor.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Public routes
router.get("/", doctor_controller_1.DoctorController.getAll);
router.get("/:id", doctor_controller_1.DoctorController.getById);
// Admin only
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), doctor_controller_1.DoctorController.create);
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), doctor_controller_1.DoctorController.update);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), doctor_controller_1.DoctorController.delete);
//  Allow Admin or Doctor to update availability
router.put("/:id/availability", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin", "Doctor"), doctor_controller_1.DoctorController.updateAvailability);
exports.default = router;
