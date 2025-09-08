import { Payment } from "./payment.model";
import crypto from "crypto";

export class PaymentService {
  static async createPayment(data: any) {
    // Cash হলে auto transactionId generate করব
    if (data.method === "Cash" && !data.transactionId) {
      data.transactionId = "CASH-" + crypto.randomBytes(6).toString("hex");
      data.status = "Completed"; // Cash হলে সাথে সাথেই Paid ধরে নিবে
    }

    const payment = new Payment(data);
    return await payment.save();
  }

  static async getPayments() {
    return await Payment.find()
      .populate("appointmentId", "date time status")
      .populate("patientId", "name email");
  }

  static async getPaymentById(id: string) {
    return await Payment.findById(id)
      .populate("appointmentId", "date time status")
      .populate("patientId", "name email");
  }

  static async updatePayment(id: string, update: any) {
    return await Payment.findByIdAndUpdate(id, update, { new: true });
  }

  static async deletePayment(id: string) {
    return await Payment.findByIdAndDelete(id);
  }
}
