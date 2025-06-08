import { RequestHandler, Request, Response } from "express";
import mongoose from "mongoose";
import Course from "../models/course.models";
import Lesson from "../models/lesson.model";
import User from "../models/user.model";

// api đăng ký khóa học:
export const registerCourse: RequestHandler = async (req, res) => {
  const { userId, courseSlug } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Người dùng không tồn tại" });
      return;
    }

    const course = await Course.findOne({ slug: courseSlug });
    if (!course) {
      res.status(404).json({ message: "Khóa học không tồn tại" });
      return;
    }

    if (!user.registeredCourses.includes(courseSlug)) {
      user.registeredCourses.push(courseSlug);
      await user.save();
    }

    res.json({
      message: "Đăng ký khóa học thành công",
      registeredCourses: user.registeredCourses,
    });
  } catch (error: unknown) {
    // Check if the error is an instance of Error to safely access .message
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Lỗi server", error: errorMessage });
  }
};

// GET all courses
export const getAllCourses: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const courses = await Course.find().sort({ updatedAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server khi lấy danh sách khóa học" });
  }
};

// GET /api/courses/:slug/lessons
export const getLessonsByCourseSlug: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const { slug } = req.params;

    // B1: Tìm course theo slug
    const course = await Course.findOne({ slug });
    if (!course) {
      res.status(404).json({ message: "Không tìm thấy khóa học với slug này" });
    }
    if (!course) {
      res.status(404).json({ message: "Không tìm thấy khóa học với slug này" });
      return;
    }

    // B2: Tìm lessons có courseId = course._id
    const lessons = await Lesson.find({ courseId: course._id }).sort({
      order: 1,
    });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bài học", error });
  }
};

// POST create new course
export const createCourse: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: "Lỗi khi tạo mới khóa học" });
  }
};

// GET featured courses
export const getFeaturedCourses: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const featuredCourses = await Course.find({ isFeatured: true }).sort({
      updatedAt: -1,
    });
    res.json(featuredCourses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Lỗi server khi lấy danh sách khóa học nổi bật" });
  }
};

// GET course detail + lessons by slug
export const getCourseDetail: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const courseSlug = req.params.id; // Lấy slug từ params

    // Tìm khóa học bằng slug
    const course = await Course.findOne({ slug: courseSlug });

    if (!course) {
      res
        .status(404)
        .json({ error: `Không tìm thấy khóa học với slug: ${courseSlug}` });
      return;
    }

    // Tìm lessons dựa trên _id của khóa học vừa tìm thấy
    const lessons = await Lesson.find({
      courseId: course._id, // Sử dụng _id của khóa học
    }).sort({ order: 1 });

    res.json({ ...course.toObject(), lessons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server khi lấy chi tiết một khóa học" });
  }
};

// PUT update course
export const updateCourse: (
  req: Request,
  res: Response
) => Promise<void> = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      res.status(400).json({ error: "ID khóa học không hợp lệ" });
      return;
    }
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCourse) {
      res.status(404).json({ error: "Không tìm thấy khóa học" });
      return;
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: "Lỗi khi cập nhật khóa học" });
  }
};
