import express from "express";
import { UserController } from "./user.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

// Admin only routes
router.get("/", protect, authorize("Admin"), UserController.getAll);
router.get("/:id", protect, authorize("Admin"), UserController.getById);
router.post("/", protect, authorize("Admin"), UserController.create);
router.put("/:id", protect, authorize("Admin"), UserController.update);
router.delete("/:id", protect, authorize("Admin"), UserController.delete);

export default router;
