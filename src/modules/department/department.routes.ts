
import express from "express";
import { DepartmentController } from "./department.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

// Public routes
router.get("/", DepartmentController.getAll);
router.get("/:id", DepartmentController.getById)
router.get("/:id/doctors", DepartmentController.getDoctors); //  new route

// Admin routes
router.post("/", protect, authorize("Admin"), DepartmentController.create);
router.put("/:id", protect, authorize("Admin"), DepartmentController.update);
router.delete("/:id", protect, authorize("Admin"), DepartmentController.delete);

export default router;
