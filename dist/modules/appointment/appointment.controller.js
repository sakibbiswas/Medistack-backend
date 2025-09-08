"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const appointment_service_1 = require("./appointment.service");
const response_1 = require("../../utils/response");
class AppointmentController {
    static async create(req, res) {
        try {
            const appointmentData = { ...req.body, patientId: req.user._id };
            const appointment = await appointment_service_1.AppointmentService.createAppointment(appointmentData);
            return (0, response_1.successResponse)(res, appointment, "Appointment booked successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getAll(req, res) {
        try {
            const appointments = await appointment_service_1.AppointmentService.getAppointments();
            return (0, response_1.successResponse)(res, appointments);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getPatientAppointments(req, res) {
        try {
            const appointments = await appointment_service_1.AppointmentService.getPatientAppointments(req.user._id);
            return (0, response_1.successResponse)(res, appointments);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getDoctorAppointments(req, res) {
        try {
            const appointments = await appointment_service_1.AppointmentService.getDoctorAppointments(req.user._id);
            return (0, response_1.successResponse)(res, appointments);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getById(req, res) {
        try {
            const appointment = await appointment_service_1.AppointmentService.getAppointmentById(req.params.id);
            return (0, response_1.successResponse)(res, appointment);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async update(req, res) {
        try {
            const appointment = await appointment_service_1.AppointmentService.updateAppointment(req.params.id, req.body);
            return (0, response_1.successResponse)(res, appointment, "Appointment updated successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async delete(req, res) {
        try {
            await appointment_service_1.AppointmentService.deleteAppointment(req.params.id);
            return (0, response_1.successResponse)(res, null, "Appointment deleted successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
}
exports.AppointmentController = AppointmentController;
