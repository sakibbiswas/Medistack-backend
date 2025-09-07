import express from "express";
import { PaymentController } from "./payment.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

// Patient creates payment
router.post("/", protect, authorize("Patient"), PaymentController.create);

// Admin can view all payments
router.get("/", protect, authorize("Admin"), PaymentController.getAll);
router.get("/:id", protect, authorize("Admin"), PaymentController.getById);

// Admin updates/deletes
router.put("/:id", protect, authorize("Admin"), PaymentController.update);
router.delete("/:id", protect, authorize("Admin"), PaymentController.delete);

export default router;
