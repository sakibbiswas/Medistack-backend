import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import { successResponse, errorResponse } from "../../utils/response";

export class PaymentController {
  static async create(req: Request, res: Response) {
    try {
      const payment = await PaymentService.createPayment(req.body);
      return successResponse(res, payment, "Payment created successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const payments = await PaymentService.getPayments();
      return successResponse(res, payments);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      return successResponse(res, payment);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const payment = await PaymentService.updatePayment(req.params.id, req.body);
      return successResponse(res, payment, "Payment updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await PaymentService.deletePayment(req.params.id);
      return successResponse(res, null, "Payment deleted successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
