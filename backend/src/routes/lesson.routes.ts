import { Router } from "express";
import {
  getAllLessons,
  getLessonByVideoId,
  createLesson,
  deleteLesson,
} from "../controllers/lesson.control";

const router = Router();

router.get("/lessons", getAllLessons);
router.get("/lessons/video/:videoId", getLessonByVideoId);
router.post("/lessons", createLesson);
router.delete("/lessons/:id", deleteLesson);
export default router;
