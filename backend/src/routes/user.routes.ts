import { Router } from "express";
import {
  getAllUsers,
  updateProfile,
  createUsers,
  UpdateUser,
  DeletedUser,
} from "../controllers/user.control";
import upload from "../middleware/upload";
import { authenticate, authorize } from "../middleware/auth.middleware";
const router = Router();

router.get("/users", getAllUsers);
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
