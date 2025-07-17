"use client";
import Banner_Blog from "@/components/User/BannerBlog";
import Button from "@/components/User/Button";
import ItemBlog from "@/components/User/ItemBlog";
import Footer from "@/app/layout/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import Link from "next/link";
import ItemBlogList from "@/components/User/ItemBlogList";

export interface Blog {
  _id: string;
  title: string;
  author: string;
  imageAuthor: string;
  category: string;
  status: "Đã đăng" | "Nháp" | "Đã xóa";
  isFeatured: boolean;
  date: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  tags: string[];
  slug: string;
}

const Blog = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [blogFeatured, setBlogFeatured] = useState<Blog | null>(null);
  const [activeButton, setActiveButton] = useState<number | null>(0);
  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  useEffect(() => {
    axiosInstance
      .get("/blogs/featured")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setBlogFeatured(res.data[0]); // ✅ Lấy phần tử đầu tiên
        }
      })
      .catch((error) => {
        console.log("FetchData Blogs Nổi bật thất bại", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get("/categories").then((res) => {
      // Giả sử API trả về mảng các object có thuộc tính name
      setCategories(["Tất cả", ...res.data.map((cat: any) => cat.name)]);
    });
  }, []);
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner_Blog
        placeholder="Tìm kiếm bài viết"
        name="Blog FreeCodeHub"
        description="Chia sẻ kiến thức, kinh nghiệm và tin tức mới nhất về lập trình, các khóa học miễn phí và xu hướng công nghệ."
        isSearch={true}
      />
      <section className="select_blog my-[35px] flex justify-center">
        <div className="grid grid-cols-5 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-5">
          {categories.map((cat, index) => (
            <Button
              key={index}
              children={cat}
              isNumber_blog={true}
              // Có thể thay bằng số bài viết từng category nếu muốn
              className={`py-[10px] px-[30px] rounded-[5px] cursor-pointer ${
                activeButton === index
                  ? "text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3]"
                  : "text-white bg-[#1A1F2B]"
              }`}
              onClick={() => {
                setActiveButton(index);
                setSelectedCategory(cat);
              }}
            />
          ))}
        </div>
      </section>
      {blogFeatured && (
        <section className="blog_hot">
          <div className="item-detail_course flex max-xl:flex-col">
            <div className="img_detail xl:w-[50%] max-xl:w-full bg-[#1a1f2b] xl:p-[10px] rounded-[10px]">
              <img
                src={blogFeatured.thumbnail || "https://placehold.co/600x400"}
                alt=""
                className="rounded-[10px] w-full"
              />
            </div>
            <div className="content_detail xl:pl-[37px] xl:w-[50%] max-xl:w-full">
              {blogFeatured.isFeatured && (
                <h5 className="mt-[15px] bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white py-1 px-2 w-[100px] rounded-[30px]">
                  Tin nổi bật
                </h5>
              )}

              <h3 className="text-[25px] text-white font-bold mt-[15px] mb-[15px]">
                {blogFeatured.title}
              </h3>
              <p className="text-[#9d9da3] my-[20px] text-[14px]">
                {blogFeatured.excerpt}
              </p>
              <div className="flex w-[200px] items-center mb-[10px] justify-between">
                {" "}
                <div className="create_post">
                  <i className="fa-solid fa-calendar text-[18px] text-white mr-[10px]"></i>
                  <span className="text-white">{blogFeatured.date}</span>
                </div>
                <div className="author">
                  <i className="fa-solid fa-user text-[18px] text-white mr-[10px]"></i>
                  <span className="text-white">{blogFeatured.author}</span>
                </div>
              </div>
              <Link href={`/blog/${blogFeatured.slug}`}>
                <Button
                  children="Đọc bài viết"
                  className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
                />
              </Link>
            </div>
          </div>
        </section>
      )}
      <section className="blog my-[35px] ">
        <div className="relative pl-4">
          <div className="absolute top-0 left-0 h-full w-[10px] bg-gradient-to-b from-[#eaafc8] to-[#654ea3] rounded"></div>
          <h1 className="text-[25px] font-bold text-white">Bài viết</h1>
        </div>
        <div className="wrapper_blog mt-[35px] grid lg:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
          <ItemBlogList selectedCategory={selectedCategory} />
        </div>
      </section>
      <Banner_Blog
        name="Đăng ký nhận bản tin"
        description="Nhận thông báo về các bài viết mới và các khóa học miễn phí chất lượng cao."
        placeholder="Email của bạn...."
        isSearch={true}
      />
      <Footer />
    </div>
  );
};

export default Blog;
