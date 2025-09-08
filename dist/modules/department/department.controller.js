"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const department_service_1 = require("./department.service");
const doctor_model_1 = require("../doctor/doctor.model");
const response_1 = require("../../utils/response");
class DepartmentController {
    static async getAll(req, res) {
        try {
            const departments = await department_service_1.DepartmentService.getAllDepartments();
            return (0, response_1.successResponse)(res, departments);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async getById(req, res) {
        try {
            const department = await department_service_1.DepartmentService.getDepartmentById(req.params.id);
            return (0, response_1.successResponse)(res, department);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async create(req, res) {
        try {
            const dept = await department_service_1.DepartmentService.createDepartment(req.body);
            return (0, response_1.successResponse)(res, dept, "Department created successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async update(req, res) {
        try {
            const dept = await department_service_1.DepartmentService.updateDepartment(req.params.id, req.body);
            return (0, response_1.successResponse)(res, dept, "Department updated successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    static async delete(req, res) {
        try {
            await department_service_1.DepartmentService.deleteDepartment(req.params.id);
            return (0, response_1.successResponse)(res, null, "Department deleted successfully");
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
    //  New: get all doctors in a department
    static async getDoctors(req, res) {
        try {
            const departmentId = req.params.id;
            const doctors = await doctor_model_1.Doctor.find({ departmentId });
            return (0, response_1.successResponse)(res, doctors);
        }
        catch (error) {
            return (0, response_1.errorResponse)(res, error.message);
        }
    }
}
exports.DepartmentController = DepartmentController;
