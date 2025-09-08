// src/modules/admin/analytics.controller.ts
import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";
import { successResponse, errorResponse } from "../../utils/response";

export class AnalyticsController {
  static async getAnalytics(_req: Request, res: Response) {
    try {
      const totals = await AnalyticsService.getTotals();
      const appointmentsByDay = await AnalyticsService.getAppointmentsPerDay(7);
      const revenueByMonth = await AnalyticsService.getRevenuePerMonth(6);
      const topDoctors = await AnalyticsService.getTopDoctors(5);
      const topPatients = await AnalyticsService.getTopPatients(5);

      return successResponse(res, {
        totals,
        appointmentsByDay,
        revenueByMonth,
        topDoctors,
        topPatients,
      });
    } catch (err: any) {
      return errorResponse(res, err.message || "Analytics fetch failed", 500);
    }
  }
}
