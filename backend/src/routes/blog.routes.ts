import { Router } from "express";
import { getAllBlogs } from "../controllers/blog.control";

const router = Router();

router.get("/blogs", getAllBlogs);

export default router;
