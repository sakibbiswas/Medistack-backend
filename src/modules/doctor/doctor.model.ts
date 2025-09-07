import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  email: string;
  password: string;
  specialization: string;
  departmentId: Types.ObjectId; // Changed from string to Types.ObjectId
  availableSlots: string[];
  role: "Doctor";
  createdAt: Date;
}

const doctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: "Department", required: true },
  availableSlots: [{ type: String }],
  role: { type: String, enum: ["Doctor"], default: "Doctor" },
  createdAt: { type: Date, default: Date.now },
});

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);








