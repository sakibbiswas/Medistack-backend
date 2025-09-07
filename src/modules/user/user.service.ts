import { User } from "./user.model";
import { hashPassword } from "../../utils/hash";

export class UserService {
  static async getAllUsers() {
    return await User.find();
  }

  static async getUserById(id: string) {
    return await User.findById(id);
  }

  static async createUser(name: string, email: string, password: string, role: "Admin" | "Patient") {
    const hashed = await hashPassword(password);
    const user = new User({ name, email, password: hashed, role });
    return await user.save();
  }

  static async updateUser(id: string, update: any) {
    return await User.findByIdAndUpdate(id, update, { new: true });
  }

  static async deleteUser(id: string) {
    return await User.findByIdAndDelete(id);
  }
}
