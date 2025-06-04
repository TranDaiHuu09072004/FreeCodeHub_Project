import { Router } from "express";
import {
  getAllLessons,
  getLessonByVideoId,
  createLesson,
} from "../controllers/lesson.control";

const router = Router();

router.get("/lessons", getAllLessons);
router.get("/lessons/video/:videoId", getLessonByVideoId);
router.post("/lessons", createLesson);
export default router;
