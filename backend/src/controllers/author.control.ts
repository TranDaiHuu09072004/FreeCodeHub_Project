import { Request, Response } from "express";
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
