import { Response, Request, RequestHandler } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

// Get current user information
export const getCurrentUser: RequestHandler = async (req, res) => {
  const authReq = req as AuthRequest;

  try {
    if (!authReq.user) {
      res.status(401).json({ message: "Người dùng chưa được xác thực" });
      return;
    }

    const user = await User.findById(authReq.user.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "Không tìm thấy người dùng" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

//http://localhost:5000/api/auth/users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    const userObject = user.toObject();
    delete (userObject as any).password;
    res.status(201).json(userObject);
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

export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // We don't want to update password to be empty if not provided.
    const { password, ...updateData } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "Người dùng không tồn tại!!!" });
      return;
    }

    // Update fields from request body
    Object.assign(user, updateData);

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    const userObject = updatedUser.toObject();
    delete (userObject as any).password;

    res.status(200).json(userObject);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật người dùng" });
  }
};

export const DeletedUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: "Không xóa được người dùng!" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa người dùng" });
  }
};
