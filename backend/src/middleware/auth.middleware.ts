import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
  id: string;
  role?: string | string[];
  email: string;
}

export interface AuthRequest extends Request {
  user?: DecodedUser;
}

// Middleware kiểm tra token
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Không có token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res
        .status(401)
        .json({ message: "Token đã hết hạn. Vui lòng đăng nhập lại." });
      return;
    }
    res.status(401).json({ message: "Token không hợp lệ." });
    return;
  }
};

// Middleware kiểm tra quyền truy cập
export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Không xác thực được người dùng" });
      return;
    }

    const userRoles = Array.isArray(req.user.role)
      ? req.user.role
      : [req.user.role || ""];

    const hasPermission = userRoles.some((role) => roles.includes(role));

    if (!hasPermission) {
      res.status(403).json({ message: "Không có quyền truy cập" });
      return;
    }

    next();
  };
};
