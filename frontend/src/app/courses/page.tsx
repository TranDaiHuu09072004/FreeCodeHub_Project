"use client";
import Banner from "@/app/components/Banner";
import Button from "@/app/components/Button";
import InputSearch from "@/app/components/InputSearch";
import Footer from "@/app/layout/Footer";
import React, { useState } from "react";

const CoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-[56px] pt-[56px]">
      <Banner
        name="Khóa học miễn phí - Học mọi lúc mọi nơi"
        description="Học lập trình miễn phí, mọi lúc mọi nơi với nội dung chất lượng từ các chuyên gia. Nắm vững HTML, CSS, JavaScript, ReactJS và hơn thế nữa – bắt đầu ngay hôm nay! 🚀"
        showButton={false}
        image="assets/img/banner_img_courses.png"
        isBlog={false}
      />
      <section className="Filter_course my-[35px] bg-[#1F212C] py-[10px] px-[30px] rounded-[10px] flex justify-between ">
        <h1 className="title_course text-white text-[25px] font-bold">
          Bộ lọc tìm kiếm
        </h1>
        <select
          name=""
          id=""
          className="select_author bg-[#333647] rounded-[5px] text-white px-[4px] border-none outline-none w-[172px] mx-[25px]"
          style={{ colorScheme: "dark" }}
        >
          <option disabled hidden>
            Chọn tác giả
          </option>
          <option value="F8 Offical">F8 Offical</option>
          <option value="Hỏi Dân IT">Hỏi Dân IT</option>
          <option value="EvonDev">EvonDev</option>
          <option value="NineDev">NineDev</option>
        </select>
        <select
          name=""
          id=""
          className="select_author bg-[#333647] rounded-[5px] text-white px-[4px] border-none outline-none w-[172px] mr-[25px]"
          style={{ colorScheme: "dark" }}
        >
          <option disabled hidden>
            Chọn lĩnh vực
          </option>
          <option value="F8 Offical">Front End</option>
          <option value="Hỏi Dân IT">Back End</option>
          <option value="EvonDev">FullStack</option>
          <option value="NineDev">Mobile</option>
        </select>
        <InputSearch
          placeholder="Tìm kiếm theo khóa học..."
          h={"40px"}
          w={"250px"}
        />
      </section>
      <section className="listCourses bg-[#1F212C] py-[10px] px-[20px] rounded-[10px] ">
        <div className="items_course bg-[#141625] p-[10px] rounded-[10px] flex items-center justify-between mb-[20px]">
          <div className="content_course flex">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="w-[94px] h-auto rounded-[5px]"
            />
            <div className="name_course ml-[20px]">
              <h3 className="text-[#E5E4E4] text-[18px]">
                Xây dựng Website với ReactJS
              </h3>
              <p>
                <i className="text-[#9D9DA3]">Học lập trình để đi làm</i>
              </p>
            </div>
          </div>
          <div className="author">
            <h5 className="text-white">
              <i className="fa-solid fa-user"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3]">
              <i>F8 Offical</i>
            </p>
          </div>
          <div className="slogan">
            <i className="text-[#9D9DA3]">Khóa học miễn phí </i>
          </div>
          <Button
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            children="Học ngay"
          />
        </div>
        <div className="items_course bg-[#141625] p-[10px] rounded-[10px] flex items-center justify-between mb-[20px]">
          <div className="content_course flex">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="w-[94px] h-auto rounded-[5px]"
            />
            <div className="name_course ml-[20px]">
              <h3 className="text-[#E5E4E4] text-[18px]">
                Xây dựng Website với ReactJS
              </h3>
              <p>
                <i className="text-[#9D9DA3]">Học lập trình để đi làm</i>
              </p>
            </div>
          </div>
          <div className="author">
            <h5 className="text-white">
              <i className="fa-solid fa-user"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3]">
              <i>F8 Offical</i>
            </p>
          </div>
          <div className="slogan">
            <i className="text-[#9D9DA3]">Khóa học miễn phí </i>
          </div>
          <Button
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            children="Học ngay"
          />
        </div>
        <div className="items_course bg-[#141625] p-[10px] rounded-[10px] flex items-center justify-between mb-[20px]">
          <div className="content_course flex">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="w-[94px] h-auto rounded-[5px]"
            />
            <div className="name_course ml-[20px]">
              <h3 className="text-[#E5E4E4] text-[18px]">
                Xây dựng Website với ReactJS
              </h3>
              <p>
                <i className="text-[#9D9DA3]">Học lập trình để đi làm</i>
              </p>
            </div>
          </div>
          <div className="author">
            <h5 className="text-white">
              <i className="fa-solid fa-user"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3]">
              <i>F8 Offical</i>
            </p>
          </div>
          <div className="slogan">
            <i className="text-[#9D9DA3]">Khóa học miễn phí </i>
          </div>
          <Button
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            children="Học ngay"
          />
        </div>
        <div className="items_course bg-[#141625] p-[10px] rounded-[10px] flex items-center justify-between mb-[20px]">
          <div className="content_course flex">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="w-[94px] h-auto rounded-[5px]"
            />
            <div className="name_course ml-[20px]">
              <h3 className="text-[#E5E4E4] text-[18px]">
                Xây dựng Website với ReactJS
              </h3>
              <p>
                <i className="text-[#9D9DA3]">Học lập trình để đi làm</i>
              </p>
            </div>
          </div>
          <div className="author">
            <h5 className="text-white">
              <i className="fa-solid fa-user"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3]">
              <i>F8 Offical</i>
            </p>
          </div>
          <div className="slogan">
            <i className="text-[#9D9DA3]">Khóa học miễn phí </i>
          </div>
          <Button
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            children="Học ngay"
          />
        </div>
        <div className="items_course bg-[#141625] p-[10px] rounded-[10px] flex items-center justify-between mb-[20px]">
          <div className="content_course flex">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/13/13.png"
              alt=""
              className="w-[94px] h-auto rounded-[5px]"
            />
            <div className="name_course ml-[20px]">
              <h3 className="text-[#E5E4E4] text-[18px]">
                Xây dựng Website với ReactJS
              </h3>
              <p>
                <i className="text-[#9D9DA3]">Học lập trình để đi làm</i>
              </p>
            </div>
          </div>
          <div className="author">
            <h5 className="text-white">
              <i className="fa-solid fa-user"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3]">
              <i>F8 Offical</i>
            </p>
          </div>
          <div className="slogan">
            <i className="text-[#9D9DA3]">Khóa học miễn phí </i>
          </div>
          <Button
            className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
            children="Học ngay"
          />
        </div>
      </section>
      <section className="flex items-center justify-center gap-2 my-8">
        <button
          className="w-9 h-9 flex items-center justify-center rounded border border-[#6C6C6C] hover:bg-gradient-to-r from-[#eaafc8] to-[#654ea3] hover:border-transparent hover:text-white transition-colors"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-chevron-left text-[#E5E4E4]"></i>
        </button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-9 h-9 flex items-center justify-center rounded border border-[#6C6C6C] transition-colors ${
              currentPage === page
                ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white"
                : "text-[#E5E4E4] hover:bg-gradient-to-r hover:from-[#eaafc8] hover:to-[#654ea3] hover:border-transparent hover:text-white"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="w-9 h-9 flex items-center justify-center rounded border border-[#6C6C6C] hover:bg-gradient-to-r from-[#eaafc8] to-[#654ea3] hover:border-transparent hover:text-white transition-colors"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 5}
        >
          <i className="fa-solid fa-chevron-right text-[#E5E4E4]"></i>
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default CoursesPage;
