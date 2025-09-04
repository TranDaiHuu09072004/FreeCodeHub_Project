import express from "express";
import {
  createComment,
  getComment,
  deleteComment,
} from "../controllers/comment.control";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/comments", authenticate, createComment);
router.get("/comments", getComment);
router.delete("/comments/:id", authenticate, deleteComment);

export default router;
