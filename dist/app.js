"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("./middlewares/error.middleware");
const db_1 = __importDefault(require("./config/db"));
const auth_service_1 = require("./modules/auth/auth.service");
dotenv_1.default.config();
// Import routes
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const doctor_routes_1 = __importDefault(require("./modules/doctor/doctor.routes"));
const appointment_routes_1 = __importDefault(require("./modules/appointment/appointment.routes"));
const department_routes_1 = __importDefault(require("./modules/department/department.routes"));
const payment_routes_1 = __importDefault(require("./modules/payment/payment.routes"));
const app = (0, express_1.default)();
// Connect to MongoDB
(0, db_1.default)();
// Middlewares
// app.use(cors());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://medistack-frontend.vercel.app'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/users", user_routes_1.default);
app.use("/api/v1/doctors", doctor_routes_1.default);
app.use("/api/v1/appointments", appointment_routes_1.default);
app.use("/api/v1/departments", department_routes_1.default);
app.use("/api/v1/payments", payment_routes_1.default);
// Health check
app.get("/", (_req, res) => res.send("MediStack++ Backend is running"));
// Error Handler
app.use(error_middleware_1.errorHandler);
//  Seed admin user
auth_service_1.AuthService.seedAdmin();
exports.default = app;
