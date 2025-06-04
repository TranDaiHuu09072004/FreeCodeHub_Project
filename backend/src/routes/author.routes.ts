import { Router } from "express";
import { getAllAuthors, CreateAuthor } from "../controllers/author.control";

const router = Router();

router.get("/authors", getAllAuthors);
router.post("/authors", CreateAuthor);

export default router;
