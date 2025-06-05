import { RequestHandler } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body; // CHỈ nhận name, email, password

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email đã tồn tại" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "client", // GÁN MẶC ĐỊNH
      status: true, // GÁN MẶC ĐỊNH
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Người dùng không tồn tại" });
      return;
    }

    if (user.status !== true) {
      res.status(403).json({ message: "Tài khoản đã bị khóa" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role, name: user.name, email: user.email });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
