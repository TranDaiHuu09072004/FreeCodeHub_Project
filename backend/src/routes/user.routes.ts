import { Router } from "express";
import { getAllUsers, updateProfile } from "../controllers/user.control";
import upload from "../middleware/upload";
import { authenticate, authorize } from "../middleware/auth.middleware";
const router = Router();

router.get("/users", getAllUsers);
router.put(
  "/update-profile",
  authenticate,
  authorize("client", "author", "admin"),
  upload.single("avatar"),
  updateProfile
);

export default router;
