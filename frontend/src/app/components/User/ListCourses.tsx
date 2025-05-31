"use client";
import Button from "@/app/components/User/Button";
import { Course } from "@/app/components/User/ItemProduct";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
const ListCourses = () => {
  const [listcourses, setListCourses] = useState<Course[]>([]);
  const URL_API_COURSES = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    axios
      .get(`${URL_API_COURSES}/courses`)
      .then((res) => setListCourses(res.data))
      .catch((err) => console.log("Fetch Data Fail", err));
  }, []);
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
              <h3 className="text-[#E5E4E4] text-[18px] max-sm:text-[15px]">
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
            <Link href="/detail-course">
              {" "}
              <i className="fa-solid fa-arrow-right text-white text-[18px]"></i>
            </Link>
          </div>
          <div className="max-sm:hidden">
            {" "}
            <Button
              className="text-white bg-gradient-to-r from-[#eaafc8] to-[#654ea3] py-[10px] px-[30px] rounded-[5px] cursor-pointer "
              children="Học ngay"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCourses;
