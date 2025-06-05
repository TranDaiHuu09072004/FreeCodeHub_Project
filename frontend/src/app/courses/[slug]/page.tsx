"use client";
import Banner from "@/app/components/User/Banner";
import Button from "@/app/components/User/Button";
import { Course } from "@/app/components/User/ItemProduct";
import Footer from "@/app/layout/Footer";
import axios from "@/app/utils/axiosInstance";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailCourses = () => {
  const { slug } = useParams();
  const [detailCourses, setDetailCourses] = useState<Course | null>(null);
  useEffect(() => {
    if (slug) {
      axios.get(`/courses/${slug}`).then((res) => {
        setDetailCourses(res.data);
      });
    }
  }, [slug]);

  useEffect(() => {
    axios.get(`/courses/${slug}/lessons`).then((res) => console.log(res.data));
  }, []);
  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner
        name="Chi tiết khóa học"
        description="Chọn khóa học chi tiết của bạn"
        image="../assets/img/banne_detail-course.png"
      />
      <section className="detail_course bg-[#1F212C] rounded-[10px] p-[35px] my-[35px] ">
        <div className="item-detail_course flex max-2xl:flex-col">
          <div className="img_detail 2xl:w-[50%] max-2xl:w-full bg-[#121826] p-[10px] rounded-[10px]">
            <img
              src={detailCourses?.thumbnail}
              alt=""
              className="rounded-[10px] w-full"
            />
          </div>
          <div className="content_detail 2xl:pl-[37px] 2xl:w-[50%] max-2xl:w-full">
            <h3 className="text-[20px] text-white font-bold mt-[15px] mb-[30px]">
              {detailCourses?.title}
            </h3>
            <div className="author flex justify-between">
              <span className="text-white">
                <i className="fa-solid fa-user"></i> Tác giả:{" "}
                <i className="text-[#9D9DA3]">{detailCourses?.author}</i>
              </span>
              <span>
                <i className="text-[#9D9DA3]">{detailCourses?.badge}</i>
              </span>
            </div>
            <p className="text-[#9d9da3] my-[20px] text-[14px]">
              {detailCourses?.description}
            </p>
            <Link href={`/lesson/${detailCourses?.slug}`}>
              <Button
                children="Học ngay"
                className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="description_detail--courses my-[35px] bg-[#1F212C] rounded-[10px] px-[35px]">
        <h1 className="title text-white text-[30px] font-bold text-center py-[35px]">
          Mô tả thông tin
        </h1>
        <ul className="list_des--detail-course grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] pb-[35px]">
          {detailCourses?.highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-[10px]">
              <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
              <span className=" text-[#E5E4E4]">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default DetailCourses;
