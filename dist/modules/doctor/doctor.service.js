"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const doctor_model_1 = require("./doctor.model");
const hash_1 = require("../../utils/hash");
class DoctorService {
    static async getAllDoctors() {
        return await doctor_model_1.Doctor.find().populate("departmentId", "name");
    }
    static async getDoctorById(id) {
        return await doctor_model_1.Doctor.findById(id).populate("departmentId", "name");
    }
    static async createDoctor(data) {
        const hashed = await (0, hash_1.hashPassword)(data.password);
        const doctor = new doctor_model_1.Doctor({
            ...data,
            password: hashed,
            availableSlots: Array.isArray(data.availableSlots)
                ? data.availableSlots
                : [], // ✅ Always array
        });
        return await doctor.save();
    }
    static async updateDoctor(id, update) {
        if (update.availableSlots && !Array.isArray(update.availableSlots)) {
            update.availableSlots = [update.availableSlots]; // ✅ force array
        }
        return await doctor_model_1.Doctor.findByIdAndUpdate(id, update, { new: true }).populate("departmentId", "name");
    }
    static async deleteDoctor(id) {
        return await doctor_model_1.Doctor.findByIdAndDelete(id);
    }
    static async updateAvailability(id, slots) {
        return await doctor_model_1.Doctor.findByIdAndUpdate(id, { availableSlots: Array.isArray(slots) ? slots : [] }, { new: true }).populate("departmentId", "name");
    }
}
exports.DoctorService = DoctorService;
