import { RequestHandler } from "express";
import Lesson from "../models/lesson.model";
import mongoose from "mongoose";
// GET: /api/lessons/video/:videoId - Lấy bài học theo videoId
export const getLessonByVideoId: RequestHandler = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      res.status(400).json({ error: "Thiếu videoId" });
      return;
    }

    const lesson = await Lesson.findOne({ videoId });

    if (!lesson) {
      res.status(404).json({ error: "Không tìm thấy bài học" });
      return;
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: "Lỗi Server khi lấy bài học" });
  }
};

// GET: /api/lessons - Lấy tất cả bài học
// GET: /api/lessons?courseId=abc123
export const getAllLessons: RequestHandler = async (req, res) => {
  try {
    const { courseId } = req.query;

    const filter: any = {};
    if (courseId) {
      if (!mongoose.Types.ObjectId.isValid(courseId as string)) {
        res.status(400).json({ error: "courseId không hợp lệ" });
      }
      filter.courseId = courseId;
    }

    const lessons = await Lesson.find(filter).sort({ order: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server khi lấy danh sách bài học" });
  }
};

// POST: /api/lessons - Tạo 1 hoặc nhiều bài học
export const createLesson: RequestHandler = async (req, res) => {
  try {
    // Nếu gửi 1 object thì chuyển thành mảng
    const lessonsData = Array.isArray(req.body) ? req.body : [req.body];

    // Validate tất cả phần tử
    for (const item of lessonsData) {
      const { courseId, title, videoId } = item;
      if (!courseId || !title || !videoId) {
        res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
        return;
      }
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        res.status(400).json({ error: "courseId không hợp lệ" });
        return;
      }
    }

    // Chuyển courseId thành ObjectId cho từng lesson
    const lessonsToInsert = lessonsData.map((item) => ({
      ...item,
      courseId: mongoose.Types.ObjectId.createFromHexString(item.courseId),
    }));

    // Thực hiện chèn nhiều
    const createdLessons = await Lesson.insertMany(lessonsToInsert, {
      ordered: true,
    });
    // ordered: true => nếu bất kỳ 1 phần tử lỗi unique, toàn bộ sẽ rollback

    res.status(201).json(
      createdLessons.map((lesson) => ({
        ...lesson.toObject(),
        courseId: lesson.courseId ? lesson.courseId.toString() : null,
      }))
    );
  } catch (error: any) {
    console.error(error);
    // Bắt lỗi duplicate key (videoId unique)
    if (error.code === 11000) {
      res.status(409).json({ error: "Có bài học đã tồn tại (videoId trùng)" });
      return;
    }
    res.status(500).json({ error: "Lỗi server khi tạo bài học" });
  }
};
