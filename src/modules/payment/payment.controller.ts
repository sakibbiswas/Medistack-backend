
import { Response } from "express";
import Stripe from "stripe";
import { PaymentService } from "./payment.service";
import { successResponse, errorResponse } from "../../utils/response";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Payment } from "./payment.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil",
});

export class PaymentController {
  // Create payment (Stripe, Cash, Other)
  static async create(req: AuthRequest, res: Response) {
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
        payment = await PaymentService.createPayment({
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
      } else {
        // Cash or Other payments
        if (!amount || amount <= 0) {
          return res.status(400).json({ message: "Invalid amount for payment" });
        }

        payment = await PaymentService.createPayment({
          appointmentId,
          patientId: req.user._id,
          amount,
          method,
          status: method === "Cash" ? "Completed" : "Pending",
        });

        return successResponse(res, payment, "Payment recorded successfully");
      }
    } catch (err: any) {
      return errorResponse(res, err.message);
    }
  }

  // Stripe webhook for payment confirmation
  static async webhook(req: any, res: Response) {
    try {
      const sig = req.headers["stripe-signature"] as string;
      const event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        await Payment.findOneAndUpdate(
          { transactionId: session.id },
          { status: "Completed", transactionId: session.payment_intent },
          { new: true }
        );
      }

      res.json({ received: true });
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  // Get all payments (Admin)
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const payments = await PaymentService.getPayments();
      return successResponse(res, payments);
    } catch (err: any) {
      return errorResponse(res, err.message);
    }
  }

  // Get payment by ID (Admin or Patient)
  static async getById(req: AuthRequest, res: Response) {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      return successResponse(res, payment);
    } catch (err: any) {
      return errorResponse(res, err.message);
    }
  }

  // Delete payment (Admin)
  static async delete(req: AuthRequest, res: Response) {
    try {
      const deleted = await PaymentService.deletePayment(req.params.id);
      if (!deleted) {
        return errorResponse(res, "Payment not found", 404);
      }
      return successResponse(res, { success: true }, "Payment deleted successfully");
    } catch (err: any) {
      return errorResponse(res, err.message);
    }
  }
}
