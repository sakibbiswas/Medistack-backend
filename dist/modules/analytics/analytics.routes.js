"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/admin/analytics.routes.ts
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("./analytics.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Admin only analytics
router.get("/", auth_middleware_1.protect, (0, auth_middleware_1.authorize)("Admin"), analytics_controller_1.AnalyticsController.getAnalytics);
exports.default = router;
