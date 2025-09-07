
import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middlewares/validate.middleware";
import { z } from "zod";

const router = express.Router();

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["Admin", "Doctor", "Patient"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", validateRequest(registerSchema), AuthController.register);
router.post("/login", validateRequest(loginSchema), AuthController.login);

export default router;
