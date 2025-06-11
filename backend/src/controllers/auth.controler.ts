import { RequestHandler } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail";

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Email không tồn tại" });
    return;
  }

  const newPassword = "123456@x";
  user.password = newPassword;
  await user.save();

  await sendEmail(
    email,
    "Khôi phục mật khẩu - Mật khẩu mới của bạn",
    `<p>Xin chào bạn!</p>
     <p>Mật khẩu mới của bạn là: <strong>${newPassword}</strong></p>
     <p>Vui lòng đăng nhập với mật khẩu mới và thay đổi nếu cần thiết.</p>`
  );

  res.json({
    message: "Mật khẩu mới đã được gửi vui lòng check lại Email của bạn!!",
  });
};

// export const resetPassword: RequestHandler = async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   const user = await User.findOne({
//     resetToken: token,
//     registeredCourses: {
//       $gt: new Date(),
//     },
//   });

//   if (!user) {
//     res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
//     return;
//   }

//   user.password = newPassword; // sẽ được hash trong schema
//   user.resetToken = undefined;
//   user.resetTokenExpiry = undefined;

//   await user.save();

//   res.json({ message: "Mật khẩu đã được đặt lại thành công" });
// };

export const changePassword: RequestHandler = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Kiểm tra nếu không có req.user hoặc req.user.email
    if (!req.user || !req.user.email) {
      res.status(401).json({ message: "Không xác thực được người dùng" });
      return;
    }
    const email = req.user.email;
    console.log(email);
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

    if (newPassword != confirmPassword) {
      res
        .status(400)
        .json({ message: "Mật khẩu mới và thay đổi không chính xác" });
      return;
    }

    user.password = newPassword; // Schema sẽ tự hash
    await user.save();

    res.json({ message: "Mật khẩu đã được thay đổi thành công" });
    return;
  } catch (error) {
    console.error("Lỗi đổi mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server khi đổi mật khẩu" });
    return;
  }
};

export const register: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body; // CHỈ nhận name, email, password

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email đã tồn tại" });
      return;
    }

    // Mật khẩu sẽ được băm bởi hook pre('save') trong user.model.ts
    const newUser = new User({
      name,
      email,
      password: password, // KHÔNG BĂM MẬT KHẨU TẠI ĐÂY NỮA
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ message: "Người dùng không tồn tại" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Mật khẩu không đúng" });
      return;
    }

    if (user.status !== true) {
      res.status(403).json({ message: "Tài khoản đã bị khóa" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
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
