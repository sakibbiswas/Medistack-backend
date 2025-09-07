import { Department } from "./department.model";

export class DepartmentService {
  static async getAllDepartments() {
    return await Department.find();
  }

  static async getDepartmentById(id: string) {
    return await Department.findById(id);
  }

  static async createDepartment(data: any) {
    const dept = new Department(data);
    return await dept.save();
  }

  static async updateDepartment(id: string, update: any) {
    return await Department.findByIdAndUpdate(id, update, { new: true });
  }

  static async deleteDepartment(id: string) {
    return await Department.findByIdAndDelete(id);
  }
}
