
import { Response } from "express";
import { AppointmentService } from "./appointment.service";
import { successResponse, errorResponse } from "../../utils/response";
import { AuthRequest } from "../../middlewares/auth.middleware";

export class AppointmentController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const appointmentData = { ...req.body, patientId: req.user._id };
      const appointment = await AppointmentService.createAppointment(appointmentData);
      return successResponse(res, appointment, "Appointment booked successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getAll(req: AuthRequest, res: Response) {
    try {
      const appointments = await AppointmentService.getAppointments();
      return successResponse(res, appointments);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getPatientAppointments(req: AuthRequest, res: Response) {
    try {
      const appointments = await AppointmentService.getPatientAppointments(req.user._id);
      return successResponse(res, appointments);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getDoctorAppointments(req: AuthRequest, res: Response) {
    try {
      const appointments = await AppointmentService.getDoctorAppointments(req.user._id);
      return successResponse(res, appointments);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const appointment = await AppointmentService.getAppointmentById(req.params.id);
      return successResponse(res, appointment);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const appointment = await AppointmentService.updateAppointment(req.params.id, req.body);
      return successResponse(res, appointment, "Appointment updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      await AppointmentService.deleteAppointment(req.params.id);
      return successResponse(res, null, "Appointment deleted successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}

















