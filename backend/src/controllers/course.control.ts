import { RequestHandler } from "express";
import Course from "../models/course.models.js";
import Lesson from "../models/lesson.model.js";
import User from "../models/user.model.js";

//api search khóa học
export const searchCourse: RequestHandler = async (req, res) => {
  try {
    const query = req.query.q?.toString().toLocaleLowerCase() || "";
    const regex = new RegExp(query, "i");

    const result = await Course.find({
      $or: [{ title: regex }, { author: regex }, { category: regex }],
    });

    if (result.length === 0) {
      res.status(404).json({ message: "Không tìm thấy khóa học phù hợp" });
      return;
    }

    res.json(result);
    return;
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm khóa học" });
    return;
  }
};

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
    return;
  } catch (error: unknown) {
    // Check if the error is an instance of Error to safely access .message
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Lỗi server", error: errorMessage });
    return;
  }
};

// GET all courses
export const getAllCourses: RequestHandler = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("author", "name image_author")
      .populate("category", "name")
      .sort({ updatedAt: -1 });
    res.json(courses);
    return;
  } catch (error) {
    res.status(500).json({ error: "Lỗi server khi lấy danh sách khóa học" });
    return;
  }
};

// GET /api/courses/:slug/lessons
export const getLessonsByCourseSlug: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;

    // B1: Tìm course theo slug
    const course = await Course.findOne({ slug });
    if (!course) {
      res.status(404).json({ message: "Không tìm thấy khóa học với slug này" });
      return;
    }

    // B2: Tìm lessons có courseId = course._id
    const lessons = await Lesson.find({ courseId: course._id }).sort({
      order: 1,
    });

    res.json(lessons);
    return;
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bài học", error });
    return;
  }
};

// POST create new course
export const createCourse: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      description,
      level,
      status,
      thumbnail,
      highlights,
      isFeatured,
      image_author,
      slogan,
    } = req.body;
    const newsCourse = new Course({
      title,
      author,
      category,
      description,
      level,
      status,
      thumbnail,
      highlights: Array.isArray(highlights) ? highlights : [],
      isFeatured,
      image_author,
      slogan,
    });

    const saveCourses = await newsCourse.save();
    res.status(201).json(saveCourses);
    return;
  } catch (error) {
    res.status(400).json({ error: "Lỗi khi tạo mới khóa học" });
    return;
  }
};

// GET featured courses
export const getFeaturedCourses: RequestHandler = async (req, res) => {
  try {
    const featuredCourses = await Course.find({ isFeatured: true }).sort({
      updatedAt: -1,
    });
    res.json(featuredCourses);
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Lỗi server khi lấy danh sách khóa học nổi bật" });
    return;
  }
};

// GET course detail + lessons by slug
export const getCourseDetail: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params; // Lấy slug từ params

    // Tìm khóa học bằng slug
    const course = await Course.findOne({ slug });

    if (!course) {
      res
        .status(404)
        .json({ error: `Không tìm thấy khóa học với slug: ${slug}` });
      return;
    }

    // Tìm lessons dựa trên _id của khóa học vừa tìm thấy
    const lessons = await Lesson.find({
      courseId: course._id, // Sử dụng _id của khóa học
    }).sort({ order: 1 });

    res.json({ ...course.toObject(), lessons });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server khi lấy chi tiết một khóa học" });
    return;
  }
};

export const UpdateCourse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Chặn các key nguy hiểm bắt đầu bằng $
    for (const key in updateData) {
      if (key.startsWith("$")) {
        delete updateData[key];
      }
    }

    console.log("Dữ liệu cần cập nhật:", updateData);

    const updateCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updateCourse) {
      res.status(404).json({ message: "Không tìm thấy khóa học cần cập nhật" });
      return;
    }

    res.status(200).json(updateCourse);
  } catch (error) {
    console.error("Lỗi cập nhật:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật" });
  }
};

export const DeletedCourses: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const detetedCourses = await Course.findByIdAndDelete(id);
    if (!detetedCourses) {
      res.status(404).json({ message: "Không tìm thấy khóa học cần xóa" });
    }
    res
      .status(200)
      .json({ message: "Xóa khóa học thành công", detetedCourses });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
