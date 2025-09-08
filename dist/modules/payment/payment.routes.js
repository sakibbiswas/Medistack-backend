"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Patient creates payment
router.post("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Patient"), payment_controller_1.PaymentController.create);
// Admin can view all payments
router.get("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), payment_controller_1.PaymentController.getAll);
router.get("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), payment_controller_1.PaymentController.getById);
// Admin updates/deletes
router.put("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), payment_controller_1.PaymentController.update);
router.delete("/:id", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), payment_controller_1.PaymentController.delete);
exports.default = router;
