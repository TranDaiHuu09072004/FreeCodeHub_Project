import { Response, Request, RequestHandler } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

//http://localhost:5000/api/auth/users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.create(req.body);
    res.status(201).json(users);
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    res.status(500).json({ message: "Có lỗi xảy ra khi tạo mới người dùng" });
  }
};

// http://localhost:5000/api/auth/update-profile
export const updateProfile: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;

  try {
    const { name, email, avatar, date_of_birth } = authReq.body;

    if (!authReq.user) {
      res.status(401).json({ message: "Người dùng chưa được xác thực" });
      return;
    }

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
