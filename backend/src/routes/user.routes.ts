import { Router } from "express";
import {
  getAllUsers,
  updateProfile,
  createUsers,
  UpdateUser,
  DeletedUser,
  getCurrentUser,
} from "../controllers/user.control.js";
import upload from "../middleware/upload.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/users", getAllUsers);
router.get("/users/me", authenticate, getCurrentUser);
router.post("/users", createUsers);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeletedUser);
router.put(
  "/update-profile",
  authenticate,
  authorize("client", "author", "admin"),
  upload.single("avatar"),
  updateProfile
);

export default router;
