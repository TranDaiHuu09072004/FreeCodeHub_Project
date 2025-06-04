import { getAllCategory } from "./../controllers/category.control";
import { Router } from "express";

const router = Router();

router.get("/categories", getAllCategory);

export default router;
