import jwt from "jsonwebtoken";
// Middleware kiểm tra token
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Không có token" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
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
export const authorize = (...roles) => {
    return (req, res, next) => {
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
