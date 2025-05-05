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

const Category_Management = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <div className="title_blog my-[35px]">
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
            onClick={openDialog}
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <span>Frontend</span>
              </TableCell>
              <TableCell>
                <span className="text-[#677d9b]">frontend</span>
              </TableCell>
              <TableCell>
                {" "}
                <span> Các khóa học về Frontend Development</span>
              </TableCell>
              <TableCell>
                <span>12</span>
              </TableCell>
              <TableCell>2025-04-10</TableCell>
              <TableCell>
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <span>Frontend</span>
              </TableCell>
              <TableCell>
                <span className="text-[#677d9b]">frontend</span>
              </TableCell>
              <TableCell>
                {" "}
                <span> Các khóa học về Frontend Development</span>
              </TableCell>
              <TableCell>
                <span>12</span>
              </TableCell>
              <TableCell>2025-04-10</TableCell>
              <TableCell>
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <span>Frontend</span>
              </TableCell>
              <TableCell>
                <span className="text-[#677d9b]">frontend</span>
              </TableCell>
              <TableCell>
                {" "}
                <span> Các khóa học về Frontend Development</span>
              </TableCell>
              <TableCell>
                <span>12</span>
              </TableCell>
              <TableCell>2025-04-10</TableCell>
              <TableCell>
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <span>Frontend</span>
              </TableCell>
              <TableCell>
                <span className="text-[#677d9b]">frontend</span>
              </TableCell>
              <TableCell>
                {" "}
                <span> Các khóa học về Frontend Development</span>
              </TableCell>
              <TableCell>
                <span>12</span>
              </TableCell>
              <TableCell>2025-04-10</TableCell>
              <TableCell>
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>
                <span>Frontend</span>
              </TableCell>
              <TableCell>
                <span className="text-[#677d9b]">frontend</span>
              </TableCell>
              <TableCell>
                {" "}
                <span> Các khóa học về Frontend Development</span>
              </TableCell>
              <TableCell>
                <span>12</span>
              </TableCell>
              <TableCell>2025-04-10</TableCell>
              <TableCell>
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
        <DialogContent maxWidth="max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogDescription>
              Điền thông tin để tạo danh mục mới.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form action="">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name_category" className="text-right">
                    Tên danh mục
                  </Label>
                  <input
                    type="text"
                    required
                    className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slug" className="text-right">
                    Slug
                  </Label>
                  <input
                    type="text"
                    required
                    className="h-[40px] w-full border border-[#1e2631] !outline-[#677d9b] py-[8px] px-[12px] rounded-[10px] col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="summary" className="text-right">
                    Nội dung
                  </Label>
                  <textarea
                    name="summary"
                    id="summary"
                    rows={5}
                    className="col-span-3 rounded-[10px] border border-[#1e2631]"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[15px] rounded-[5px] cursor-pointer"
              children="Tạo danh mục"
            />
          </DialogFooter>
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
            <AlertDialogAction className="bg-destructive text-destructive-foreground">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Category_Management;
