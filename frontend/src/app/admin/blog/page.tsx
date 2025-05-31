"use client";
import React, { useState } from "react";
import Button from "@/app/components/User/Button";

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

const Blog_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <div className="title_blog mb-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý blog</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý các bài viết blog
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px]">
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
            onClick={openDialog}
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
            <TableRow>
              <TableCell className="font-medium text-white">1</TableCell>
              <TableCell>
                <h5 className="text-white">
                  Giới thiệu React Hooks Tìm hiểu về React Hooks và cách chúng
                </h5>
                <p className="text-[#677d9b]"> thay đổi cách viết com...</p>
              </TableCell>
              <TableCell className="text-white">Nguyễn Văn A</TableCell>
              <TableCell className="text-white">ReactJS</TableCell>
              <TableCell className="text-white">
                <div className="flex items-center gap-[5px]">
                  {" "}
                  <i className="fa-regular fa-circle-check text-green-500 text-[16px]"></i>
                  Đã đăng
                </div>
              </TableCell>
              <TableCell className="text-white">2025-04-10</TableCell>
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
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent maxWidth="max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Thêm bài viết mới</DialogTitle>
            <DialogDescription>
              Điền thông tin để tạo bài viết mới.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="!text-right">
                    Tiêu đề
                  </Label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tiêu đề"
                    className="h-[40px] w-[489.95px] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="summary" className="text-right">
                    Tóm tắt
                  </Label>
                  <textarea
                    name="summary"
                    id="summary"
                    placeholder="Nhập tóm tắt"
                    rows={5}
                    className="col-span-3 p-3 rounded-[10px] border border-[#1e2631]"
                  ></textarea>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Nội dung
                  </Label>
                  <textarea
                    name="content"
                    id="content"
                    placeholder="Nhập nội dung"
                    rows={5}
                    className="col-span-3 p-3 rounded-[10px] border border-[#1e2631]"
                  ></textarea>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-right">
                    Tác giả
                  </Label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tác giả"
                    className="h-[40px] w-[489.95px] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Chuyên mục
                  </Label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập chuyên mục"
                    className="h-[40px] w-[489.95px] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Ngày đăng
                  </Label>
                  <input
                    type="date"
                    required
                    placeholder="Nhập ngày đăng"
                    className="h-[40px] w-[489.95px] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Trạng thái
                  </Label>
                  <select
                    id="status"
                    name="status"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="draft">Nháp</option>
                    <option value="published">Đã đăng</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="featured" className="text-right">
                    Nổi bật
                  </Label>
                  <div className="flex items-center col-span-3">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Hình ảnh
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    placeholder="Chọn hình ảnh"
                    className="h-[40px] w-[489.95px] border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
              children="Tạo bài viết"
            />
          </DialogFooter>
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
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Blog_Management;
