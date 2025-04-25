"use client";
import Banner_Blog from "@/app/components/BannerBlog";
import Button from "@/app/components/Button";
import ItemBlog from "@/app/components/ItemBlog";
import Footer from "@/app/layout/Footer";
import { useState } from "react";

const Blog = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const handleButtonClick = (id: number) => {
    setActiveButton(id);
  };

  return (
    <div className="px-[56px] pt-[56px]">
      <Banner_Blog
        placeholder="Tìm kiếm bài viết"
        name="Blog FreeCodeHub"
        description="Chia sẻ kiến thức, kinh nghiệm và tin tức mới nhất về lập trình, các khóa học miễn phí và xu hướng công nghệ."
        isSearch={true}
      />
      <section className="select_blog my-[35px] flex justify-center">
        <div className="flex space-x-4">
          {Array.from({ length: 6 }, (_, index) => (
            <Button
              key={index}
              children="Tất cả"
              isNumber_blog={true}
              number_blog="(42)"
              className={`py-[10px] px-[30px] rounded-[5px] cursor-pointer ${
                activeButton === index
                  ? "text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3]"
                  : "text-white bg-[#1A1F2B]"
              }`}
              onClick={() => handleButtonClick(index)}
            />
          ))}
        </div>
      </section>
      <section className="blog_hot">
        <div className="item-detail_course flex">
          <div className="img_detail w-[50%] bg-[#121826] p-[10px] rounded-[10px]">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="rounded-[10px] "
            />
          </div>
          <div className="content_detail pl-[37px] w-[50%]">
            <h5 className="mt-[15px] bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white py-1 px-2 w-[100px] rounded-[30px]">
              Tin nổi bật
            </h5>
            <h3 className="text-[25px] text-white font-bold mt-[15px] mb-[15px]">
              Giới thiệu FreeCodeHub - Nền tảng học lập trình miễn phí từ
              Youtube
            </h3>
            <p className="text-[#9d9da3] my-[20px] text-[14px]">
              FreeCodeHub ra đời với sứ mệnh thu thập và tổ chức các khóa học
              lập trình miễn phí chất lượng cao từ Youtube. Đọc để hiểu thêm về
              câu chuyện, tầm nhìn và mục tiêu của chúng tôi
            </p>
            <div className="flex w-[200px] items-center mb-[10px] justify-between">
              {" "}
              <div className="create_post">
                <i className="fa-solid fa-calendar text-[18px] text-white mr-[10px]"></i>
                <span className="text-white">11/5/2024</span>
              </div>
              <div className="author">
                <i className="fa-solid fa-user text-[18px] text-white mr-[10px]"></i>
                <span className="text-white">Admin</span>
              </div>
            </div>
            <Button
              children="Đọc bài viết"
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            />
          </div>
        </div>
      </section>
      <section className="blog my-[35px] ">
        <div className="relative pl-4">
          <div className="absolute top-0 left-0 h-full w-[10px] bg-gradient-to-b from-[#eaafc8] to-[#654ea3] rounded"></div>
          <h1 className="text-[25px] font-bold text-white">Bài viết</h1>
        </div>
        <div className="wrapper_blog mt-[35px] grid grid-cols-3 gap-[20px]">
          <ItemBlog />
        </div>
      </section>
      <Banner_Blog
        name="Đăng ký nhận bản tin"
        description="Nhận thông báo về các bài viết mới và các khóa học miễn phí chất lượng cao."
        placeholder="Email của bạn...."
      />
      <Footer />
    </div>
  );
};

export default Blog;
