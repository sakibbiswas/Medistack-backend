
import mongoose from "mongoose";
import { Appointment } from "./appointment.model";

export class AppointmentService {
  static async createAppointment(data: any) {
    const appointment = new Appointment(data);
    return await appointment.save();
  }

  static async getAppointments(filter: any = {}) {
    return await Appointment.find(filter)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .populate("departmentId", "name");
  }

  static async getAppointmentById(id: string) {
    return await Appointment.findById(id)
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .populate("departmentId", "name");
  }

  static async updateAppointment(id: string, update: any) {
    return await Appointment.findByIdAndUpdate(id, update, { new: true });
  }

  static async deleteAppointment(id: string) {
    return await Appointment.findByIdAndDelete(id);
  }

  //  Doctor-specific appointments (populate patient info)
  static async getDoctorAppointments(doctorId: string) {
    return await Appointment.find({
      doctorId: new mongoose.Types.ObjectId(doctorId),
    })
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .populate("departmentId", "name")
      .sort({ date: 1, time: 1 });
  }

  //  Patient-specific appointments
  static async getPatientAppointments(patientId: string) {
    return await Appointment.find({
      patientId: new mongoose.Types.ObjectId(patientId),
    })
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .populate("departmentId", "name")
      .sort({ date: 1, time: 1 });
  }
}
