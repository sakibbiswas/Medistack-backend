
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { successResponse, errorResponse } from "../../utils/response";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      if (!["Admin", "Doctor", "Patient"].includes(role)) {
        return errorResponse(res, "Invalid role", 400);
      }

      const result = await AuthService.register(name, email, password, role);
      return successResponse(res, result, "Registration successful");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return successResponse(res, result, "Login successful");
    } catch (error: any) {
      return errorResponse(res, error.message, 400);
    }
  }
}
