import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  getCourseDetail,
  updateCourse,
  getFeaturedCourses,
  getLessonsByCourseSlug,
  registerCourse,
  searchCourse,
} from "../controllers/course.control";

const router = Router();
router.get("/courses", getAllCourses);
router.get("/courses/search", searchCourse);
router.get("/courses/featured", getFeaturedCourses);
router.get("/courses/:id", getCourseDetail);
router.get("/courses/:slug/lessons", getLessonsByCourseSlug);
router.post("/", createCourse);
router.put("/courses/:id", updateCourse);
router.post("/register-courses", registerCourse);

export default router;
