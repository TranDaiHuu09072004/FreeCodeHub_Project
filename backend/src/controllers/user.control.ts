import { Response, Request } from "express";
import User from "../models/user.model";
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.json(users);
};
