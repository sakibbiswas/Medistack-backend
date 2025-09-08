"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const appointment_model_1 = require("./appointment.model");
class AppointmentService {
    static async createAppointment(data) {
        const appointment = new appointment_model_1.Appointment(data);
        return await appointment.save();
    }
    static async getAppointments(filter = {}) {
        return await appointment_model_1.Appointment.find(filter)
            .populate("patientId", "name email")
            .populate("doctorId", "name specialization")
            .populate("departmentId", "name");
    }
    static async getAppointmentById(id) {
        return await appointment_model_1.Appointment.findById(id)
            .populate("patientId", "name email")
            .populate("doctorId", "name specialization")
            .populate("departmentId", "name");
    }
    static async updateAppointment(id, update) {
        return await appointment_model_1.Appointment.findByIdAndUpdate(id, update, { new: true });
    }
    static async deleteAppointment(id) {
        return await appointment_model_1.Appointment.findByIdAndDelete(id);
    }
    //  Doctor-specific appointments (populate patient info)
    static async getDoctorAppointments(doctorId) {
        return await appointment_model_1.Appointment.find({
            doctorId: new mongoose_1.default.Types.ObjectId(doctorId),
        })
            .populate("patientId", "name email")
            .populate("doctorId", "name specialization")
            .populate("departmentId", "name")
            .sort({ date: 1, time: 1 });
    }
    //  Patient-specific appointments
    static async getPatientAppointments(patientId) {
        return await appointment_model_1.Appointment.find({
            patientId: new mongoose_1.default.Types.ObjectId(patientId),
        })
            .populate("patientId", "name email")
            .populate("doctorId", "name specialization")
            .populate("departmentId", "name")
            .sort({ date: 1, time: 1 });
    }
}
exports.AppointmentService = AppointmentService;
