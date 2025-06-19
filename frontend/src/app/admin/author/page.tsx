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
import Link from "next/link";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/app/utils/axiosInstance";
export interface AuthorAdmin {
  name: string;
  channel: string;
  description: string;
  avatar: string;
  numCourses: number;
  numSubscribers: number;
  createdAt: Date;
  linkYtb: string;
}

const Author_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [authors, setAuthors] = useState<AuthorAdmin[]>([]);
  const openDialog = () => setIsDialogOpen(true);
  useEffect(() => {
    try {
      axiosInstance.get("/authors").then((res) => setAuthors(res.data));
    } catch (error) {
      console.log("Lỗi khi lấy người dùng", error);
    }
  }, []);
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
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
            onClick={openDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
            children="Thêm tác giả"
            icon="fa-solid fa-circle-plus"
          />
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
            {authors.map((au, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="image h-8 w-8 rounded-full bg-purple flex items-center justify-center text-white overflow-hidden">
                      <img
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
                <TableCell className="text-white">{au.numCourses}</TableCell>

                <TableCell className="text-white">
                  {" "}
                  {new Date(au.createdAt).toLocaleDateString("vi-VN")}
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
        <DialogContent maxWidth="max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Thêm tác giả mới</DialogTitle>
            <DialogDescription>
              Điền thông tin để tạo tác giả mới.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" className="flex">
              <div className="image_author flex flex-col items-center w-[30%]">
                <label htmlFor="image_author" className="mb-3 font-bold">
                  Ảnh đại diện
                </label>
                <div className="w-[128px] h-[128px] mb-3">
                  {" "}
                  <img
                    src="https://avatars.githubusercontent.com/u/124599?v=4"
                    alt=""
                    className="w-full h-full object-cover rounded-full "
                  />
                </div>
                <Input
                  id="image"
                  type="file"
                  placeholder="Chọn hình ảnh đại diện"
                  className="h-[40px] w-full !text-[#677d9b] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                />
              </div>
              <div className="grid gap-4 py-4 w-[70%]">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tên tác giả
                  </Label>
                  <Input
                    type="text"
                    placeholder="Tên đầy đủ của tác giả"
                    required
                    className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="chanel" className="text-right">
                    Kênh
                  </Label>
                  <Input
                    type="text"
                    required
                    placeholder="Tên kênh Youtube"
                    className="h-[40px] w-full border font-medium border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url_youtube" className="text-right">
                    URL Youtube
                  </Label>
                  <Input
                    type="text"
                    required
                    placeholder="Url Youtube"
                    className="h-[40px] w-full border font-medium border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="introduce" className="text-right">
                    Giới thiệu
                  </Label>
                  <textarea
                    name="introduce"
                    placeholder="Tên giới thiệu"
                    id="introduce"
                    rows={5}
                    className="col-span-3 border p-2 rounded-[10px] border-[#1e2631]"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
              children="Tạo tác giả"
            />
          </DialogFooter>
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
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Author_Management;
