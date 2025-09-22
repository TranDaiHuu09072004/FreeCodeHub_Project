import express from "express";
import {
  createComment,
  getComment,
  deleteComment,
  getAllComments,
} from "../controllers/comment.control";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/comments", getAllComments);
router.post("/comments", authenticate, createComment);
router.get("/comments", getComment);
router.delete("/comments/:id", authenticate, deleteComment);
export default router;
