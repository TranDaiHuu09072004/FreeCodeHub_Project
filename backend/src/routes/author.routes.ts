import { Router } from "express";
import {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.control";

const router = Router();

router.get("/authors", getAllAuthors);
router.post("/authors", createAuthor);
router.put("/authors/:id", updateAuthor);
router.delete("/authors/:id", deleteAuthor);

export default router;
