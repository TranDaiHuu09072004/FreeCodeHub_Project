"use client";
import Button from "@/components/User/Button";
import { Course } from "./ItemProduct";
import axios from "@/app/utils/axiosInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ListCoursesProps {
  courses?: Course[];
}

const ListCourses = ({ courses }: ListCoursesProps) => {
  const { user } = useAuth();
  const [listcourses, setListCourses] = useState<Course[]>([]);
  const router = useRouter();

  // --- LOGIC FETCH DATA (Giữ nguyên) ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (courses) {
          setListCourses(courses);
          return;
        }
        if (!user) {
          const res = await axios.get<Course[]>("/courses");
          setListCourses(res.data);
        } else {
          const userRes = await axios.get<{ registerCourses: string[] }>(
            "/users"
          );
          let registeredCoursesSlugs: string[] = [];
          if (userRes.data && Array.isArray(userRes.data.registerCourses)) {
            registeredCoursesSlugs = userRes.data.registerCourses;
          }
          const allCoursesRes = await axios.get<Course[]>("/courses");
          const allCourses = allCoursesRes.data;
          const unregisterCourses = allCourses.filter(
            (course) =>
              !registeredCoursesSlugs.some(
                (registeredSlug: string) => registeredSlug === course.slug
              )
          );
          setListCourses(unregisterCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [user, courses]);

  // --- LOGIC NAVIGATE ---
  const handleNavigate = (course: Course) => {
    if (
      user &&
      user.registeredCourses &&
      user.registeredCourses.includes(course.slug ?? "")
    ) {
      router.push(`/lesson/${course.slug ?? ""}`);
    } else {
      router.push(`/courses/${course.slug ?? ""}`);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {" "}
      {/* Giảm gap tổng từ 4 xuống 3 */}
      {listcourses.map((listcourse, index) => (
        <div
          key={index}
          onClick={() => handleNavigate(listcourse)}
          // FIX 1: Giảm padding xuống p-3 (12px) để card gọn gàng hơn
          className="bg-[#141625] p-3 rounded-[12px] flex items-center gap-3 hover:bg-[#1a1d2e] transition-colors cursor-pointer shadow-sm border border-white/5"
        >
          {/* --- 1. ẢNH THUMBNAIL (Nhỏ gọn) --- */}
          {/* w-[85px]: Kích thước chuẩn cho list mobile */}
          <div className="relative w-[85px] h-[50px] shrink-0 rounded-[6px] overflow-hidden bg-gray-800 shadow-md">
            <Image
              src={
                listcourse.thumbnail ||
                "https://placehold.co/85x50?text=No+Image"
              }
              alt={listcourse.title || ""}
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>

          {/* --- 2. TEXT (Font nhỏ & Tinh tế) --- */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            {/* Title: text-[14px] trên mobile, [16px] trên PC */}
            <h3 className="text-[#E5E4E4] text-[14px] sm:text-[16px] font-bold truncate leading-tight">
              {listcourse.title}
            </h3>

            {/* Desc: text-[12px], italic (in nghiêng), màu xám nhạt -> Giống hệt mẫu */}
            <p className="text-[#9D9DA3] text-[12px] sm:text-[13px] italic truncate mt-[3px]">
              {listcourse.slogan || listcourse.description}
            </p>
          </div>

          {/* --- 3. INFO PC (Chỉ hiện trên màn to) --- */}
          <div className="hidden lg:block w-[140px] shrink-0 border-l border-white/10 pl-4">
            <h5 className="text-white text-xs font-medium">
              <i className="fa-solid fa-user mr-2 text-[#654ea3]"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3] text-xs truncate mt-1 opacity-80">
              {listcourse.author || "Unknown"}
            </p>
          </div>

          {/* --- 4. ICON/BUTTON --- */}
          <div className="shrink-0 flex items-center justify-end pl-1">
            {/* Mobile: Mũi tên nhỏ (text-[12px]) màu xám nhẹ */}
            <div className="sm:hidden flex items-center justify-center text-gray-500">
              <i className="fa-solid fa-arrow-right text-[12px]"></i>
            </div>

            {/* PC: Button */}
            <div className="hidden sm:block">
              <Button
                className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[6px] px-[16px] rounded-[6px] text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(listcourse);
                }}
              >
                Học ngay
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCourses;
