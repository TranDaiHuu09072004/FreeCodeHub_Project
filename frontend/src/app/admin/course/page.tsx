"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/User/Button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ReactPaginate from "react-paginate";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/app/utils/axiosInstance";
import { isAxiosError } from "axios";
import * as yup from "yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { Course } from "@/components/User/ItemProduct";
import CreateLesson from "@/components/Admin/CreateLesson/CreateLesson";
import LessonList from "@/components/Admin/CreateLesson/LessonList";
import Image from "next/image";
import { revalidateTag } from "next/cache";

type CoursesValue = {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  level: string;
  status: "Đã xuất bản" | "Nháp" | "Đã xóa";
  thumbnail: string;
  highlights?: { value: string }[];
  isFeatured: boolean;
  image_author: string;
  slogan: string;
};

const createCourses = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề khóa học"),
  author: yup.string().required("Vui lòng nhập tên khóa học"),
  image_author: yup.string().required("Vui lòng nhập hình ảnh khóa học"),
  category: yup.string().required("Vui lòng nhập danh mục khóa học"),
  status: yup
    .string()
    .oneOf(["Đã xuất bản", "Nháp", "Đã xóa"], "Trạng thái không hợp lệ")
    .required("Vui lòng chọn trạng thái"),
  isFeatured: yup.boolean(),
  description: yup.string().required("Vui lòng nhập nội dung mô tả"),
  level: yup.string().required("Vui lòng chọn cấp độ"),
  slogan: yup.string().required("Vui lòng nhập nội dung bài viết"),
  thumbnail: yup.string().required("nhập ảnh bìa bài viết"),

  // ✅ Thêm trường highlights (mảng chuỗi) - giờ là tùy chọn
  highlights: yup
    .array()
    .of(
      yup.object({
        value: yup.string().trim().required("Highlight không được để trống"),
      }),
    )
    .optional()
    .default([]),
});

const Course_Management = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [editingCourses, setEditingCourses] = useState<Course | null>(null);
  const [deletedCourses, setDeletedCourses] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCreateLessonOpen, setIsCreateLessonOpen] = useState(false);
  const [selectedCourseForLesson, setSelectedCourseForLesson] =
    useState<Course | null>(null);
  const [isLessonListOpen, setIsLessonListOpen] = useState(false);
  //phân trang
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentCourses = courses.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(courses.length / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<CoursesValue>({
    resolver: yupResolver(createCourses as yup.ObjectSchema<CoursesValue>),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "highlights",
  });
  const fetchCourses = () => {
    try {
      axiosInstance
        .get("/courses")
        .then((res) => setCourses(res.data.reverse()));
    } catch (error) {
      console.log("Fail to Fetch Data Blogs", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onSubmit: SubmitHandler<CoursesValue> = async (data) => {
    try {
      const payload = {
        ...data,
        highlights: (data.highlights ?? []).map((item) => item.value),
      };
      if (editingCourses) {
        await axiosInstance.put(`/courses/${editingCourses._id}`, payload);
        console.log("Payload gửi lên:", payload);
        toast.success("Cập nhật bài viết thành công");
        reset();
        setIsDialogOpen(false);
        setEditingCourses(null);
        revalidateTag("courses-list");
      } else {
        const res = await axiosInstance.post("/courses", payload);
        console.log("Payload gửi lên:", payload);
        toast.success("Tạo Khóa thành công");
        reset();
        setIsDialogOpen(false);
        setEditingCourses(null);

        // Hiển thị dialog tạo lesson sau khi tạo khóa học thành công
        setSelectedCourseForLesson(res.data);
        setIsCreateLessonOpen(true);
      }

      fetchCourses();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Lỗi Server");
      } else {
        toast.error("Lỗi Server");
      }
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "thumbnail" | "image_author",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;
      setValue(fieldName, imageUrl);
      toast.success("Tải ảnh thành công!");
    } catch (err) {
      toast.error("Tải ảnh thất bại");
      console.error("Upload error:", err);
    }
  };

  const openEditDialog = (c: Course) => {
    setEditingCourses(c);
    setValue("title", c.title);
    setValue("author", c.author);
    setValue("category", c.category);
    const statusMap: Record<string, CoursesValue["status"]> = {
      draft: "Nháp",
      published: "Đã xuất bản",
      deleted: "Đã xóa",
    };
    setValue("level", c.level);
    setValue("status", statusMap[c.status] || "Nháp");
    setValue("isFeatured", c.isFeatured);
    setValue(
      "highlights",
      (c.highlights ?? []).map((h) => ({ value: h })),
    );
    setValue("image_author", c.image_author);
    setValue("description", c.description);
    setValue("thumbnail", c.thumbnail);
    setValue("slogan", c.slogan ?? "");
    setIsDialogOpen(true);
  };

  const OpenCreateDialog = () => {
    setEditingCourses(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleDeletedCourses = async () => {
    if (!deletedCourses) return;
    try {
      await axiosInstance.delete(`courses/${deletedCourses._id}`);
      toast.success("Xóa Khóa thành công!!!");
      fetchCourses();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Xóa khóa học thất bại");
      } else {
        toast.error("Xóa khóa học thất bại");
      }
    } finally {
      setDeleteDialog(false);
      setDeletedCourses(null);
    }
  };
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="title_blog my-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý khóa học</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý các khóa học trên hệ thống
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px]">
        <div className="flex justify-between items-center">
          <div className="title_blog">
            <h3 className="text-2xl text-white font-bold">
              Danh sách khóa học
            </h3>
            <p className="text-[#677d9b] text-[15px] font-[450]">
              Quản lý các khóa học trong hệ thống
            </p>
          </div>
          <Button
            onClick={OpenCreateDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] !py-[8px] !px-[15px] rounded-[5px] cursor-pointer"
            icon="fa-solid fa-circle-plus"
          >
            Thêm khóa học
          </Button>
        </div>
        <div className="search_input bg-[#121826] rounded-[3px] p-3 flex items-center gap-[10px] my-[10px] h-[40px]">
          <i className="fa-solid fa-magnifying-glass text-[#677d9b] cursor-pointer"></i>{" "}
          <input
            type="text"
            className="outline-none text-[#677d9b] w-full h-auto rounded-[3px]"
            placeholder="Tìm kiếm khóa học..."
          />
        </div>
        <Table className="!text-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#677d9b]">ID</TableHead>
              <TableHead className="text-[#677d9b]">khóa học</TableHead>
              <TableHead className="text-[#677d9b]">Danh mục</TableHead>
              <TableHead className="text-[#677d9b]">Tác giả</TableHead>
              <TableHead className="text-[#677d9b]">Cấp độ</TableHead>
              <TableHead className="text-[#677d9b]">Trạng thái</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCourses.map((c, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {offset + index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="image relative h-[48px] w-[64px] rounded-[3px] bg-purple flex items-center justify-center text-white overflow-hidden">
                      <Image
                        src={
                          c.thumbnail
                            ? c.thumbnail.startsWith("http")
                              ? c.thumbnail
                              : `http://localhost:5000${c.thumbnail}`
                            : "https://placehold.co/100"
                        }
                        alt={c.thumbnail}
                        fill
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-white">
                      <h3 className="max-w-[400px] truncate">{c.title}</h3>
                      <span className="text-[#677d9b]">{c.slogan}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-white">{c.category}</span>
                </TableCell>
                <TableCell>
                  {" "}
                  <div className="flex items-center gap-3 text-white">
                    <i className="fa-solid fa-user text-[20px]"></i>
                    <span>{c.author}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-white">{c.level}</span>
                </TableCell>
                <TableCell className="text-white">
                  {c.status === "Đã xuất bản" ? (
                    <div className="flex items-center gap-[5px]">
                      <i className="fa-regular fa-circle-check text-green-500 text-[16px]"></i>
                      Đã xuất bản
                    </div>
                  ) : c.status === "Nháp" ? (
                    <div className="flex items-center gap-[5px]">
                      <i className="fa-regular fa-circle-check text-blue-500 text-[16px]"></i>
                      Nháp
                    </div>
                  ) : (
                    <div className="flex items-center gap-[5px]">
                      <i className="fa-regular fa-circle-check text-gray-500 text-[16px]"></i>
                      {c.status}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex gap-2">
                    <Button
                      icon="fa-solid fa-square-plus !text-[14px] "
                      className="w-[40px] h-[40px] items-center cursor-pointer"
                      onClick={() => {
                        setSelectedCourseForLesson(c);
                        setIsCreateLessonOpen(true);
                      }}
                    />
                    <Button
                      icon="fa-solid fa-list !text-[14px] "
                      className="w-[40px] h-[40px] items-center cursor-pointer "
                      onClick={() => {
                        setSelectedCourseForLesson(c);
                        setIsLessonListOpen(true);
                      }}
                    />
                    <Button
                      icon="fa-regular fa-pen-to-square !text-[14px] "
                      className="w-[40px] h-[40px] items-center cursor-pointer"
                      onClick={() => openEditDialog(c)}
                    />
                    <Button
                      icon="fa-regular fa-trash-can !text-[14px] "
                      className="w-[40px] h-[40px] items-center cursor-pointer"
                      onClick={() => {
                        setDeletedCourses(c);
                        setDeleteDialog(true);
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={
            "pagination flex gap-2 mt-6 justify-center text-white"
          }
          activeClassName={"font-bold text-white-400"}
          pageClassName={"px-3 py-1 rounded-md border border-[#333]"}
          previousClassName={"px-3 py-1 "}
          nextClassName={"px-3 py-1"}
        />
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditingCourses(null);
            reset();
          }
          setIsDialogOpen(open);
        }}
      >
        <DialogContent maxWidth="max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              {editingCourses ? "Cập nhật khóa học" : "Thêm khóa học mới"}
            </DialogTitle>
            <DialogDescription>
              {editingCourses
                ? "Cập nhật khóa học mới"
                : "Điền thông tin để tạo khóa học mới."}
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="field_title">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="title_course" className="text-left">
                      Tiêu đề khóa học
                    </Label>
                    <Input
                      type="text"
                      placeholder="Tên tiêu đề khóa học"
                      {...register("title")}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.title?.message}
                  </p>
                </div>

                <div className="field_authors">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="author">Tác giả</Label>
                    <input
                      type="text"
                      {...register("author")}
                      placeholder="Nhập tác giả"
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.author?.message}
                  </p>
                </div>
                <div className="field_thumbnail">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="image_thumnail" className="text-left">
                        Ảnh Tác giả
                      </Label>
                      {editingCourses?.image_author && (
                        <Image
                          src={
                            editingCourses.image_author.startsWith("http")
                              ? editingCourses.image_author
                              : `http://localhost:5000${editingCourses.image_author}`
                          }
                          width={80}
                          height={80}
                          alt="Ảnh đại diện"
                          className="h-[80px] w-[80px] object-cover rounded-full mb-2"
                        />
                      )}
                      <Input
                        id="image"
                        type="file"
                        onChange={(e) => handleImageUpload(e, "image_author")}
                        className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                      />
                      <Input type="hidden" {...register("image_author")} />
                    </div>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.thumbnail?.message}
                  </p>
                </div>

                <div className="field_category">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="category">Chuyên mục</Label>
                    <select
                      id="category"
                      {...register("category")}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="FrontEnd">FrontEnd</option>
                      <option value="BackEnd">BackEnd</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Devops">Devops</option>
                    </select>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.category?.message}
                  </p>
                </div>
                <div className="field_level">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="level" className="text-left">
                      Chọn cấp độ
                    </Label>
                    <select
                      {...register("level")}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Cơ bản">Cơ bản</option>
                      <option value="Trung Cấp">Trung Cấp</option>
                      <option value="Nâng cao">Nâng cao</option>
                    </select>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.level?.message}
                  </p>
                </div>
                <div className="field_slogan">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="slogan" className="text-left">
                      Slogan
                    </Label>
                    <input
                      type="text"
                      {...register("slogan")}
                      placeholder="Nhập câu slogan"
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.slogan?.message}
                  </p>
                </div>
                <div className="field_des">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="description" className="text-left">
                      Mô tả
                    </Label>
                    <textarea
                      placeholder="Mô tả chi tiết về khóa học"
                      rows={5}
                      {...register("description")}
                      className="col-span-3 border p-2 rounded-[10px] border-[#1e2631]"
                    ></textarea>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.description?.message}
                  </p>
                </div>
                <div className="field_thumbnail">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-4">
                      <Label htmlFor="image_thumnail" className="text-left">
                        Ảnh Thumbnail
                      </Label>
                      {editingCourses?.thumbnail && (
                        <Image
                          width={80}
                          height={80}
                          src={
                            editingCourses.thumbnail.startsWith("http")
                              ? editingCourses.thumbnail
                              : `http://localhost:5000${editingCourses.thumbnail}`
                          }
                          alt="Ảnh đại diện"
                          className="h-[80px] w-[80px] object-cover rounded-full mb-2"
                        />
                      )}
                      <Input
                        id="image"
                        type="file"
                        onChange={(e) => handleImageUpload(e, "thumbnail")}
                        className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                      />
                      <Input type="hidden" {...register("thumbnail")} />
                    </div>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.thumbnail?.message}
                  </p>
                </div>
                <div className="field_highlights">
                  <Label className="">Highlight</Label>
                  <div className="flex flex-col gap-2 mt-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2">
                        <Input
                          {...register(`highlights.${index}.value` as const)}
                          className="flex-1 border border-[#1e2631] focus:!outline-[#677d9b]  rounded-[3px] px-3 py-2"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          Xoá
                        </button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      className="border border-red-500 w-[150px] px-1 py-2 rounded-[5px]"
                      onClick={() => append({ value: "" })}
                    >
                      Thêm highlight
                    </Button>
                  </div>
                  <p className="text-red-500 text-center">
                    {errors.highlights?.message}
                  </p>
                </div>

                <div className="field_featured">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="featured">Nổi bật</Label>
                    <div className="flex items-center col-span-3">
                      <input
                        type="checkbox"
                        id="featured"
                        {...register("isFeatured")}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.isFeatured?.message}
                  </p>
                </div>
                <div className="field_status">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <select
                      id="status"
                      {...register("status")}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Đã xuất bản">Đã xuất bản</option>
                      <option value="Nháp">Nháp</option>
                    </select>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.status?.message}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
                >
                  {editingCourses ? "Cập nhật" : "Tạo khóa học"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. khóa học sẽ bị xóa vĩnh viễn
              khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground text-white"
              onClick={handleDeletedCourses}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Lesson Dialog */}
      {selectedCourseForLesson && (
        <CreateLesson
          isOpen={isCreateLessonOpen}
          onClose={() => {
            setIsCreateLessonOpen(false);
            setSelectedCourseForLesson(null);
          }}
          courseId={selectedCourseForLesson._id}
          courseTitle={selectedCourseForLesson.title}
        />
      )}

      {/* Lesson List Dialog */}
      {selectedCourseForLesson && (
        <LessonList
          isOpen={isLessonListOpen}
          onClose={() => {
            setIsLessonListOpen(false);
            setSelectedCourseForLesson(null);
          }}
          courseId={selectedCourseForLesson._id}
          courseTitle={selectedCourseForLesson.title}
        />
      )}
    </div>
  );
};

export default Course_Management;
