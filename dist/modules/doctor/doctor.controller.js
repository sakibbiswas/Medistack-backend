"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const doctor_service_1 = require("./doctor.service");
const response_1 = require("../../utils/response");
class DoctorController {
    static async getAll(req, res) {
        try {
            const doctors = await doctor_service_1.DoctorService.getAllDoctors();
            return (0, response_1.successResponse)(res, doctors);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getById(req, res) {
        try {
            const doctor = await doctor_service_1.DoctorService.getDoctorById(req.params.id);
            return (0, response_1.successResponse)(res, doctor);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async create(req, res) {
        try {
            const doctor = await doctor_service_1.DoctorService.createDoctor(req.body);
            return (0, response_1.successResponse)(res, doctor, "Doctor created successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async update(req, res) {
        try {
            const doctor = await doctor_service_1.DoctorService.updateDoctor(req.params.id, req.body);
            return (0, response_1.successResponse)(res, doctor, "Doctor updated successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async delete(req, res) {
        try {
            await doctor_service_1.DoctorService.deleteDoctor(req.params.id);
            return (0, response_1.successResponse)(res, null, "Doctor deleted successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async updateAvailability(req, res) {
        try {
            const { slots } = req.body;
            const doctor = await doctor_service_1.DoctorService.updateAvailability(req.params.id, slots);
            return (0, response_1.successResponse)(res, doctor, "Availability updated");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
}
exports.DoctorController = DoctorController;
