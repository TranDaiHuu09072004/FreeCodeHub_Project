"use client";
import { useState } from "react";
// import axiosInstance from "@/app/utils/axiosInstance";
// import { ItemBlogs } from "@/app/types/ItemBlog.type"; // Giữ nguyên type của bạn
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/(client)/blog/BlogClient";

interface ItemBlogListProps {
  selectedCategory: string;
  initialBlogs: Blog[];
}

const ItemBlogList = ({
  selectedCategory,
  initialBlogs,
}: ItemBlogListProps) => {
  const [blogs] = useState<Blog[]>(
    (initialBlogs || []).filter((b) => !b.isFeatured),
  );
  const isLoading = false;

  const filteredBlogs =
    selectedCategory === "Tất cả"
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  if (isLoading) {
    return (
      <p className="text-white text-center col-span-1 sm:col-span-2 lg:col-span-3 py-20">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-500"></i>
      </p>
    );
  }

  if (filteredBlogs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20 col-span-1 sm:col-span-2 lg:col-span-3">
        <i className="fa-solid fa-box-open text-6xl mb-6 text-gray-600"></i>
        <p className="text-xl font-medium">Không tìm thấy bài viết nào.</p>
        <p className="text-gray-500">Vui lòng thử chọn danh mục khác.</p>
      </div>
    );
  }

  return (
    <>
      {filteredBlogs.map((blog) => (
        <div
          key={blog._id}
          className="item_blog bg-[#1A1F2B] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
        >
          <Link href={`/blog/${blog.slug}`} className="block">
            <div className="w-full h-[250px] relative rounded-t-[10px] overflow-hidden bg-[#121826]">
              <Image
                src={
                  blog.thumbnail ||
                  "https://placehold.co/600x400/1a1f2b/ffffff?text=Image"
                }
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x400/1a1f2b/ffffff?text=Error";
                }}
              />
            </div>
            <div className="content_blog p-5">
              <div className="flex items-center mb-3 justify-between">
                <div className="create_post flex items-center gap-2 text-xs text-gray-400">
                  <i className="fa-solid fa-calendar text-white/50"></i>
                  <span>{blog.date}</span>
                </div>
                <div className="author flex items-center gap-2">
                  <Image
                    src={
                      blog?.imageAuthor ||
                      "https://placehold.co/40x40/654ea3/ffffff?text=A"
                    }
                    alt={blog.author}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/40x40/654ea3/ffffff?text=A";
                    }}
                  />
                  <span className="text-white text-xs font-medium">
                    {blog.author}
                  </span>
                </div>
              </div>

              <h1 className="text-[18px] font-bold text-white mb-2 line-clamp-2 h-[56px] group-hover:text-[#eaafc8] transition-colors">
                {blog.title}
              </h1>

              <p className="text-[#798595] text-sm mb-4 line-clamp-2 h-[40px]">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <h3 className="bg-gradient-to-r from-[#eaafc8]/20 to-[#654ea3]/20 text-[#eaafc8] px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </h3>
                <div className="font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text text-sm">
                  Đọc Thêm{" "}
                  <i className="fa-solid fa-arrow-right bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text text-xs"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ItemBlogList;
