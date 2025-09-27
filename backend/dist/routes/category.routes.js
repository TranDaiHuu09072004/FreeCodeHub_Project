import { getAllCategory, CreateCategory, 
//   recountCourseCount,
UpdateCate, DeletedCate, } from "./../controllers/category.control.js";
import { Router } from "express";
const router = Router();
router.get("/categories", getAllCategory);
router.post("/categories", CreateCategory);
router.put("/categories/:id", UpdateCate);
router.delete("/categories/:id", DeletedCate);
export default router;
