"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const payment_service_1 = require("./payment.service");
const response_1 = require("../../utils/response");
const payment_model_1 = require("./payment.model");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-08-27.basil",
});
class PaymentController {
    // Create payment (Stripe, Cash, Other)
    static async create(req, res) {
        try {
            const { method, appointmentId, amount } = req.body;
            // Validate required fields
            if (!appointmentId) {
                return res.status(400).json({ message: "Appointment ID is required" });
            }
            if (!method) {
                return res.status(400).json({ message: "Payment method is required" });
            }
            let payment;
            // Stripe payment
            if (method === "Stripe") {
                if (!amount || amount <= 0) {
                    return res.status(400).json({ message: "Invalid amount for Stripe payment" });
                }
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            price_data: {
                                currency: "usd",
                                product_data: { name: "Medical Appointment" },
                                unit_amount: Math.round(amount * 100), // convert to cents
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
                });
                // Record payment in DB with Pending status
                payment = await payment_service_1.PaymentService.createPayment({
                    appointmentId,
                    patientId: req.user._id,
                    amount,
                    method,
                    status: "Pending",
                    transactionId: session.id,
                });
                return res.status(200).json({
                    sessionId: session.id,
                    url: session.url,
                });
            }
            else {
                // Cash or Other payments
                if (!amount || amount <= 0) {
                    return res.status(400).json({ message: "Invalid amount for payment" });
                }
                payment = await payment_service_1.PaymentService.createPayment({
                    appointmentId,
                    patientId: req.user._id,
                    amount,
                    method,
                    status: method === "Cash" ? "Completed" : "Pending",
                });
                return (0, response_1.successResponse)(res, payment, "Payment recorded successfully");
            }
        }
        catch (err) {
            return (0, response_1.errorResponse)(res, err.message);
        }
    }
    // Stripe webhook for payment confirmation
    static async webhook(req, res) {
        try {
            const sig = req.headers["stripe-signature"];
            const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
                await payment_model_1.Payment.findOneAndUpdate({ transactionId: session.id }, { status: "Completed", transactionId: session.payment_intent }, { new: true });
            }
            res.json({ received: true });
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
    // Get all payments (Admin)
    static async getAll(req, res) {
        try {
            const payments = await payment_service_1.PaymentService.getPayments();
            return (0, response_1.successResponse)(res, payments);
        }
        catch (err) {
            return (0, response_1.errorResponse)(res, err.message);
        }
    }
    // Get payment by ID (Admin or Patient)
    static async getById(req, res) {
        try {
            const payment = await payment_service_1.PaymentService.getPaymentById(req.params.id);
            return (0, response_1.successResponse)(res, payment);
        }
        catch (err) {
            return (0, response_1.errorResponse)(res, err.message);
        }
    }
    // Delete payment (Admin)
    static async delete(req, res) {
        try {
            const deleted = await payment_service_1.PaymentService.deletePayment(req.params.id);
            if (!deleted) {
                return (0, response_1.errorResponse)(res, "Payment not found", 404);
            }
            return (0, response_1.successResponse)(res, { success: true }, "Payment deleted successfully");
        }
        catch (err) {
            return (0, response_1.errorResponse)(res, err.message);
        }
    }
}
exports.PaymentController = PaymentController;
