import { Payment } from "./payment.model";

export class PaymentService {
  static async createPayment(data: any) {
    const payment = new Payment(data);
    return await payment.save();
  }

  static async getPayments(filter: any = {}) {
    return await Payment.find(filter)
      .populate("appointmentId")
      .populate("patientId", "name email");
  }

  static async getPaymentById(id: string) {
    return await Payment.findById(id)
      .populate("appointmentId")
      .populate("patientId", "name email");
  }

  static async updatePayment(id: string, update: any) {
    return await Payment.findByIdAndUpdate(id, update, { new: true });
  }

  static async deletePayment(id: string) {
    return await Payment.findByIdAndDelete(id);
  }
}
