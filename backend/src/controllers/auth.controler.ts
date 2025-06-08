import { RequestHandler } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/SendMail";

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Email không tồn tại" });
    return;
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendEmail(
    email,
    "Khôi phục mật khẩu",
    `<p>Nhấp vào liên kết bên dưới để đặt lại mật khẩu:</p>
     <a href="${resetLink}">${resetLink}</a>`
  );

  res.json({ message: "Email đã được gửi vui lòng check lại Email!!" });
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    registeredCourses: {
      $gt: new Date(),
    },
  });

  if (!user) {
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    return;
  }

  user.password = newPassword; // sẽ được hash trong schema
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ message: "Mật khẩu đã được đặt lại thành công" });
};

export const changePassword: RequestHandler = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Người dùng không tồn tại" });
    return;
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Mật khẩu cũ không đúng" });
    return;
  }

  user.password = newPassword; // sẽ được hash trong schema
  await user.save();

  res.json({ message: "Mật khẩu đã được thay đổi thành công" });
};

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

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      id: user.id,
      registeredCourses: user.registeredCourses,
      avatar: user.avatar,
      date_of_birth: user.date_of_birth,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    return;
  }
};
