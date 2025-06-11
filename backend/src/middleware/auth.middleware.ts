import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
  id: string;
  role?: string;
  email: string;
}

declare module "express" {
  interface Request {
    user?: DecodedUser;
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Không có token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "nvalid tokenI" });
    return;
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Không xác thực được người dùng" });
      return;
    }
    const userRoles = Array.isArray(req.user.role)
      ? req.user.role
      : [req.user.role as string];
    const hasPermission = userRoles.some((role: string) =>
      roles.includes(role)
    );

    if (!hasPermission) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
