"use client";
import { useEffect, useState } from "react";
import axios from "@/app/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

export interface Course {
  title: string;
  author: string;
  category: string;
  description: string;
  level: string;
  status: "Đã xuất bản" | "Nháp" | "Đã xóa";
  thumbnail: string;
  image_author: string;
  highlights?: Array<string>;
  isFeatured: true;
  slug?: string;
  badge?: string;
  slogan?: string;
  _id: string;
}

export interface Lesson {
  _id?: string; // Thêm _id vì MongoDB trả về
  courseId: string;
  title: string;
  description?: string;
  videoId: string;
  videoUrl?: string;
  order?: number;
  duration?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ItemProductProps {
  courses: Course[];
  title?: string;
}

export interface CourseDetail extends Course {
  lessons: Lesson[];
}

const ItemProduct = ({ courses, title }: ItemProductProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleRegisterCourse = (
    e: React.MouseEvent<HTMLAnchorElement>,
    course: Course
  ) => {
    if (
      user &&
      user.registeredCourses &&
      user.registeredCourses.includes(course.slug)
    ) {
      e.preventDefault();
      router.push(`/courses/lesson/${course.slug}`);
    }
  };

  return (
    <>
      {courses.map((course, index) => (
        <Link
          key={index}
          href={`/courses/${course.slug}`}
          onClick={(e) => handleRegisterCourse(e, course)}
        >
          <div className="item_course bg-[#1A1F2B] rounded-t-[10px] rounded-b-[10px] hover:translate-y-[-10px] transition-all duration-300">
            <div className="img_course ">
              <img
                src={course.thumbnail}
                alt=""
                className="w-[100%] h-[100%] rounded-t-[10px] object-cover "
              />
            </div>
            <div className="content_course p-[25px]">
              <h1 className="text-[20px] font-bold text-white mb-[10px] line-clamp-2 overflow-hidden text-ellipsis">
                {course.title}
              </h1>
              <div className="author flex items-center justify-between relative">
                <div>
                  <img
                    src={course.image_author}
                    alt=""
                    className="author_img rounded-full w-[30px] h-[30px] inline-block mr-[10px]"
                  />
                  <span>
                    <strong className="text-white absolute">
                      {course.author}
                    </strong>
                  </span>
                </div>
                <i className="text-[#E5E4E4] text-[14px] absolute top-[40%] right-0 translate-y-[-50%]">
                  {course.badge}
                </i>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ItemProduct;
