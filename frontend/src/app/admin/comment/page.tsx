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
import { toast, ToastContainer } from "react-toastify";
import { Comment } from "@/app/(client)/blog/page";

export type CommentFormValue = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar: string;
    createdAt: string;
  };
  targetId: {
    _id: string;
    title: string;
  };
  content: string;
};

const Comment_Management = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [deleteComment, setDeleteComment] = useState<Comment | null>(null);
  const [isDeleteDialog, setDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  //phân trang
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentComments = comments.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(comments.length / itemsPerPage);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const fetchComments = () => {
    try {
      axiosInstance
        .get("/comments")
        .then((res) => setComments(res.data.comments));
    } catch (error) {
      console.log("Fail to Fetch Data Blogs", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeletedComment = async () => {
    if (!deleteComment) return;
    try {
      await axiosInstance.delete(`comments/${deleteComment._id}`);
      toast.success("Xóa bình luận thành công!!!");
      fetchComments();
    } catch (error) {
      toast.error("Xóa bình luận thất bại");
    } finally {
      setDeleteDialog(false);
      setDeleteComment(null);
    }
  };
  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <ToastContainer />
      <div className="title_blog mb-[35px]">
        <h3 className="text-2xl text-white font-bold">Quản lý bình luận</h3>
        <p className="text-[#677d9b] text-[15px] font-[450]">
          Quản lý các bình luận của người dùng
        </p>
      </div>
      <div className="list_title-post bg-[#1a1f2b] p-[30px] rounded-[8px] overflow-x-auto">
        <div className="flex justify-between items-center">
          <div className="title_blog">
            <h3 className="text-2xl text-white font-bold">
              Danh sách bình luận
            </h3>
            <p className="text-[#677d9b] text-[15px] font-[450]">
              Quản lý tất cả bình luận blog
            </p>
          </div>
        </div>
        <div className="search_input bg-[#121826] rounded-[3px] p-3 flex items-center gap-[10px] my-[10px] h-[40px]">
          <i className="fa-solid fa-magnifying-glass text-[#677d9b] cursor-pointer"></i>{" "}
          <input
            type="text"
            className="outline-none text-[#677d9b] w-full h-auto rounded-[3px]"
            placeholder="Tìm kiếm bình luận..."
          />
        </div>
        <Table className="!text-[14px]">
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#677d9b]">ID</TableHead>
              <TableHead className="text-[#677d9b]">Tên người dùng</TableHead>
              <TableHead className="text-[#677d9b]">Hình ảnh</TableHead>
              <TableHead className="text-[#677d9b]">
                Nội dung bình luận{" "}
              </TableHead>
              <TableHead className="text-[#677d9b]">Tiêu đề bài học</TableHead>
              <TableHead className="text-[#677d9b]">Ngày đăng</TableHead>
              <TableHead className="text-[#677d9b]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentComments.map((c, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-white">
                  {offset + index + 1}
                </TableCell>
                <TableCell>
                  <h5 className="text-white">{c.userId.name}</h5>
                </TableCell>
                <TableCell>
                  <img
                    src={
                      c.userId.avatar
                        ? c.userId.avatar.startsWith("http")
                          ? c.userId.avatar
                          : `http://localhost:5000${c.userId.avatar}`
                        : "https://placehold.co/100"
                    }
                    alt={c.userId.name}
                    className="h-[32px] w-[32px] rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="text-white"> {c.content}</TableCell>
                <TableCell className="text-white max-w-[200px] overflow-hidden text-ellipsis">
                  {" "}
                  {c.targetId.title}
                </TableCell>

                <TableCell className="text-white">
                  {c.userId.createdAt}
                </TableCell>
                <TableCell>
                  <Button
                    icon="fa-regular fa-trash-can text-white !text-[14px] "
                    className="w-[40px] h-[40px] items-center cursor-pointer"
                    onClick={() => {
                      setDeleteComment(c);
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
              onClick={handleDeletedComment}
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

export default Comment_Management;
