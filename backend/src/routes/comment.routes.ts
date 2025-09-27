import express from "express";
import {
  createComment,
  getComment,
  deleteComment,
  getAllComments,
} from "../controllers/comment.control.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/comments", getAllComments);
router.post("/comments", authenticate, createComment);
router.get("/comments/:id", getComment);
router.delete("/comments/:id", authenticate, deleteComment);
export default router;
