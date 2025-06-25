import { Router } from "express";
import {
  getAllAuthors,
  CreateAuthor,
  UpdateAuthor,
  DeletedAuthor,
} from "../controllers/author.control";

const router = Router();

router.get("/authors", getAllAuthors);
router.post("/authors", CreateAuthor);
router.put("/authors/:id", UpdateAuthor);
router.delete("/authors/:id", DeletedAuthor);

export default router;
