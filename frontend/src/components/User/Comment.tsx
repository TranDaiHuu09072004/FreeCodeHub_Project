"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "@/components/User/Button";
import { useAuth } from "@/app/Context/AuthContext";
import axiosInstance from "@/app/utils/axiosInstance";

interface CommentProps {
  targetId?: string;
}

type RenderableComment = {
  user: string;
  avatar?: string;
  content: string;
  createdAt: string;
};

const Comment: React.FC<CommentProps> = ({ targetId }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [commentList, setCommentList] = useState<RenderableComment[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const isFetchingRef = useRef(false);
  const canSubmit = useMemo(
    () => Boolean(user && content.trim() && targetId),
    [user, content, targetId]
  );

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

    const mapApiToRenderable = (items: any[]): RenderableComment[] => {
      return items.map((item) => ({
        user: item?.userId?.name || "Ẩn danh",
        avatar: item?.userId?.avatar,
        content: item?.content,
        createdAt: item?.createdAt,
      }));
    };

    const fetchComments = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      try {
        const res = await axiosInstance.get("/comments", {
          params: { targetId },
          signal: controllerRef.current?.signal as any,
        });
        if (!isMounted) return;
        setCommentList(mapApiToRenderable(res.data || []));
      } catch (error: any) {
        if (error?.name === "CanceledError") return;
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

      console.log("Comment created:", res.data);

      // 👉 Cập nhật luôn vào UI
      // Optimistic append using current user info
      setCommentList((prev) => [
        ...prev,
        {
          user: user?.name || "Ẩn danh",
          avatar: user?.avatar,
          content: res.data.content,
          createdAt: res.data.createdAt,
        },
      ]);

      setContent("");
    } catch (error: any) {
      console.error("Lỗi khi tạo comment:", error);
      alert(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="comment">
      <h3 className="text-2xl font-bold text-white">
        Bình luận <span>({commentList.length})</span>
      </h3>

      {/* Form nhập bình luận */}
      <div className="form_comment bg-[#1a1f2b] p-[16px] mt-[24px] rounded-[5px]">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[10px]">
            <img
              src={user?.avatar || "https://github.com/shadcn.png"}
              className="w-[30px] h-[30px] rounded-full"
              alt="user avatar"
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
              children="Gửi bình luận"
              icon="fa-regular fa-paper-plane"
              className="text-white text-[13px] bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[8px] px-[16px] rounded-[5px] cursor-pointer "
            />
          </div>
        </form>
      </div>

      {/* Danh sách comment */}
      {commentList.map((c, idx) => (
        <div
          key={idx}
          className="show_comment bg-[#1a1f2b] p-[16px] mt-[24px] rounded-[5px]"
        >
          <div className="flex gap-[10px]">
            <img
              src={c.avatar || "https://github.com/shadcn.png"}
              className="w-[30px] h-[30px] rounded-full"
              alt=""
            />
            <div className="name_post">
              <h3 className="text-white font-bold">{c.user}</h3>
              <span className="text-[#677d9b] text-[13px]">
                {new Date(c.createdAt).toLocaleString("vi-VN")}
              </span>
              <p className="text-white">{c.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
