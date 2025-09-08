"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const department_model_1 = require("./department.model");
class DepartmentService {
    static async getAllDepartments() {
        return await department_model_1.Department.find();
    }
    static async getDepartmentById(id) {
        return await department_model_1.Department.findById(id);
    }
    static async createDepartment(data) {
        const dept = new department_model_1.Department(data);
        return await dept.save();
    }
    static async updateDepartment(id, update) {
        return await department_model_1.Department.findByIdAndUpdate(id, update, { new: true });
    }
    static async deleteDepartment(id) {
        return await department_model_1.Department.findByIdAndDelete(id);
    }
}
exports.DepartmentService = DepartmentService;
