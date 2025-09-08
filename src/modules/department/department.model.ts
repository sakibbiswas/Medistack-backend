
import mongoose, { Schema, Document } from "mongoose";

export interface IDepartment extends Document {
  name: string;
  description: string;
  createdAt: Date;
}

const departmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Department = mongoose.model<IDepartment>("Department", departmentSchema);
