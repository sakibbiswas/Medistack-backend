// src/modules/admin/analytics.routes.ts
import express from "express";
import { AnalyticsController } from "./analytics.controller";
import { protect, authorize } from "../../middlewares/auth.middleware";

const router = express.Router();

// Admin only analytics
router.get("/", protect, authorize("Admin"), AnalyticsController.getAnalytics);

export default router;
