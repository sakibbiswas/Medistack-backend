"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const analytics_service_1 = require("./analytics.service");
const response_1 = require("../../utils/response");
class AnalyticsController {
    static async getAnalytics(_req, res) {
        try {
            const totals = await analytics_service_1.AnalyticsService.getTotals();
            const appointmentsByDay = await analytics_service_1.AnalyticsService.getAppointmentsPerDay(7);
            const revenueByMonth = await analytics_service_1.AnalyticsService.getRevenuePerMonth(6);
            const topDoctors = await analytics_service_1.AnalyticsService.getTopDoctors(5);
            const topPatients = await analytics_service_1.AnalyticsService.getTopPatients(5);
            return (0, response_1.successResponse)(res, {
                totals,
                appointmentsByDay,
                revenueByMonth,
                topDoctors,
                topPatients,
            });
        }
        catch (err) {
            return (0, response_1.errorResponse)(res, err.message || "Analytics fetch failed", 500);
        }
    }
}
exports.AnalyticsController = AnalyticsController;
