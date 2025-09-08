import { Doctor } from "./doctor.model";
import { hashPassword } from "../../utils/hash";

export class DoctorService {
  static async getAllDoctors() {
    return await Doctor.find().populate("departmentId", "name");
  }

  static async getDoctorById(id: string) {
    return await Doctor.findById(id).populate("departmentId", "name");
  }

  static async createDoctor(data: any) {
    const hashed = await hashPassword(data.password);

    const doctor = new Doctor({
      ...data,
      password: hashed,
      availableSlots: Array.isArray(data.availableSlots)
        ? data.availableSlots
        : [], //  Always array
    });

    return await doctor.save();
  }

  static async updateDoctor(id: string, update: any) {
    if (update.availableSlots && !Array.isArray(update.availableSlots)) {
      update.availableSlots = [update.availableSlots]; // ✅ force array
    }

    return await Doctor.findByIdAndUpdate(id, update, { new: true }).populate(
      "departmentId",
      "name"
    );
  }

  static async deleteDoctor(id: string) {
    return await Doctor.findByIdAndDelete(id);
  }

  static async updateAvailability(id: string, slots: string[]) {
    return await Doctor.findByIdAndUpdate(
      id,
      { availableSlots: Array.isArray(slots) ? slots : [] },
      { new: true }
    ).populate("departmentId", "name");
  }
}

