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
import axiosInstance from "@/app/utils/axiosInstance";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  courseCount: number;
  createdAt: string;
}

type CategoryFormValue = {
  name: string;
  slug: string;
  courseCount: number;
  description: string;
};

const createCategory = yup.object({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
  description: yup.string().required("Vui lòng nhập mô tả danh mục"),
});

const Category_Management = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [isEditingCate, setIsEditingCate] = useState<Category | null>(null);
  const [deleteCate, setDeleteCate] = useState<Category | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValue>({
    resolver: yupResolver(
      createCategory as yup.ObjectSchema<CategoryFormValue>
    ),
  });

  const fetchCate = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu danh mục", error);
    }
  };

  useEffect(() => {
    fetchCate();
  }, []);

  const onSubmit: SubmitHandler<CategoryFormValue> = async (data) => {
    try {
      const payload = {
        ...data,
      };
      if (isEditingCate) {
        await axiosInstance.put(`/categories/${isEditingCate._id}`, payload);
        toast.success("Cập nhật danh mục thành công");
      } else {
        await axiosInstance.post("/categories", payload);
        toast.success("Tạo danh mục thành công");
      }

      reset();
      setIsDialogOpen(false);
      setIsEditingCate(null);
      fetchCate();
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  };

  const openCreateDialog = () => {
    setIsEditingCate(null);
    reset();
    setIsDialogOpen(true);
  };

  const openEditDialog = (cate: Category) => {
    setIsEditingCate(cate);
    setValue("name", cate.name);
    setValue("slug", cate.slug);
    setValue("description", cate.description);
    setIsDialogOpen(true);
  };

  const handleDeletedCate = async () => {
    if (!deleteCate) return;
    try {
      await axiosInstance.delete(`categories/${deleteCate._id}`);
      toast.success("Xóa Danh mục thành công!!!");
      fetchCate();
    } catch (error) {
      toast.error("Xóa danh mục thất bại");
    } finally {
      setDeleteDialog(false);
      setDeleteCate(null);
    }
  };
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="title_blog mb-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý danh mục</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý tài khoản danh mục trên hệ thống
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px]">
        <div className="flex justify-between items-center">
          <div className="title_blog">
            <h3 className="text-2xl text-white font-bold">
              Danh sách danh mục
            </h3>
            <p className="text-[#677d9b] text-[15px] font-[450]">
              Quản lý tất cả danh mục trong hệ thống
            </p>
          </div>
          <Button
            onClick={openCreateDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            children="Thêm danh mục"
            icon="fa-solid fa-circle-plus"
          />
        </div>
        <div className="search_input bg-[#121826] rounded-[3px] p-3 flex items-center gap-[10px] my-[10px] h-[40px]">
          <i className="fa-solid fa-magnifying-glass text-[#677d9b] cursor-pointer"></i>{" "}
          <input
            type="text"
            className="outline-none text-[#677d9b] w-full h-auto rounded-[3px]"
            placeholder="Tìm kiếm danh mục..."
          />
        </div>
        <Table className="!text-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#677d9b]">ID</TableHead>
              <TableHead className="text-[#677d9b]">Tên danh mục</TableHead>
              <TableHead className="text-[#677d9b]">Slug</TableHead>
              <TableHead className="text-[#677d9b]">Mô tả </TableHead>
              <TableHead className="text-[#677d9b]">Số khóa học</TableHead>
              <TableHead className="text-[#677d9b]">Ngày tạo</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cate, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {index + 1}
                </TableCell>
                <TableCell className="text-white">
                  <span>{cate.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-white">{cate.slug}</span>
                </TableCell>
                <TableCell className="text-white">
                  {" "}
                  <span> {cate.description}</span>
                </TableCell>
                <TableCell className="text-white">
                  <span>{cate.courseCount}</span>
                </TableCell>
                <TableCell className="text-white">
                  {" "}
                  {new Date(cate.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-white">
                  <Button
                    icon="fa-regular fa-pen-to-square !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => openEditDialog(cate)}
                  />
                  <Button
                    icon="fa-regular fa-trash-can !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => {
                      setDeleteCate(cate);
                      setDeleteDialog(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditingCate(null);
            reset();
          }
          setIsDialogOpen(open);
        }}
      >
        <DialogContent maxWidth="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditingCate ? "Cập nhật danh mục" : "Thêm danh mục mới"}
            </DialogTitle>
            <DialogDescription>
              {isEditingCate
                ? "Cập nhật danh mục tại đây"
                : "Điền thông tin để tạo danh mục mới."}
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="field_name">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name_category" className="text-right">
                      Tên danh mục
                    </Label>
                    <input
                      type="text"
                      {...register("name")}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="field_description">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="summary" className="text-right">
                      Nội dung
                    </Label>
                    <textarea
                      {...register("description")}
                      rows={5}
                      className="col-span-3 rounded-[10px] border border-[#1e2631] pl-[10px]"
                    ></textarea>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.description?.message}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
                  children={isEditingCate ? "Cập nhật" : "Tạo danh mục"}
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
              Hành động này không thể hoàn tác. danh mục sẽ bị xóa vĩnh viễn
              khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground text-white"
              onClick={handleDeletedCate}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Category_Management;
