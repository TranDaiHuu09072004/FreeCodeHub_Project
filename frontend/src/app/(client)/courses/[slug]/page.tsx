"use client";
import Banner from "@/components/User/Banner";
import Button from "@/components/User/Button";
import { Course } from "@/components/User/ItemProduct";
import Footer from "@/app/layout/Footer";
import axios from "@/app/utils/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import Swal from "sweetalert2";
import Image from "next/image";

const DetailCourses = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [detailCourses, setDetailCourses] = useState<Course | null>(null);

  useEffect(() => {
    if (slug) {
      axios.get(`/courses/${slug}`).then((res) => {
        setDetailCourses(res.data);
      });
    }
  }, [slug]);

  const handleRegisterCourse = async () => {
    if (!user) {
      Swal.fire({
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để đăng ký khóa học này.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#654ea3",
        cancelButtonColor: "#1a1f2b",
        confirmButtonText: "Đăng nhập ngay",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      try {
        const response = await axios.post("/register-courses", {
          courseSlug: slug,
          userId: user.id ?? user._id,
        });

        if (response.data) {
          Swal.fire(
            "Thành công!",
            "Bạn đã đăng ký khóa học thành công!",
            "success"
          );
          setTimeout(() => {
            router.push(`/courses/lesson/${slug}`);
          }, 1500);
        } else {
          Swal.fire(
            "Lỗi!",
            response.data.message || "Đăng ký khóa học thất bại.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error registering course:", error);
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi đăng ký khóa học.", "error");
      }
    }
  };

  return (
    <div className="lg:px-[32px] lg:pt-[48px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <Banner
        name="Chi tiết khóa học"
        description="Chọn khóa học chi tiết của bạn"
        image="/assets/img/banne_detail-course.png"
      />
      <section className="detail_course bg-[#1F212C] rounded-[10px] p-[35px] my-[35px] ">
        <div className="item-detail_course flex flex-col lg:flex-row gap-6 lg:gap-0">
          <div className="img_detail relative w-full lg:w-[50%] bg-[#121826] p-[10px] rounded-[10px] aspect-video">
            <Image
              src={detailCourses?.thumbnail || "/fallback.jpg"}
              alt="Course Thumbnail"
              fill
              className="rounded-[10px] object-cover"
            />
          </div>

          <div className="content_detail w-full lg:w-[50%] lg:pl-[37px]">
            <h3 className="text-[20px] text-white font-bold mt-[15px] mb-[30px] lg:mt-0">
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
            <p className="text-[#9d9da3] my-[20px] text-[14px] line-clamp-3">
              {detailCourses?.description}
            </p>
            <Button
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handleRegisterCourse}
            >
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </section>

      <section className="description_detail--courses my-[35px] bg-[#1F212C] rounded-[10px] px-[35px]">
        <h1 className="title text-white text-[30px] font-bold text-center py-[35px]">
          Mô tả thông tin
        </h1>
        <ul className="list_des--detail-course grid grid-cols-1 md:grid-cols-2 gap-[20px] pb-[35px]">
          {(detailCourses?.highlights?.length ?? 0) > 0 ? (
            (detailCourses?.highlights ?? []).map((highlight, index) => (
              <li key={index} className="flex items-center gap-[10px]">
                <i className="fa-solid fa-circle-check bg-gradient-to-r from-[#eaafc8] to-[#654ea3] bg-clip-text text-transparent text-[30px]"></i>{" "}
                <span className=" text-[#E5E4E4]">{highlight}</span>
              </li>
            ))
          ) : (
            <li className="col-span-2 text-center text-[#9d9da3]">
              Không có nội dung nào
            </li>
          )}
        </ul>
      </section>
      <Footer />
    </div>
  );
};

export default DetailCourses;
