
// backend/src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error.middleware";
import connectDB from "./config/db";
import { AuthService } from "./modules/auth/auth.service";

dotenv.config();

// Import routes
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import doctorRoutes from "./modules/doctor/doctor.routes";
import appointmentRoutes from "./modules/appointment/appointment.routes";
import departmentRoutes from "./modules/department/department.routes";
import paymentRoutes from "./modules/payment/payment.routes";

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/payments", paymentRoutes);

// Health check
app.get("/", (_req, res) => res.send("MediStack++ Backend is running"));

// Error Handler
app.use(errorHandler);

//  Seed admin user
AuthService.seedAdmin();

export default app;
