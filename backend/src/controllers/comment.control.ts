import { RequestHandler } from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.model";

// 👉 Client: Tạo comment
export const createComment: RequestHandler = async (req, res) => {
  try {
    const { targetId, targetType, content, parentId } = req.body;
    const userId = (req as any).user?.id; // align with auth.middleware

    if (!targetId || !targetType || !content) {
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

    if (!["Lesson", "Blog"].includes(String(targetType))) {
      res
        .status(400)
        .json({ message: "targetType phải là 'Lesson' hoặc 'Blog'" });
      return;
    }

    const newComment = await Comment.create({
      userId,
      targetId,
      targetType,
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
    const { targetId, targetType } = req.query;

    if (!targetId || !targetType) {
      res.status(400).json({ message: "Thiếu targetId hoặc targetType" });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(String(targetId))) {
      res.status(400).json({ message: "targetId không hợp lệ" });
      return;
    }

    if (!["Lesson", "Blog"].includes(String(targetType))) {
      res
        .status(400)
        .json({ message: "targetType phải là 'Lesson' hoặc 'Blog'" });
      return;
    }

    const comments = await Comment.find({
      targetId,
      targetType,
      parentId: null,
    })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy comment", error });
  }
};

// 👉 Admin xoá comment
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
