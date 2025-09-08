import express from "express";
import { PaymentController } from "./payment.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", protect, authorize("Patient"), PaymentController.create);
router.get("/", protect, authorize("Admin"), PaymentController.getAll);
router.get("/:id", protect, authorize("Admin", "Patient"), PaymentController.getById);
router.delete("/:id", protect, authorize("Admin"), PaymentController.delete); // 👈 Added delete route

// Stripe webhook (⚠️ no auth, must be raw body)
router.post("/webhook", express.raw({ type: "application/json" }), PaymentController.webhook);

export default router;
