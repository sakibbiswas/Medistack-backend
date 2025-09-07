import mongoose, { Schema, Document } from "mongoose";

export interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  role: "Admin" | "Doctor" | "Patient";
  createdAt: Date;
}

const authSchema = new Schema<IAuth>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Doctor", "Patient"], default: "Patient" },
  createdAt: { type: Date, default: Date.now },
});

export const Auth = mongoose.model<IAuth>("Auth", authSchema);
