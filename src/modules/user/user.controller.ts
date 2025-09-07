import { Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse, errorResponse } from "../../utils/response";

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return successResponse(res, users);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      return successResponse(res, user);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const user = await UserService.createUser(name, email, password, role);
      return successResponse(res, user);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      return successResponse(res, user);
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);
      return successResponse(res, null, "User deleted successfully");
    } catch (error: any) {
      return errorResponse(res, error.message);
    }
  }
}
