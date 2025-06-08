import { Response, Request, RequestHandler } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

//http://localhost:5000/api/auth/users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// http://localhost:5000/api/auth/update-profile
export const updateProfile: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest; // ✅ Ép kiểu tại đây

  try {
    const { name, email, avatar, date_of_birth } = authReq.body;

    const user = await User.findById(authReq.user.id);
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
      return;
    }

    const avatarFile = req.file;
    if (avatarFile) {
      const avatarURL = `http://localhost:5000/uploads/${avatarFile.filename}`;
      user.avatar = avatarURL;
    } else if (req.body.avatar) {
      user.avatar = avatar;
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.date_of_birth = date_of_birth ?? user.date_of_birth;

    await user.save();

    res.json({ message: "Cập nhật thông tin thành công", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
