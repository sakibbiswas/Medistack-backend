

import { Request, Response } from "express";
import { DepartmentService } from "./department.service";
import { Doctor } from "../doctor/doctor.model";
import { successResponse, errorResponse } from "../../utils/response";

export class DepartmentController {
  static async getAll(req: Request, res: Response) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      return successResponse(res, departments);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const department = await DepartmentService.getDepartmentById(req.params.id);
      return successResponse(res, department);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const dept = await DepartmentService.createDepartment(req.body);
      return successResponse(res, dept, "Department created successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const dept = await DepartmentService.updateDepartment(req.params.id, req.body);
      return successResponse(res, dept, "Department updated successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await DepartmentService.deleteDepartment(req.params.id);
      return successResponse(res, null, "Department deleted successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  //  New: get all doctors in a department
  static async getDoctors(req: Request, res: Response) {
    try {
      const departmentId = req.params.id;
      const doctors = await Doctor.find({ departmentId });
      return successResponse(res, doctors);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
