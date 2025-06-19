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
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
export interface UserAdmin {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  status: string;
  createdAt: string;
}

type UserFormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  status: "true" | "false";
  createdAt: string; // use string for date input
};

const createUser = yup.object({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập Email"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải ít nhất 6 kí tự")
    .required("Mật khẩu không được để trống"),
  role: yup.string().required("Vui lòng chọn quyền"),
  avatar: yup.string().required("Vui lòng chọn ảnh người dùng"),
  status: yup
    .string()
    .oneOf(["true", "false"], "Trạng thái không hợp lệ")
    .required("Vui lòng chọn trạng thái"),
  createdAt: yup.string().required("Vui lòng chọn ngày tạo"),
});

const User_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [users, setUser] = useState<UserAdmin[]>([]);
  const openDialog = () => setIsDialogOpen(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: yupResolver(createUser),
    defaultValues: {
      status: "true",
    },
  });

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUser(res.data);
    } catch (error) {
      console.log("Lỗi khi lấy người dùng", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  const onSubmit: SubmitHandler<UserFormValues> = async (data) => {
    try {
      await axiosInstance.post("/users", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        avatar: data.avatar,
        status: data.status === "true", // convert string -> boolean
        createdAt: data.createdAt,
      });

      console.log("Submitting data:", data);
      toast.success("Tạo người dùng thành công");
      setIsDialogOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  };

  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="title_blog mb-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý người dùng</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý tài khoản người dùng trên hệ thống
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px]">
        <div className="flex justify-between items-center">
          <div className="title_blog">
            <h3 className="text-2xl text-white font-bold">
              Danh sách người dùng
            </h3>
            <p className="text-[#677d9b] text-[15px] font-[450]">
              Quản lý tất cả người dùng trong hệ thống
            </p>
          </div>
          <Button
            onClick={openDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            children="Thêm người dùng"
            icon="fa-solid fa-user-plus"
          />
        </div>
        <div className="search_input bg-[#121826] rounded-[3px] p-3 flex items-center gap-[10px] my-[10px] h-[40px]">
          <i className="fa-solid fa-magnifying-glass text-[#677d9b] cursor-pointer"></i>{" "}
          <input
            type="text"
            className="outline-none text-[#677d9b] w-full h-auto rounded-[3px]"
            placeholder="Tìm kiếm người dùng..."
          />
        </div>
        <Table className="!text-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#677d9b]">ID</TableHead>
              <TableHead className="text-[#677d9b]">Tên người dùng</TableHead>
              <TableHead className="text-[#677d9b]">Email</TableHead>
              <TableHead className="text-[#677d9b]">Vai trò </TableHead>
              <TableHead className="text-[#677d9b]">Trạng thái</TableHead>
              <TableHead className="text-[#677d9b]">Ngày tham gia</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="image h-8 w-8 rounded-full bg-purple flex items-center justify-center text-white overflow-hidden">
                      <img
                        src={
                          u.avatar
                            ? u.avatar.startsWith("http")
                              ? u.avatar
                              : `http://localhost:5000${u.avatar}`
                            : "https://placehold.co/100"
                        }
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-white">{u.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">{u.email}</TableCell>
                <TableCell className="text-white">
                  {" "}
                  {u.role === "admin" ? (
                    <>
                      <div className="flex items-center gap-3">
                        <i className="fa-solid fa-user-tie text-[20px]"></i>
                        <span>{u.role}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <i className="fa-solid fa-user text-[20px]"></i>
                        <span>{u.role}</span>
                      </div>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {u.status ? (
                    <span className="py-1 px-2 rounded-full bg-green-700 text-white">
                      {" "}
                      Hoạt động
                    </span>
                  ) : (
                    <span className="py-1 px-2 rounded-full bg-red-500 text-white">
                      {" "}
                      Không hoạt động
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-white">
                  {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="text-white">
                  <Button
                    icon="fa-regular fa-pen-to-square !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                  />
                  <Button
                    icon="fa-regular fa-trash-can !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => setDeleteDialog(true)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent maxWidth="max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
            <DialogDescription>
              Điền thông tin để tạo người dùng mới.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="field_name">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Tên
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

                <div className="field_email">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <input
                      type="email"
                      {...register("email")}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.email?.message}
                  </p>
                </div>

                <div className="field_password">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Mật khẩu
                    </Label>
                    <input
                      type="password"
                      {...register("password")}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.password?.message}
                  </p>
                </div>

                <div className="field_role">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Vai trò
                    </Label>
                    <select
                      {...register("role")}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="admin">Admin</option>
                      <option value="author">Tác giả</option>
                      <option value="client">Người dùng</option>
                    </select>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.role?.message}
                  </p>
                </div>

                <div className="field_status">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Trạng thái
                    </Label>
                    <select
                      {...register("status")}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="true">Hoạt động</option>
                      <option value="false">Không hoạt động</option>
                    </select>
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.status?.message}
                  </p>
                </div>

                <div className="field_createdAt">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Ngày tham gia
                    </Label>
                    <input
                      type="date"
                      {...register("createdAt")}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.createdAt?.message}
                  </p>
                </div>

                <div className="field_avatar">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Hình ảnh
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      onChange={handleImageUpload}
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                    <Input type="hidden" {...register("avatar")} />
                  </div>
                  <p className="text-red-500 w-full text-center">
                    {errors.avatar?.message}
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
                  children="Tạo người dùng"
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
              Hành động này không thể hoàn tác. Người dùng sẽ bị xóa vĩnh viễn
              khỏi hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default User_Management;
