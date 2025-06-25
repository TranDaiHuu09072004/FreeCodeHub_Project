import { Request, RequestHandler, Response } from "express";
import Author from "../models/author.model";

export const getAllAuthors = async (req: Request, res: Response) => {
  const authors = await Author.find();
  res.json(authors);
};

export const CreateAuthor = async (req: Request, res: Response) => {
  try {
    const newAuthors = await Author.create(req.body);
    res.status(201).json(newAuthors);
  } catch (error: any) {
    console.log("Lỗi khi tạo mới Tác giả", error);
    // Trả về lỗi chi tiết hơn cho client để dễ debug
    res.status(500).json({
      message: "Đã xảy ra lỗi khi tạo tác giả.",
      error: error.message || error,
    });
  }
};

export const UpdateAuthor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const AuthorData = req.body;
    const AuthorUpdate = await Author.findByIdAndUpdate(id, AuthorData, {
      new: true,
      runValidators: true,
    });
    if (!AuthorUpdate) {
      res.status(404).json({ message: "Không tìm thấy tác giả cần cập nhật" });
    }

    res
      .status(200)
      .json({ message: "Cập nhật tác giả thành công", AuthorUpdate });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error });
  }
};

export const DeletedAuthor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      res.status(404).json({ message: "Không tìm thấy tác giả cần xóa" });
    }
    res.status(200).json({ message: "Xóa tác giả thành công", deletedAuthor });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
