
import express from "express";
import { AppointmentController } from "./appointment.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

// Patient routes
router.post("/", protect, authorize("Patient"), AppointmentController.create);
router.get("/patient", protect, authorize("Patient"), AppointmentController.getPatientAppointments);

// Doctor route
router.get("/doctor", protect, authorize("Doctor"), AppointmentController.getDoctorAppointments);

// Admin / Doctor / Patient routes
router.get("/", protect, authorize("Admin", "Doctor", "Patient"), AppointmentController.getAll);
router.get("/:id", protect, authorize("Admin", "Doctor", "Patient"), AppointmentController.getById);

// Admin / Doctor update
router.put("/:id", protect, authorize("Admin", "Doctor"), AppointmentController.update);

// Admin delete
router.delete("/:id", protect, authorize("Admin"), AppointmentController.delete);

export default router;









