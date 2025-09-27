"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/User/Button";
import { useAuth } from "@/app/Context/AuthContext";
import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";

interface CommentProps {
  targetId?: string;
}

export type CommentT = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    avatar?: string;
    createdAt?: string;
  };
  targetType: string;
  targetId: {
    _id: string;
    title: string;
  };
  content: string;
};

const Comment: React.FC<CommentProps> = ({ targetId }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState<CommentT[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const isFetchingRef = useRef(false);

  // Fetch comments initially and poll; prevent duplicate intervals and cancel inflight on unmount
  useEffect(() => {
    if (!targetId) return;

    let isMounted = true;

    // Clear previous interval and abort previous request (StrictMode safe)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const fetchComments = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        const res = await axiosInstance.get("/comments", {
          params: { targetId },
          signal: controllerRef.current?.signal,
        });
        if (!isMounted) return;
        setCommentList(res.data.comments || []);
      } finally {
        isFetchingRef.current = false;
      }
    };

    // initial fetch
    fetchComments();

    // poll every 8 seconds
    intervalRef.current = setInterval(fetchComments, 8000);
    return () => {
      isMounted = false;
      if (controllerRef.current) controllerRef.current.abort();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [targetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !targetId) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.post(
        "/comments",
        {
          targetId: targetId,
          content,
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      // Optimistic append using returned comment
      setCommentList((prev) => [
        ...prev,
        res.data.comment, // backend nên trả về comment mới tạo
      ]);

      setContent("");
    } catch {
      alert("Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (targetId) {
      axiosInstance
        .get(`/comments?targetId=${targetId}`)
        .then((res) => setCommentList(res.data.comments || []));
    }
  }, [targetId]);

  return (
    <div className="comment">
      <h3 className="text-2xl font-bold text-white">
        Bình luận <span>({commentList.length})</span>
      </h3>

      {/* Form nhập bình luận */}
      <div className="form_comment bg-[#1a1f2b] p-[16px] mt-[24px] rounded-[5px]">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[10px]">
            <Image
              src={user?.avatar || "https://github.com/shadcn.png"}
              className="w-[30px] h-[30px] rounded-full"
              alt="user avatar"
              width={30}
              height={30}
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-white p-[10px] text-[15px] h-[80px] bg-[#121826] rounded-[5px]"
              placeholder="Viết bình luận của bạn..."
            ></textarea>
          </div>
          <div className="flex justify-end mt-[15px]">
            <Button
              type="submit"
              icon="fa-regular fa-paper-plane"
              className="text-white text-[13px] bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[16px] rounded-[5px] cursor-pointer "
            >
              Gửi bình luận
            </Button>
          </div>
        </form>
      </div>

      {/* Danh sách comment */}

      <div className="show_comment bg-[#1a1f2b] p-[16px] mt-[24px] rounded-[5px]">
        {" "}
        {commentList.length > 0 ? (
          commentList.map((c) => (
            <div key={c._id} className="mb-2">
              <div className="flex gap-[10px]">
                <Image
                  src={c.userId.avatar || "https://github.com/shadcn.png"}
                  className="w-[30px] h-[30px] rounded-full"
                  alt=""
                  width={30}
                  height={30}
                />
                <div className="name_post">
                  <h3 className="text-white font-bold">
                    {c.userId.name || "Ẩn danh"}
                  </h3>
                  <span className="text-[#677d9b] text-[13px]">
                    {c.userId.createdAt
                      ? new Date(c.userId.createdAt).toLocaleString("vi-VN")
                      : ""}
                  </span>
                  <p className="text-white">{c.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <span>Hiện chưa có bình luận nào</span>
        )}
      </div>
    </div>
  );
};

export default Comment;
