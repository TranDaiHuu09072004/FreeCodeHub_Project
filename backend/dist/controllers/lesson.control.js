import Lesson from "../models/lesson.model.js";
import mongoose from "mongoose";
import { Types } from "mongoose";
// GET: /api/lessons/video/:videoId - Lấy bài học theo videoId
export const getLessonByVideoId = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi Server khi lấy bài học" });
    }
};
// GET: /api/lessons - Lấy tất cả bài học
// GET: /api/lessons?courseId=abc123
export const getAllLessons = async (req, res) => {
    try {
        const { courseId } = req.query;
        const filter = {};
        if (courseId) {
            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                res.status(400).json({ error: "courseId không hợp lệ" });
            }
            filter.courseId = courseId;
        }
        const lessons = await Lesson.find(filter).sort({ order: 1 });
        res.json(lessons);
    }
    catch (error) {
        res.status(500).json({ error: "Lỗi server khi lấy danh sách bài học" });
    }
};
// POST: /api/lessons - Tạo 1 hoặc nhiều bài học
export const createLesson = async (req, res) => {
    try {
        const lessonsData = Array.isArray(req.body) ? req.body : [req.body];
        // Validate đầu vào
        for (const item of lessonsData) {
            const { courseId, title } = item;
            if (!courseId || !title) {
                res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
                return;
            }
            if (!mongoose.Types.ObjectId.isValid(courseId)) {
                res.status(400).json({ error: "courseId không hợp lệ" });
                return;
            }
            if (!item.videoId) {
                item.videoId = new Types.ObjectId().toString();
            }
        }
        // Gom các bài học theo courseId để xử lý order hiệu quả
        const lessonsGrouped = {};
        for (const lesson of lessonsData) {
            const courseId = lesson.courseId;
            if (!lessonsGrouped[courseId]) {
                lessonsGrouped[courseId] = [];
            }
            lessonsGrouped[courseId].push(lesson);
        }
        const lessonsToInsert = [];
        // Duyệt từng nhóm courseId để lấy order lớn nhất hiện tại
        for (const courseIdStr in lessonsGrouped) {
            const group = lessonsGrouped[courseIdStr];
            const courseId = new mongoose.Types.ObjectId(courseIdStr);
            // Lấy order lớn nhất hiện tại trong DB
            const lastLesson = await Lesson.findOne({ courseId })
                .sort({ order: -1 })
                .limit(1);
            let currentOrder = lastLesson?.order ?? 0;
            // Duyệt qua từng bài học trong nhóm đó
            for (const item of group) {
                lessonsToInsert.push({
                    ...item,
                    courseId,
                    order: item.order ?? ++currentOrder, // tự tăng nếu không có
                });
            }
        }
        // Chèn tất cả bài học sau khi xử lý order
        const createdLessons = await Lesson.insertMany(lessonsToInsert, {
            ordered: true,
        });
        // Trả về kết quả
        res.status(201).json(createdLessons.map((lesson) => ({
            ...lesson.toObject(),
            courseId: lesson.courseId?.toString() ?? null,
        })));
    }
    catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(409).json({ error: "Có bài học đã tồn tại (videoId trùng)" });
            return;
        }
        res.status(500).json({ error: "Lỗi server khi tạo bài học" });
    }
};
// DELETE: /api/lessons/:id - Xóa bài học
export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: "ID bài học không hợp lệ" });
            return;
        }
        const lesson = await Lesson.findByIdAndDelete(id);
        if (!lesson) {
            res.status(404).json({ error: "Không tìm thấy bài học" });
            return;
        }
        res.json({ message: "Xóa bài học thành công" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Lỗi server khi xóa bài học" });
    }
};
