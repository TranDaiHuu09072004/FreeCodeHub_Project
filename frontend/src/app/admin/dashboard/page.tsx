"use client";
import DashboardStatsCard from "@/app/components/Admin/chart/DashboardStatsCard";
import UserActivityChart from "@/app/components/Admin/chart/UserActivityChart";
import React, { useState, useRef, useEffect } from "react";
import {
  userActivityData,
  coursePerformanceData,
  userDistributionData,
  COLORS,
} from "@/app/data/dashboardData";
import UserDistributionChart from "@/app/components/Admin/chart/UserDistributionChart";
import CoursePerformanceChart from "@/app/components/Admin/chart/CoursePerformanceChart";
const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const statsCards = [
    {
      title: "Tổng người dùng",
      value: "2,419",
      icon: "fa-solid fa-users text-white text-[20px]",
      change: "+12%",
      color: "#7c3aed1a",
    },
    {
      title: "Khóa học",
      value: "48",
      icon: "fa-solid fa-book-open text-white text-[20px]",
      change: "+3",
      color: "#7c3aed1a",
    },
    {
      title: "Tổng video",
      value: "364",
      icon: "fa-solid fa-video text-white text-[20px]",
      change: "+24",
      color: "#7c3aed1a",
    },
    {
      title: "Bài viết blog",
      value: "32",
      icon: "fa-solid fa-file text-white text-[20px]",
      change: "+5",
      color: "#7c3aed1a",
    },
  ];

  return (
    <div className="lg:px-[32px] lg:pt-[32px] max-xl:pt-[32px] max-xl:px-[16px] max-sm:px-4 max-sm:pt-4">
      <section className="wellcomeback_dashboard flex justify-between">
        <div className="title_dashboard">
          <h1 className="text-white text-[25px] font-bold">Dashboard</h1>
          <span className="text-[#677d9b] text-[15px] font-[450]">
            Chào mừng trở lại, Admin
          </span>
        </div>
        <div className="infomation_account flex justify-center items-center gap-5 ">
          <div className="darkmode w-[20px] h-[20px] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </div>
          <div className="notification bg-[#020817] p-[10px] w-[40px] h-[40px] rounded-[5px] relative cursor-pointer">
            <i className="fa-regular fa-bell text-[13px] top-[40%] left-[35%] absolute"></i>
            <span className="bg-red-600 w-[20px] h-[20px] rounded-full absolute -top-1 right-0 text-center">
              3
            </span>
          </div>
          <div
            className="account_admin flex gap-[10px] bg-[#020817] py-[8px] px-[16px] rounded-[5px] relative cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
            ref={dropdownRef}
          >
            <div className="avatar">
              <img
                src="https://avatars.githubusercontent.com/u/124599?v=4"
                alt=""
                className="w-[24px] h-[24px] rounded-full"
              />
            </div>
            <div className="name_admin">
              <h3 className="text-white font-bold">Admin</h3>
            </div>
            {showDropdown && (
              <ul className="list_account w-[128px] h-auto bg-[#020817] absolute top-[110%] right-0 rounded-[8px] shadow-lg z-50 p-2 flex flex-col gap-2 animate-fade-in">
                <li className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a2233] rounded cursor-pointer text-white">
                  <i className="fa-solid fa-user text-[14px]"></i>
                  <span className="material-icons text-[14px]">Hồ sơ</span>{" "}
                </li>
                <li className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a2233] rounded cursor-pointer text-white">
                  <i className="fa-solid fa-gear text-[14px]"></i>
                  <span className="material-icons text-[14px]">
                    {" "}
                    Cài đặt
                  </span>{" "}
                </li>
                <li className="flex items-center gap-2 px-3 py-2 hover:bg-[#1a2233] rounded cursor-pointer text-white">
                  <i className="fa-solid fa-right-from-bracket text-[14px]"></i>
                  <span className="material-icons text-[14px]">
                    {" "}
                    Đăng xuất
                  </span>{" "}
                </li>
              </ul>
            )}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px] my-[30px]">
        {statsCards.map((stat, index) => (
          <DashboardStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
        <UserActivityChart data={userActivityData} />
        <UserDistributionChart data={userDistributionData} colors={COLORS} />
      </div>

      <div className="grid grid-cols-1 my-[30px]">
        <CoursePerformanceChart data={coursePerformanceData} />
      </div>
    </div>
  );
};

export default Dashboard;
