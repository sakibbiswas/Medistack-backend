"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("./appointment.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Patient routes
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Patient"), appointment_controller_1.AppointmentController.create);
router.get("/patient", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Patient"), appointment_controller_1.AppointmentController.getPatientAppointments);
// Doctor route
router.get("/doctor", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Doctor"), appointment_controller_1.AppointmentController.getDoctorAppointments);
// Admin / Doctor / Patient routes
router.get("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin", "Doctor", "Patient"), appointment_controller_1.AppointmentController.getAll);
router.get("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin", "Doctor", "Patient"), appointment_controller_1.AppointmentController.getById);
// Admin / Doctor update
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin", "Doctor"), appointment_controller_1.AppointmentController.update);
// Admin delete
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), appointment_controller_1.AppointmentController.delete);
exports.default = router;
