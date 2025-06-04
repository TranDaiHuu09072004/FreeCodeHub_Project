import { Request, Response } from "express";
import Blog from "../models/blog.model";

export const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.json(blogs);
};
