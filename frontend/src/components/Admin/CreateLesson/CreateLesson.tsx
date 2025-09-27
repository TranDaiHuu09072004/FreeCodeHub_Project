"use client";
import React from "react";
import Button from "@/components/User/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/app/utils/axiosInstance";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

type LessonValue = {
  courseId: string;
  title: string;
  description: string | null;
  videoId?: string; // optional
  videoUrl: string;
  order: number;
  duration: string;
};

const createLessonSchema = yup.object({
  courseId: yup.string().required("Course ID là bắt buộc"),
  title: yup.string().required("Vui lòng nhập tiêu đề bài học"),
  description: yup
    .string()
    .transform((val, orig) => (orig === "" ? null : val))
    .nullable()
    .optional()
    .default(null),
  // videoId: yup.string().required("Vui lòng nhập Video ID"), // đã bỏ validate này
  videoUrl: yup.string().required("Vui lòng nhập URL video"),
  order: yup.number().required("Vui lòng nhập thứ tự bài học"),
  duration: yup.string().required("Vui lòng nhập thời lượng bài học"),
});

interface CreateLessonProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
}

const CreateLesson: React.FC<CreateLessonProps> = ({
  isOpen,
  onClose,
  courseId,
  courseTitle,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LessonValue>({
    resolver: yupResolver(createLessonSchema),
    defaultValues: {
      courseId: courseId,
      order: 1,
    },
  });

  // Tự động lấy order tiếp theo khi component mount
  React.useEffect(() => {
    const fetchNextOrder = async () => {
      try {
        const response = await axiosInstance.get(
          `/lessons?courseId=${courseId}`
        );
        const lessons = response.data as Array<{ order: number }>;
        const maxOrder =
          lessons.length > 0 ? Math.max(...lessons.map((l) => l.order)) : 0;
        setValue("order", maxOrder + 1);
      } catch (error) {
        console.error("Error fetching lessons for order:", error);
      }
    };

    if (isOpen && courseId) {
      fetchNextOrder();
    }
  }, [isOpen, courseId, setValue]);

  const onSubmit: SubmitHandler<LessonValue> = async (data) => {
    try {
      await axiosInstance.post("/lessons", data);
      toast.success("Tạo bài học thành công!");
      reset();
      onClose();
    } catch (error: unknown) {
      console.error("Error creating lesson:", error);
      let message = "Lỗi khi tạo bài học";
      if (
        typeof error === "object" &&
        error !== null &&
        (error as { response?: { data?: { error?: string } } }).response?.data
          ?.error
      ) {
        message = (error as { response?: { data?: { error?: string } } })
          .response!.data!.error as string;
      }
      toast.error(message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tạo bài học mới</DialogTitle>
          <DialogDescription>
            Tạo bài học cho khóa học: {courseTitle}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="field_title">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Tiêu đề bài học</Label>
                <Input
                  type="text"
                  placeholder="Nhập tiêu đề bài học"
                  {...register("title")}
                  className="h-[40px] w-full border border-[#1e2631] focus:!outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.title?.message}
              </p>
            </div>

            <div className="field_description">
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Mô tả bài học</Label>
                <textarea
                  placeholder="Nhập mô tả chi tiết bài học"
                  rows={3}
                  {...register("description")}
                  className="w-full border border-[#1e2631] focus:!outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <div className="field_videoId">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="videoId">Video ID</Label>
                  <Input
                    type="text"
                    placeholder="Nhập Video ID"
                    {...register("videoId")}
                    className="h-[40px] w-full border border-[#1e2631] focus:!outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                  />
                </div>
                <p className="text-red-500 text-sm mt-1">
                  {errors.videoId?.message}
                </p>
              </div>

              <div className="field_order">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="order">Thứ tự bài học</Label>
                  <Input
                    type="number"
                    placeholder="Nhập thứ tự"
                    {...register("order", { valueAsNumber: true })}
                    className="h-[40px] w-full border border-[#1e2631] focus:!outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                  />
                </div>
                <p className="text-red-500 text-sm mt-1">
                  {errors.order?.message}
                </p>
              </div>
            </div> */}

            <div className="field_videoUrl">
              <div className="flex flex-col gap-2">
                <Label htmlFor="videoUrl">URL Video</Label>
                <Input
                  type="url"
                  placeholder="Nhập URL video bài học"
                  {...register("videoUrl")}
                  className="h-[40px] w-full border border-[#1e2631] focus:!outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.videoUrl?.message}
              </p>
            </div>

            <div className="field_duration">
              <div className="flex flex-col gap-2">
                <Label htmlFor="duration">Thời lượng</Label>
                <Input
                  type="text"
                  placeholder="VD: 15:30"
                  {...register("duration")}
                  className="h-[40px] w-full border border-[#1e2631] focus:!outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                />
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.duration?.message}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            >
              Tạo bài học
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLesson;
