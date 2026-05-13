"use client";
import ItemBlog from "@/components/User/ItemBlog";
import Footer from "@/app/layout/Footer";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";
import { Blog } from "../BlogClient";
const DetailBlog = ({
  initialBlog,
  initialRelatedBlogs,
}: {
  initialBlog: Blog;
  initialRelatedBlogs: Blog[];
}) => {
  const detailBlog = initialBlog;
  const [relatedblog] = useState<Blog[]>(initialRelatedBlogs || []);
  return (
    <div
      key={detailBlog?._id}
      className="lg:px-[32px] lg:pt-[32px]  max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4"
    >
      <div className="wrapper_detail-blog max-w-4xl mx-auto">
        <div className="turnback_blog cursor-pointer">
          <Link href="/blog" className="flex items-center gap-[10px]">
            <i className="fa-solid fa-arrow-left text-[#677d9b]"></i>
            <h3 className="text-[#677d9b]">Quay lại danh sách bài viết</h3>
          </Link>
        </div>
        <section className="detail_blog my-[15px]">
          <h1 className="title_blog xl:text-[35px] max-sm:text-[25px] text-white font-bold">
            {detailBlog?.title}
          </h1>
          <div className="author_post flex items-center gap-6">
            <div className="author flex items-center gap-[10px] my-[15px]">
              <Image
                src={detailBlog?.imageAuthor || "https://github.com/shadcn.png"}
                alt=""
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="name_author">
                <h3 className="text-white font-bold">{detailBlog?.author}</h3>
                <p className="text-[#677d9b] text-[13px]">Tác giả</p>
              </div>
            </div>
            <div className="day_post flex gap-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#677d9b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar h-5 w-5"
                data-lov-id="src/pages/BlogDetail.tsx:50:14"
                data-lov-name="Calendar"
                data-component-path="src/pages/BlogDetail.tsx"
                data-component-line="50"
                data-component-file="BlogDetail.tsx"
                data-component-name="Calendar"
                data-component-content="%7B%22className%22%3A%22h-4%20w-4%22%7D"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span className="text-[#677d9b] text-[14px]">
                {detailBlog?.date}
              </span>
            </div>
          </div>
          <div className="content_blog !text-white w-full">
            <div
              className="prose prose-invert max-w-none w-full [&_*]:!text-white [&_*]:!max-w-full [&_img]:w-full [&_img]:mb-2 
  [&_span]:!bg-transparent [&_ol]:!bg-transparent [&_strong]:!bg-transparent [&_ul]:!bg-transparent [&_li]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: detailBlog?.content || "" }}
            ></div>
          </div>
        </section>
        <section className="blog_related">
          <h3 className="text-2xl font-bold text-white">Bài viết liên quan</h3>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5 my-5">
            {relatedblog.map((item) => (
              <ItemBlog key={item._id} blog={item} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DetailBlog;
