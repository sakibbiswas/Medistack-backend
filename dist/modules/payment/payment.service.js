"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const payment_model_1 = require("./payment.model");
const crypto_1 = __importDefault(require("crypto"));
class PaymentService {
    static async createPayment(data) {
        // Cash হলে auto transactionId generate করব
        if (data.method === "Cash" && !data.transactionId) {
            data.transactionId = "CASH-" + crypto_1.default.randomBytes(6).toString("hex");
            data.status = "Completed"; // Cash হলে সাথে সাথেই Paid ধরে নিবে
        }
        const payment = new payment_model_1.Payment(data);
        return await payment.save();
    }
    static async getPayments() {
        return await payment_model_1.Payment.find()
            .populate("appointmentId", "date time status")
            .populate("patientId", "name email");
    }
    static async getPaymentById(id) {
        return await payment_model_1.Payment.findById(id)
            .populate("appointmentId", "date time status")
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
