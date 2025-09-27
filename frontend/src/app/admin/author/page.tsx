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
import { Input } from "@/components/ui/input";
import axiosInstance from "@/app/utils/axiosInstance";
import { isAxiosError } from "axios";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";
import Image from "next/image";
export interface AuthorAdmin {
  _id: string;
  name: string;
  channel: string;
  description: string;
  avatar: string;
  courseCount: number;
  numSubscribers: number;
  createdAt: Date;
  linkYtb: string;
}

type AuthorFormValue = {
  name: string;
  channel: string;
  description: string;
  avatar: string;
  courseCount: number;
  numSubscribers: number;
  createdAt: Date;
  linkYtb: string;
};

const createAuthor = yup.object({
  name: yup.string().required("Vui lòng nhập tên tác giả"),
  channel: yup.string().required("Vui lòng nhập kênh tác giả"),
  description: yup.string().required("Vui lòng mô tả"),
  avatar: yup.string().required("Vui lòng nhập hình ảnh tác giả"),
  linkYtb: yup.string().required("Vui lòng nhập đường link của tác giả"),
});

const Author_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [authors, setAuthors] = useState<AuthorAdmin[]>([]);
  const [isEditingAuthor, setIsEditingAuthors] = useState<AuthorAdmin | null>(
    null
  );
  const [deleteAuthor, setDeleteAuthors] = useState<AuthorAdmin | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  //phân trang
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentAuthors = authors.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(authors.length / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AuthorFormValue>({
    resolver: yupResolver(createAuthor as yup.ObjectSchema<AuthorFormValue>),
  });

  const fetchAuthors = async () => {
    try {
      const res = await axiosInstance.get("/authors");
      setAuthors(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy người dùng", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const onSubmit: SubmitHandler<AuthorFormValue> = async (data) => {
    try {
      const payload = {
        ...data,
      };
      if (isEditingAuthor) {
        await axiosInstance.put(`/authors/${isEditingAuthor._id}`, payload);
        toast.success("Cập nhật tác giả thành công");
      } else {
        await axiosInstance.post("/authors", payload);
        toast.success("Tạo tác giả thành công");
      }

      reset();
      setIsDialogOpen(false);
      setIsEditingAuthors(null);
      fetchAuthors();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Server lỗi");
      } else {
        toast.error("Server lỗi");
      }
    }
  };

  const openEditDialog = (author: AuthorAdmin) => {
    setIsEditingAuthors(author);
    setValue("name", author.name);
    setValue("channel", author.channel);
    setValue("avatar", author.avatar);
    setValue("description", author.description);
    setValue("linkYtb", author.linkYtb);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setIsEditingAuthors(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Hiển thị ảnh trước khi upload thành công
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.url;
      setValue("avatar", imageUrl);
      toast.success("Tải ảnh thành công!");
    } catch (err) {
      toast.error("Tải ảnh thất bại");
      console.error("Upload error:", err);
    }
  };

  const handleDeletedAuthors = () => {
    try {
      if (!deleteAuthor) return;
      axiosInstance.delete(`/authors/${deleteAuthor._id}`);
      toast.success("Xóa tác giả thành công");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Lỗi Server");
      } else {
        toast.error("Lỗi Server");
      }
    }
  };
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="title_blog mb-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý tác giả</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý các tác giả trên hệ thống
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px]">
        <div className="flex justify-between items-center">
          <div className="title_blog">
            <h3 className="text-2xl text-white font-bold">Danh sách tác giả</h3>
            <p className="text-[#677d9b] text-[15px] font-[450]">
              Quản lý các tác giả trong hệ thống
            </p>
          </div>
          <Button
            onClick={openCreateDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            icon="fa-solid fa-circle-plus"
          >
            Thêm tác giả
          </Button>
        </div>
        <div className="search_input bg-[#121826] rounded-[3px] p-3 flex items-center gap-[10px] my-[10px] h-[40px]">
          <i className="fa-solid fa-magnifying-glass text-[#677d9b] cursor-pointer"></i>{" "}
          <input
            type="text"
            className="outline-none text-[#677d9b] w-full h-auto rounded-[3px]"
            placeholder="Tìm kiếm tác giả..."
          />
        </div>
        <Table className="!text-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#677d9b]">ID</TableHead>
              <TableHead className="text-[#677d9b]">Tác giả</TableHead>
              <TableHead className="text-[#677d9b]">Kênh</TableHead>
              <TableHead className="text-[#677d9b]">
                Số lượng khóa học{" "}
              </TableHead>
              <TableHead className="text-[#677d9b]">Ngày thêm</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAuthors.map((au, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="image relative h-8 w-8 rounded-full bg-purple flex items-center justify-center text-white overflow-hidden">
                      <Image
                        src={au.avatar || "https://placehold.co/100"}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-white">{au.name}</h3>
                      <span className="text-[#677d9b]">{au.description}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center gap-3">
                    {" "}
                    <span> {au.channel} </span>
                    <a href={au.linkYtb}>
                      <i className="fa-solid fa-up-right-from-square"></i>
                    </a>
                  </div>
                </TableCell>
                <TableCell className="text-white">{au.courseCount}</TableCell>

                <TableCell className="text-white">
                  {" "}
                  {new Date(au.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-white">
                  <Button
                    icon="fa-regular fa-pen-to-square !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => openEditDialog(au)}
                  />
                  <Button
                    icon="fa-regular fa-trash-can !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => {
                      setDeleteAuthors(au);
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
          previousClassName={"px-3 py-1"}
          nextClassName={"px-3 py-1"}
        />
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditingAuthors(null);
            reset();
          }
          setIsDialogOpen(open);
        }}
      >
        <DialogContent maxWidth="max-w-[725px]">
          <DialogHeader>
            <DialogTitle>
              {isEditingAuthor ? "Cập nhật tác giả" : "Thêm tác giả mới"}
            </DialogTitle>
            <DialogDescription>
              {isEditingAuthor
                ? "Cập nhật tác giả"
                : "Điền thông tin để tạo tác giả mới."}
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" className="flex" onSubmit={handleSubmit(onSubmit)}>
              <div className="image_author flex flex-col items-center w-[30%]">
                <label htmlFor="image_author" className="mb-3 font-bold">
                  Ảnh đại diện
                </label>
                <div className="relative w-[128px] h-[128px] mb-3">
                  {" "}
                  <Image
                    src={
                      previewImage
                        ? previewImage
                        : isEditingAuthor?.avatar?.startsWith("http")
                        ? isEditingAuthor.avatar
                        : "https://avatars.githubusercontent.com/u/124599?v=4"
                    }
                    alt="Ảnh đại diện"
                    fill
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageUpload}
                  placeholder="Chọn hình ảnh đại diện"
                  className="h-[40px] w-full !text-[#677d9b] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                />
                <Input type="hidden" {...register("avatar")} />
              </div>
              <div className="grid gap-4 py-4 w-[70%]">
                <div className="field_name">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tên tác giả
                    </Label>
                    <Input
                      type="text"
                      placeholder="Tên đầy đủ của tác giả"
                      {...register("name")}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="field_channel">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="chanel" className="text-right">
                      Kênh
                    </Label>
                    <Input
                      type="text"
                      {...register("channel")}
                      placeholder="Tên kênh Youtube"
                      className="h-[40px] w-full border font-medium border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.channel?.message}
                  </p>
                </div>
                <div className="field_linkytb">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url_youtube" className="text-right">
                      URL Youtube
                    </Label>
                    <Input
                      type="text"
                      placeholder="Url Youtube"
                      {...register("linkYtb")}
                      className="h-[40px] w-full border font-medium border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.linkYtb?.message}
                  </p>
                </div>
                <div className="field_description">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="introduce" className="text-right">
                      Giới thiệu
                    </Label>
                    <textarea
                      placeholder="Tên giới thiệu"
                      id="introduce"
                      {...register("description")}
                      rows={5}
                      className="col-span-3 border p-2 rounded-[10px] border-[#1e2631]"
                    ></textarea>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.description?.message}
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
                  >
                    {isEditingAuthor ? "Cập nhật" : "Tạo tác giả"}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc muốn xóa?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. tác giả sẽ bị xóa vĩnh viễn khỏi
              hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletedAuthors}
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

export default Author_Management;
