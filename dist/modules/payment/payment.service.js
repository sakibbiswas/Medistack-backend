"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const payment_model_1 = require("./payment.model");
class PaymentService {
    static async createPayment(data) {
        const payment = new payment_model_1.Payment(data);
        return await payment.save();
    }
    static async getPayments(filter = {}) {
        return await payment_model_1.Payment.find(filter)
            .populate("appointmentId")
            .populate("patientId", "name email");
    }
    static async getPaymentById(id) {
        return await payment_model_1.Payment.findById(id)
            .populate("appointmentId")
            .populate("patientId", "name email");
    }
    static async updatePayment(id, update) {
        return await payment_model_1.Payment.findByIdAndUpdate(id, update, { new: true });
    }
    static async deletePayment(id) {
        return await payment_model_1.Payment.findByIdAndDelete(id);
    }
}
exports.PaymentService = PaymentService;
