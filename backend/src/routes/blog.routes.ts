import { Router } from "express";
import {
  getAllBlogs,
  CreateBlogs,
  getBlogsBySlug,
  UpdateBlogs,
  getFeaturedBlogs,
} from "../controllers/blog.control";

const router = Router();

router.get("/blogs", getAllBlogs);
router.get("/blogs/featured", getFeaturedBlogs);
router.post("/blogs", CreateBlogs);
router.get("/blogs/:slug", getBlogsBySlug);
router.put("/blogs/:id", UpdateBlogs);

export default router;
