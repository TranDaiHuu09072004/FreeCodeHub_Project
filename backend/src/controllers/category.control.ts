import { Response, Request } from "express";
import Categories from "../models/category.model";
export const getAllCategory = async (req: Request, res: Response) => {
  const categories = await Categories.find();
  res.json(categories);
};
