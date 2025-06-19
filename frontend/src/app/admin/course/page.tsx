"use client";
import React, { useState } from "react";
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

const Course_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
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
            onClick={openDialog}
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] !py-[8px] !px-[15px] rounded-[5px] cursor-pointer"
            children="Thêm khóa học"
            icon="fa-solid fa-circle-plus"
          />
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
              <TableHead className="text-[#677d9b]">Lượt xem</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-white">1</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="image h-[48px] w-[64px] rounded-[3px] bg-purple flex items-center justify-center text-white overflow-hidden">
                    <img
                      src="https://placehold.co/100"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <h3>HTML, CSS từ Zero đến Hero</h3>
                    <span className="text-[#677d9b]">
                      Khóa học HTML, CSS từ cơ bản đến nâng cao.
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-white">FrontEnd</span>
              </TableCell>
              <TableCell>
                {" "}
                <div className="flex items-center gap-3 text-white">
                  <i className="fa-solid fa-user text-[20px]"></i>
                  <span>Sơn đặng</span>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-white">Cơ bản</span>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-blue-700 rounded-full text-white">
                  Đã xuất bản
                </span>
              </TableCell>
              <TableCell className="text-white">100</TableCell>
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
            <DialogTitle>Thêm khóa học mới</DialogTitle>
            <DialogDescription>
              Điền thông tin để tạo khóa học mới.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="" className="">
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="title_course" className="text-left">
                    Tiêu đề khóa học
                  </Label>
                  <Input
                    type="text"
                    placeholder="Tên tiêu đề khóa học"
                    required
                    className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="slug" className="text-left">
                    Slug
                  </Label>
                  <Input
                    type="text"
                    placeholder="ten-khoa-hoc"
                    required
                    className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="author" className="text-left">
                      Tác giả
                    </Label>
                    <select
                      id="author"
                      name="author"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Sơn Đặng">Sơn Đặng</option>
                      <option value="Hỏi dân IT">Hỏi dân IT</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="categories" className="text-left">
                      Danh mục
                    </Label>
                    <select
                      id="categories"
                      name="categories"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="FrontEnd">FrontEnd</option>
                      <option value="BackEnd">BackEnd</option>
                      <option value="FullStack">FullStack</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="categories" className="text-left">
                    Chọn cấp độ
                  </Label>
                  <select
                    id="categories"
                    name="categories"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="Cơ bản">Cơ bản</option>
                    <option value="Trung Cấp">Trung Cấp</option>
                    <option value="Nâng cao">Nâng cao</option>
                  </select>
                </div>
                <div className="flex flex-col gap-4">
                  <Label htmlFor="introduce" className="text-left">
                    Mô tả
                  </Label>
                  <textarea
                    name="introduce"
                    placeholder="Mô tả chi tiết về khóa học"
                    id="introduce"
                    rows={5}
                    className="col-span-3 border p-2 rounded-[10px] border-[#1e2631]"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="image_thumnail" className="text-left">
                      Ảnh Thumbnail
                    </Label>
                    <Input
                      id="image_thumnail"
                      type="file"
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="slug" className="text-left">
                      URL Youtube
                    </Label>
                    <Input
                      type="text"
                      placeholder="Tên Url Youtube"
                      required
                      className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
              children="Tạo khóa học"
            />
          </DialogFooter>
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
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Course_Management;
