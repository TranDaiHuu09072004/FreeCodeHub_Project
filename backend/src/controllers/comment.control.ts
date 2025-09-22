import { RequestHandler } from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.model";
import Lesson from "../models/lesson.model";

// Helper: ensure targetId belongs to Lesson only
const ensureLessonTarget = async (targetId: string): Promise<boolean> => {
  if (!mongoose.Types.ObjectId.isValid(targetId)) return false;
  const exists = await Lesson.exists({ _id: targetId });
  return Boolean(exists);
};

// getAll Comment

export const getAllComments: RequestHandler = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userId", "name avatar createdAt")
      .populate({
        path: "targetId",
        select: "title name", // giả sử Lesson có trường "title" hoặc "name"
        model: "Lesson", // Replace with the specific model name or handle dynamic models outside populate
      })
      .select("userId content targetType targetId");
    if (!comments) res.status(404).json({ message: "Không tìm thấy Comments" });
    res
      .status(200)
      .json({ message: "Lấy tất cả comments thành công", comments });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error });
  }
};

// 👉 Client: Tạo comment
export const createComment: RequestHandler = async (req, res) => {
  try {
    const { targetId, content, parentId } = req.body;
    const userId = (req as any).user?.id; // align with auth.middleware

    if (!targetId || !content) {
      res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
      return;
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401).json({ message: "Không xác thực được người dùng" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      res.status(400).json({ message: "targetId không hợp lệ" });
      return;
    }

    const isLesson = await ensureLessonTarget(targetId);
    if (!isLesson) {
      res.status(400).json({ message: "targetId không thuộc Lesson hợp lệ" });
      return;
    }

    const newComment = await Comment.create({
      userId,
      targetId,
      targetType: "Lesson",
      content,
      parentId: parentId || null,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Lỗi tạo comment:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// 👉 Lấy comment theo targetId + targetType
export const getComment: RequestHandler = async (req, res) => {
  try {
    const { targetId } = req.query;

    if (!targetId) {
      res.status(400).json({ message: "Thiếu targetId" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(String(targetId))) {
      res.status(400).json({ message: "targetId không hợp lệ" });
      return;
    }

    const isLesson = await ensureLessonTarget(String(targetId));
    if (!isLesson) {
      res.status(400).json({ message: "targetId không thuộc Lesson hợp lệ" });
      return;
    }

    const comments = await Comment.find({
      targetId,
      targetType: "Lesson",
      parentId: null,
    })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy comment", error });
  }
};

export const deleteComment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "id không hợp lệ" });
      return;
    }
    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Comment không tồn tại" });
      return;
    }

    res.json({ message: "Xoá comment thành công", deleted });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi khi xoá comment", error });
  }
};
