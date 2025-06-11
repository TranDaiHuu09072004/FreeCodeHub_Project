import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  // resetPassword,
  changePassword,
} from "../controllers/auth.controler";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
router.post("/change-password", authenticate, changePassword);
router.post("/register", register);
router.post("/login", login);

// chỉ user có role "admin" thì mới vào được
router.get(
  "/admin/dashboard",
  authenticate,
  authorize("admin"),
  (req, res, next) => {
    res.send("Admin Dashboard");
    return;
  }
);

// chỉ "author" hoặc "admin" mới vào được

router.get(
  "/admin/author",
  authenticate,
  authorize("author", "admin"),
  (req, res, next) => {
    res.send("Welcome to Author");
  }
);

// chỉ người dùng

router.get("/", authenticate, authorize("user"), (req, res) => {
  res.send("Người dùng");
});

export default router;
