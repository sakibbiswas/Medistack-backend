
// backend/src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { User } from "../user/user.model";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "secret123";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1h";

export class AuthService {
  //  Register new user
  static async register(name: string, email: string, password: string, role: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // JWT
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE } as SignOptions
    );

    //  Return with _id
    return {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  //  Login existing user
  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE } as SignOptions
    );

    //  Return with _id
    return {
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  //  Seed admin user
  static async seedAdmin() {
    const email = "admin@medistack.com";
    const existing = await User.findOne({ email });
    if (existing) return console.log("Admin already exists");

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin User",
      email,
      password: hashedPassword,
      role: "Admin",
    });

    console.log("✅ Admin user created: admin@medistack.com / admin123");
  }
}
