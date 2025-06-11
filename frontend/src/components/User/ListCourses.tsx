"use client";
import Button from "@/components/User/Button";
import { Course } from "./ItemProduct";
import axios from "@/app/utils/axiosInstance";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/Context/AuthContext";
import { useRouter } from "next/navigation";

interface ListCoursesProps {
  courses?: Course[]; // Optional prop to pass search results
}

const ListCourses = ({ courses }: ListCoursesProps) => {
  const { user } = useAuth();
  const [listcourses, setListCourses] = useState<Course[]>([]);
  const router = useRouter();

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
          console.log("userRes.data:", userRes.data);
          console.log(
            "userRes.data.registerCourses:",
            userRes.data?.registerCourses
          );

          let registeredCoursesSlugs: string[] = [];
          if (userRes.data && Array.isArray(userRes.data.registerCourses)) {
            registeredCoursesSlugs = userRes.data.registerCourses;
          }
          console.log(
            "registeredCoursesSlugs before filter:",
            registeredCoursesSlugs
          );

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

  return (
    <>
      {listcourses.map((listcourse, index) => (
        <div
          key={index}
          className="items_course bg-[#141625] p-[16px] rounded-[10px] flex items-center justify-between mb-[20px]"
        >
          <div className="content_course flex">
            <img
              src={listcourse.thumbnail}
              alt=""
              className="w-[94px] h-auto rounded-[5px]"
            />
            <div className="name_course ml-[20px]">
              <h3 className="text-[#E5E4E4] text-[18px] max-sm:text-[15px] max-w-[160px] truncate">
                {listcourse.title}
              </h3>
              <p>
                <i className="text-[#9D9DA3] max-sm:text-[14px]">
                  {listcourse.slogan}
                </i>
              </p>
            </div>
          </div>
          <div className="author max-lg:hidden">
            <h5 className="text-white">
              <i className="fa-solid fa-user"></i> Tác giả
            </h5>
            <p className="text-[#9D9DA3]">
              <i> {listcourse.author}</i>
            </p>
          </div>
          <div className="slogan max-lg:hidden">
            <i className="text-[#9D9DA3]">{listcourse.badge}</i>
          </div>
          <div className="icon_arrow-right min-sm:hidden">
            <Link href={`/courses/${listcourse.slug}`}>
              {" "}
              <i className="fa-solid fa-arrow-right text-white text-[18px]"></i>
            </Link>
          </div>
          <div className="max-sm:hidden">
            <Button
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer "
              children="Học ngay"
              onClick={() => {
                if (
                  user &&
                  user.registeredCourses &&
                  user.registeredCourses.includes(listcourse.slug)
                ) {
                  router.push(`/lesson/${listcourse.slug}`);
                } else {
                  router.push(`/courses/${listcourse.slug}`);
                }
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCourses;
