"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/User/Button";
import ReactPaginate from "react-paginate";
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
import { Input } from "@/components/ui/input";
import axiosInstance from "@/app/utils/axiosInstance";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import { Blog } from "@/app/(client)/blog/page";
import Editor from "@/components/Admin/Editor/Editor";

type BlogFormValue = {
  title: string;
  author: string;
  imageAuthor: string;
  category: string;
  status: "Đã đăng" | "Nháp" | "Đã xóa";
  isFeatured: boolean;
  date: string;
  excerpt: string;
  content: string;
  thumbnail: string;
};

const createBlog = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề bài viết"),
  author: yup.string().required("Vui lòng nhập tên người đăng"),
  imageAuthor: yup.string().required("Vui lòng nhập hình ảnh người đăng"),
  category: yup.string().required("Vui lòng nhập danh mục bài viết"),
  status: yup
    .string()
    .oneOf(["Đã đăng", "Nháp", "Đã xóa"], "Trạng thái không hợp lệ")
    .required("Vui lòng chọn trạng thái"),
  isFeatured: yup.boolean(),
  date: yup.string().required("Vui lòng chọn ngày đăng"),
  excerpt: yup.string().required("Vui lòng nhập mô tả"),
  content: yup.string().required("Vui lòng nhập nội dung bài viết"),
  thumbnail: yup.string().required("nhập ảnh bìa bài viết"),
});
const Blog_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deleteBlog, setDeleteBlog] = useState<Blog | null>(null);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  //phân trang
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentBlogs = blogs.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BlogFormValue>({
    resolver: yupResolver(createBlog as yup.ObjectSchema<BlogFormValue>),
  });

  const fetchBlogs = () => {
    try {
      axiosInstance.get("/blogs").then((res) => setBlogs(res.data.reverse()));
    } catch (error) {
      console.log("Fail to Fetch Data Blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onSubmit: SubmitHandler<BlogFormValue> = async (data) => {
    try {
      const payload = {
        ...data,
      };
      if (editingBlog) {
        await axiosInstance.put(`/blogs/${editingBlog._id}`, payload);
        console.log("Payload gửi lên:", payload);
        toast.success("Cập nhật bài viết thành công");
      } else {
        await axiosInstance.post("/blogs", payload);
        console.log("Payload gửi lên:", payload);
        toast.success("Tạo bài viết thành công");
      }
      reset();
      setIsDialogOpen(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      toast.error("Lỗi Server");
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "thumbnail" | "imageAuthor"
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

  const openCreateDialog = () => {
    setEditingBlog(null);
    reset();
    setIsDialogOpen(true);
  };

  const openEditDialog = (b: Blog) => {
    setEditingBlog(b);
    setValue("title", b.title);
    setValue("author", b.author);
    setValue("category", b.category);
    const statusMap: Record<string, BlogFormValue["status"]> = {
      draft: "Nháp",
      published: "Đã đăng",
      deleted: "Đã xóa",
    };
    setValue("content", b.content);
    setValue("status", statusMap[b.status] || "Nháp");
    setValue("isFeatured", b.isFeatured);
    setValue("date", b.date);
    setValue("imageAuthor", b.imageAuthor);
    setValue("excerpt", b.excerpt);
    setValue("thumbnail", b.thumbnail);
    setIsDialogOpen(true);
  };

  const handleDeletedBlog = async () => {
    if (!deleteBlog) return;
    try {
      await axiosInstance.delete(`blogs/${deleteBlog._id}`);
      toast.success("Xóa Danh mục thành công!!!");
      fetchBlogs();
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    } finally {
      setDeleteDialog(false);
      setDeleteBlog(null);
    }
  };
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="title_blog mb-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý blog</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý các bài viết blog
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px] overflow-x-auto">
        <div className="flex justify-between items-center">
          <div className="title_blog">
            <h3 className="text-2xl text-white font-bold">
              Danh sách bài viết
            </h3>
            <p className="text-[#677d9b] text-[15px] font-[450]">
              Quản lý tất cả bài viết blog
            </p>
          </div>
          <Button
            onClick={openCreateDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            children="Thêm bài viết"
            icon="fa-solid fa-circle-plus"
          />
        </div>
        <div className="search_input bg-[#121826] rounded-[3px] p-3 flex items-center gap-[10px] my-[10px] h-[40px]">
          <i className="fa-solid fa-magnifying-glass text-[#677d9b] cursor-pointer"></i>{" "}
          <input
            type="text"
            className="outline-none text-[#677d9b] w-full h-auto rounded-[3px]"
            placeholder="Tìm kiếm bài viết..."
          />
        </div>
        <Table className="!text-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#677d9b]">ID</TableHead>
              <TableHead className="text-[#677d9b]">Tiêu đề</TableHead>
              <TableHead className="text-[#677d9b]">Tác giả</TableHead>
              <TableHead className="text-[#677d9b]">Chuyên mục </TableHead>
              <TableHead className="text-[#677d9b]">Trạng thái</TableHead>
              <TableHead className="text-[#677d9b]">Ngày đăng</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBlogs.map((b, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {offset + index + 1}
                </TableCell>
                <TableCell>
                  <h5 className="text-white">{b.title}</h5>
                  <p className="text-[#677d9b] line-clamp-2 max-w-[500px] text-[14px]">
                    {" "}
                    {b.excerpt}{" "}
                  </p>
                </TableCell>
                <TableCell className="text-white"> {b.author}</TableCell>
                <TableCell className="text-white"> {b.category}</TableCell>
                <TableCell className="text-white">
                  {b.status === "Đã đăng" ? (
                    <div className="flex items-center gap-[5px]">
                      <i className="fa-regular fa-circle-check text-green-500 text-[16px]"></i>
                      Đã đăng
                    </div>
                  ) : b.status === "Nháp" ? (
                    <div className="flex items-center gap-[5px]">
                      <i className="fa-regular fa-circle-check text-blue-500 text-[16px]"></i>
                      Nháp
                    </div>
                  ) : (
                    <div className="flex items-center gap-[5px]">
                      <i className="fa-regular fa-circle-check text-gray-500 text-[16px]"></i>
                      {b.status}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-white">{b.date}</TableCell>
                <TableCell className="text-white">
                  <Button
                    icon="fa-regular fa-pen-to-square !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => openEditDialog(b)}
                  />
                  <Button
                    icon="fa-regular fa-trash-can !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => {
                      setDeleteBlog(b);
                      setDeleteDialog(true);
                    }}
                  />
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
            setEditingBlog(null);
            reset();
          }
          setIsDialogOpen(open);
        }}
      >
        <DialogContent maxWidth="max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              {editingBlog ? "Cập nhật bài viết" : "Thêm bài viết mới"}
            </DialogTitle>
            <DialogDescription>
              {editingBlog
                ? "Cập nhật thông tin bài viết"
                : " Điền thông tin để tạo bài viết mới."}
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="field_title">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <input
                      type="text"
                      {...register("title")}
                      placeholder="Nhập tiêu đề"
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.title?.message}
                  </p>
                </div>
                <div className="field_thumbnail">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Ảnh bìa bài viết</Label>
                    <div className="col-span-3">
                      {editingBlog?.thumbnail && (
                        <img
                          src={
                            editingBlog.thumbnail.startsWith("http")
                              ? editingBlog.thumbnail
                              : `http://localhost:5000${editingBlog.thumbnail}`
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
                </div>
                <div className="field_excerpt">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="summary">Mô tả</Label>
                    <textarea
                      id="summary"
                      {...register("excerpt")}
                      placeholder="Nhập mô tả"
                      rows={5}
                      className="col-span-3 p-3 rounded-[10px] border border-[#1e2631]"
                    ></textarea>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.excerpt?.message}
                  </p>
                </div>
                <div className="field_content mb-10">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="content">Nội dung</Label>
                    <Editor
                      value={watch("content") || ""}
                      onChange={(val) => setValue("content", val)}
                    />
                  </div>
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
                <div className="field_avatar">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="image">Hình ảnh</Label>
                    <div className="col-span-3">
                      {editingBlog?.imageAuthor && (
                        <img
                          src={
                            editingBlog.imageAuthor.startsWith("http")
                              ? editingBlog.imageAuthor
                              : `http://localhost:5000${editingBlog.imageAuthor}`
                          }
                          alt="Ảnh đại diện"
                          className="h-[80px] w-[80px] object-cover rounded-full mb-2"
                        />
                      )}
                      <Input
                        id="image"
                        type="file"
                        onChange={(e) => handleImageUpload(e, "imageAuthor")}
                        className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px]"
                      />
                      <Input type="hidden" {...register("imageAuthor")} />
                    </div>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.imageAuthor?.message}
                  </p>
                </div>
                <div className="field_category">
                  <div className="flex flex-col gap-2">
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
                <div className="field_date">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Ngày đăng</Label>
                    <input
                      type="date"
                      {...register("date")}
                      placeholder="Nhập ngày đăng"
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.date?.message}
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
                      <option value="Đã đăng">Đã đăng</option>
                      <option value="Nháp">Nháp</option>
                    </select>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.status?.message}
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
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
                  children={editingBlog ? "Cập nhật" : "Tạo bài viết"}
                />
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
              Hành động này không thể hoàn tác. Bài viết sẽ bị xóa vĩnh viễn
              khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletedBlog}
              className="bg-destructive text-destructive-foreground text-white"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Blog_Management;
