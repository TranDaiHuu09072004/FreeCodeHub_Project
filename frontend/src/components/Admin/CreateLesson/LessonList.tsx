"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/User/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "react-toastify";

interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  videoId: string;
  videoUrl: string;
  order: number;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

interface LessonListProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
}

const LessonList: React.FC<LessonListProps> = ({
  isOpen,
  onClose,
  courseId,
  courseTitle,
}) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/lessons?courseId=${courseId}`);
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Lỗi khi tải danh sách bài học");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && courseId) {
      fetchLessons();
    }
  }, [isOpen, courseId]);

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Bạn có chắc muốn xóa bài học này?")) return;

    try {
      await axiosInstance.delete(`/lessons/${lessonId}`);
      toast.success("Xóa bài học thành công!");
      fetchLessons();
    } catch (error) {
      toast.error("Lỗi khi xóa bài học");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1200px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Danh sách bài học</DialogTitle>
          <DialogDescription>Khóa học: {courseTitle}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
              <p className="mt-2 text-gray-400">Đang tải...</p>
            </div>
          ) : lessons.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">
                Chưa có bài học nào trong khóa học này
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#677d9b]">STT</TableHead>
                  <TableHead className="text-[#677d9b]">Tiêu đề</TableHead>
                  <TableHead className="text-[#677d9b]">Video ID</TableHead>
                  <TableHead className="text-[#677d9b]">Thứ tự</TableHead>
                  <TableHead className="text-[#677d9b]">Thời lượng</TableHead>
                  <TableHead className="text-[#677d9b]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lessons.map((lesson, index) => (
                  <TableRow
                    key={lesson._id}
                    className="transition-colors duration-200 hover:bg-gray-100/10"
                  >
                    <TableCell className="font-medium text-[#677d9b]">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-[#677d9b]">
                      <div>
                        <h4
                          className="font-medium max-w-[500px] truncate text-[#677d9b]"
                          title={lesson.title}
                        >
                          {lesson.title}
                        </h4>
                        <p
                          className="text-sm text-gray-300 mt-1 max-w-[550px] line-clamp-2"
                          title={lesson.description}
                        >
                          {lesson.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#677d9b]">
                      {lesson.videoId}
                    </TableCell>
                    <TableCell className="text-[#677d9b]">
                      {lesson.order}
                    </TableCell>
                    <TableCell className="text-[#677d9b]">
                      {lesson.duration}
                    </TableCell>
                    <TableCell className="text-[#677d9b]">
                      <div className="flex gap-2">
                        <Button
                          icon="fa-regular fa-trash-can !text-[14px]"
                          className="w-[32px] h-[32px] items-center cursor-pointer"
                          onClick={() => handleDeleteLesson(lesson._id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>

    
  );
};

export default LessonList;
