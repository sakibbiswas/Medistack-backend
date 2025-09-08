"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const response_1 = require("../../utils/response");
class PaymentController {
    static async create(req, res) {
        try {
            const payment = await payment_service_1.PaymentService.createPayment(req.body);
            return (0, response_1.successResponse)(res, payment, "Payment created successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getAll(req, res) {
        try {
            const payments = await payment_service_1.PaymentService.getPayments();
            return (0, response_1.successResponse)(res, payments);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getById(req, res) {
        try {
            const payment = await payment_service_1.PaymentService.getPaymentById(req.params.id);
            return (0, response_1.successResponse)(res, payment);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async update(req, res) {
        try {
            const payment = await payment_service_1.PaymentService.updatePayment(req.params.id, req.body);
            return (0, response_1.successResponse)(res, payment, "Payment updated successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async delete(req, res) {
        try {
            await payment_service_1.PaymentService.deletePayment(req.params.id);
            return (0, response_1.successResponse)(res, null, "Payment deleted successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
}
exports.PaymentController = PaymentController;
