
import express from "express";
import { DoctorController } from "./doctor.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

// Public routes
router.get("/", DoctorController.getAll);
router.get("/:id", DoctorController.getById);

// Admin only
router.post("/", protect, authorize("Admin"), DoctorController.create);
router.put("/:id", protect, authorize("Admin"), DoctorController.update);
router.delete("/:id", protect, authorize("Admin"), DoctorController.delete);

//  Allow Admin or Doctor to update availability
router.put("/:id/availability", protect, authorize("Admin", "Doctor"), DoctorController.updateAvailability);

export default router;
