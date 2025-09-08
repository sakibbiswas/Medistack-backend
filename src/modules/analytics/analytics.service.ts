// src/modules/admin/analytics.service.ts
import mongoose from "mongoose";

import { User } from "../user/user.model";
import { Doctor } from "../doctor/doctor.model";
import { Appointment } from "../appointment/appointment.model";
import { Payment } from "../payment/payment.model";

export class AnalyticsService {
  // overview totals
  static async getTotals() {
    const [usersCount, doctorsCount, appointmentsCount, paymentsCount] = await Promise.all([
      User.countDocuments({}),
      Doctor.countDocuments({}),
      Appointment.countDocuments({}),
      Payment.countDocuments({}),
    ]);

    // total revenue from completed payments
    const revenueAgg = await Payment.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalRevenue = revenueAgg[0]?.total ?? 0;

    return { usersCount, doctorsCount, appointmentsCount, paymentsCount, totalRevenue };
  }

  // appointments per day for last N days (default 7)
  static async getAppointmentsPerDay(days = 7) {
    const now = new Date();
    const start = new Date(now);
    start.setDate(now.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    const agg = await Appointment.aggregate([
      { $match: { date: { $gte: start } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const resultsMap: Record<string, number> = {};
    agg.forEach((r: any) => (resultsMap[r._id] = r.count));

    const daysArr: { date: string; count: number }[] = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      daysArr.push({ date: key, count: resultsMap[key] ?? 0 });
    }

    return daysArr;
  }

  // revenue per month for last N months (default 6)
  static async getRevenuePerMonth(months = 6) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1, 0, 0, 0, 0);

    const agg = await Payment.aggregate([
      { $match: { status: "Completed", createdAt: { $gte: start } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const resultsMap: Record<string, number> = {};
    agg.forEach((r: any) => {
      const key = `${r._id.year}-${String(r._id.month).padStart(2, "0")}`;
      resultsMap[key] = r.total;
    });

    const monthsArr: { month: string; revenue: number }[] = [];
    for (let i = 0; i < months; i++) {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("default", { month: "short", year: "numeric" });
      monthsArr.push({ month: label, revenue: resultsMap[key] ?? 0 });
    }

    return monthsArr;
  }

  // top doctors by appointment count
  static async getTopDoctors(limit = 5) {
    const agg = await Appointment.aggregate([
      { $group: { _id: "$doctorId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "doctors",
          localField: "_id",
          foreignField: "_id",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      {
        $project: {
          _id: 0,
          doctorId: "$doctor._id",
          name: "$doctor.name",
          specialization: "$doctor.specialization",
          count: 1,
        },
      },
    ]);

    return agg;
  }

  // top patients by appointment count
  static async getTopPatients(limit = 5) {
    const agg = await Appointment.aggregate([
      { $group: { _id: "$patientId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "patient",
        },
      },
      { $unwind: "$patient" },
      {
        $project: {
          _id: 0,
          patientId: "$patient._id",
          name: "$patient.name",
          email: "$patient.email",
          count: 1,
        },
      },
    ]);

    return agg;
  }
}
