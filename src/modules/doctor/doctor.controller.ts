
import { Request, Response } from "express";
import { DoctorService } from "./doctor.service";
import { successResponse, errorResponse } from "../../utils/response";

export class DoctorController {
  static async getAll(req: Request, res: Response) {
    try {
      const doctors = await DoctorService.getAllDoctors();
      return successResponse(res, doctors);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const doctor = await DoctorService.getDoctorById(req.params.id);
      return successResponse(res, doctor);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const doctor = await DoctorService.createDoctor(req.body);
      return successResponse(res, doctor, "Doctor created successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const doctor = await DoctorService.updateDoctor(req.params.id, req.body);
      return successResponse(res, doctor, "Doctor updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await DoctorService.deleteDoctor(req.params.id);
      return successResponse(res, null, "Doctor deleted successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async updateAvailability(req: Request, res: Response) {
    try {
      const { slots } = req.body;
      const doctor = await DoctorService.updateAvailability(req.params.id, slots);
      return successResponse(res, doctor, "Availability updated");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
