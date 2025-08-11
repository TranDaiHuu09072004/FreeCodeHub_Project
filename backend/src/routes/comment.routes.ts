import express from "express";
import {
  createComment,
  getComment,
  DeletedComment,
} from "../controllers/comment.control";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/comments", authenticate, createComment);
router.get("/comments", getComment);
router.delete("/comments/:id", authenticate, DeletedComment);

export default router;
