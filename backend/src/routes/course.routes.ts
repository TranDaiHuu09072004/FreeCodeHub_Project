import { Router } from "express";
import {
  getAllCourses,
  createCourse,
  getCourseDetail,
  UpdateCourse,
  getFeaturedCourses,
  getLessonsByCourseSlug,
  registerCourse,
  searchCourse,
  DeletedCourses,
} from "../controllers/course.control.js";

const router = Router();
router.get("/courses", getAllCourses);
router.get("/courses/search", searchCourse);
router.get("/courses/featured", getFeaturedCourses);
router.put("/courses/:id", UpdateCourse);
router.get("/courses/:slug", getCourseDetail);
router.get("/courses/:slug/lessons", getLessonsByCourseSlug);
router.post("/courses", createCourse);
router.post("/register-courses", registerCourse);
router.delete("/courses/:id", DeletedCourses);

export default router;
