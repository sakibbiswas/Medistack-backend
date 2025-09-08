
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPayment extends Document {
  appointmentId: Types.ObjectId;
  patientId: Types.ObjectId;
  amount: number;
  status: "Pending" | "Completed" | "Failed";
  method: "Stripe" | "Cash" | "Other";
  transactionId?: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
  patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  method: { type: String, enum: ["Stripe", "Cash", "Other"], required: true },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
