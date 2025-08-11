import { RequestHandler } from "express";
import Comment from "../models/comment.model";

export const createComment: RequestHandler = async (req, res) => {
  try {
    const { targetId, targetType, content, parentId } = req.body;
    const userId = req.user?.id;
    console.log("Tạo comment với dữ liệu:", {
      userId,
      targetId,
      targetType,
      content,
      parentId,
    });

    const newComment = await Comment.create({
      userId,
      targetId,
      targetType,
      content,
      parentId: parentId || null,
    });

    console.log({ userId, targetId, targetType, content, parentId });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Lỗi tạo comment:", JSON.stringify(error, null, 2));
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getComment: RequestHandler = async (req, res) => {
  try {
    const { targetId, targetType } = req.query;

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

export const DeletedComment: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.status(500).json("Có lỗi khi xóa Comment");
  }
};
