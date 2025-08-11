"use client";
import DashboardStatsCard from "@/components/Admin/chart/DashboardStatsCard";
import UserActivityChart from "@/components/Admin/chart/UserActivityChart";
import React, { useState, useRef, useEffect } from "react";
import {
  userActivityData,
  coursePerformanceData,
  userDistributionData,
  COLORS,
} from "@/app/data/dashboardData";
import UserDistributionChart from "@/components/Admin/chart/UserDistributionChart";
import CoursePerformanceChart from "@/components/Admin/chart/CoursePerformanceChart";
import Button from "@/components/User/Button";
import { useAuth } from "@/app/Context/AuthContext";
import axios from "@/app/utils/axiosInstance";

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();

  // Dynamic counts
  const [usersCount, setUsersCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [lessonsCount, setLessonsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);

  // Dynamic chart data
  const [userActivity, setUserActivity] = useState(userActivityData);
  const [coursePerformance, setCoursePerformance] = useState(
    coursePerformanceData
  );
  const [userDistribution, setUserDistribution] = useState(
    userDistributionData
  );

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

  useEffect(() => {
    const fetchCountsAndCharts = async () => {
      try {
        const [usersRes, coursesRes, lessonsRes, blogsRes] = await Promise.all([
          axios.get("/users"),
          axios.get("/courses"),
          axios.get("/lessons"),
          axios.get("/blogs"),
        ]);

        const users: any[] = Array.isArray(usersRes.data) ? usersRes.data : [];
        const courses: any[] = Array.isArray(coursesRes.data)
          ? coursesRes.data
          : [];
        const lessons: any[] = Array.isArray(lessonsRes.data)
          ? lessonsRes.data
          : [];

        // Counts
        setUsersCount(users.length);
        setCoursesCount(courses.length);
        setLessonsCount(lessons.length);
        setBlogsCount(Array.isArray(blogsRes.data) ? blogsRes.data.length : 0);

        // User Activity by month (current year)
        const currentYear = new Date().getFullYear();
        const monthlyActivity = Array.from({ length: 12 }, (_, i) => {
          const count = users.filter((u) => {
            const created = new Date(u.createdAt);
            return (
              !isNaN(created.getTime()) &&
              created.getFullYear() === currentYear &&
              created.getMonth() === i
            );
          }).length;
          return { name: `T${i + 1}`, users: count };
        });
        setUserActivity(monthlyActivity);

        // Course Performance: registrations (views) + lessons count (completions)
        const registrationsBySlug: Record<string, number> = {};
        for (const u of users) {
          const regs: string[] = u?.registeredCourses ?? [];
          for (const slug of regs) {
            registrationsBySlug[slug] = (registrationsBySlug[slug] || 0) + 1;
          }
        }

        const lessonsByCourseId: Record<string, number> = {};
        for (const l of lessons) {
          const cid = l?.courseId?.toString?.() ?? String(l?.courseId ?? "");
          if (!cid) continue;
          lessonsByCourseId[cid] = (lessonsByCourseId[cid] || 0) + 1;
        }

        const performance = courses
          .map((c) => ({
            name: c.title as string,
            views: registrationsBySlug[c.slug] ?? 0,
            completions: lessonsByCourseId[c._id] ?? 0,
          }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);

        setCoursePerformance(performance);

        // User Distribution by role (as percentage)
        const roleCounts = users.reduce((acc: Record<string, number>, u) => {
          const role = u.role || "client";
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {});
        const totalUsers = users.length || 1;
        const distribution = Object.entries(roleCounts).map(([name, value]) => ({
          name,
          value: Math.round((value * 100) / totalUsers),
        }));
        setUserDistribution(distribution);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchCountsAndCharts();
  }, []);

  const statsCards = [
    {
      title: "Tổng người dùng",
      value: usersCount.toLocaleString(),
      icon: "fa-solid fa-users text-white text-[20px]",
      change: "+12%",
      color: "#7c3aed1a",
    },
    {
      title: "Khóa học",
      value: coursesCount.toLocaleString(),
      icon: "fa-solid fa-book-open text-white text-[20px]",
      change: "+3",
      color: "#7c3aed1a",
    },
    {
      title: "Tổng video",
      value: lessonsCount.toLocaleString(),
      icon: "fa-solid fa-video text-white text-[20px]",
      change: "+24",
      color: "#7c3aed1a",
    },
    {
      title: "Bài viết blog",
      value: blogsCount.toLocaleString(),
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
            <i className="fa-regular fa-bell text-white text-[13px] top-[40%] left-[35%] absolute"></i>
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
                  <Button onClick={logout}>
                    {" "}
                    <i className="fa-solid fa-right-from-bracket text-[14px]"></i>
                    <span className="material-icons text-[14px]">
                      {" "}
                      Đăng xuất
                    </span>{" "}
                  </Button>
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
        <UserActivityChart data={userActivity} />
        <UserDistributionChart data={userDistribution} colors={COLORS} />
      </div>

      <div className="grid grid-cols-1 my-[30px]">
        <CoursePerformanceChart data={coursePerformance} />
      </div>
    </div>
  );
};

export default Dashboard;
