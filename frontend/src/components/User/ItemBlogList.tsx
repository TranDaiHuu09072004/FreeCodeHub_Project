"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { ItemBlogs } from "@/app/types/ItemBlog.type";
import Link from "next/link";
import Image from "next/image";

const ItemBlogList = ({ selectedCategory }: { selectedCategory: string }) => {
  const [blogs, setBlogs] = useState<ItemBlogs[]>([]);

  useEffect(() => {
    axiosInstance.get("/blogs").then((res) => {
      const filtered = res.data.filter((b: ItemBlogs) => !b.isFeatured);
      setBlogs(filtered);
    });
  }, []);

  const filteredBlogs =
    selectedCategory === "Tất cả"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <>
      {filteredBlogs.map((blog) => (
        <div
          key={blog._id}
          className="item_blog bg-[#1A1F2B] rounded-[10px] hover:translate-y-[-10px] transition-all duration-300"
        >
          <Link href={`/blog/${blog.slug}`}>
            {" "}
            <div className="w-full h-[250px] relative rounded-t-[10px] overflow-hidden">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="content_blog p-[25px]">
              <div className="flex items-center mb-[10px] justify-between">
                <div className="create_post">
                  <i className="fa-solid fa-calendar text-[18px] text-white mr-[10px]"></i>
                  <span className="text-white">{blog.date}</span>
                </div>
                <div className="author flex items-center gap-2">
                  <Image
                    src={blog?.imageAuthor || "https://github.com/shadcn.png"}
                    alt=""
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full"
                  />
                  <span className="text-white">{blog.author}</span>
                </div>
              </div>
              <h1 className="text-[20px] font-bold text-white mb-[10px] line-clamp-2">
                {blog.title}
              </h1>
              <p className="text-[#798595] mb-[10px] line-clamp-2">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <h3 className="bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white px-2 py-1 rounded-[10px]">
                  {blog.category}
                </h3>
                <div className="font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text">
                  Đọc Thêm{" "}
                  <i className="fa-solid fa-arrow-right bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text"></i>
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
