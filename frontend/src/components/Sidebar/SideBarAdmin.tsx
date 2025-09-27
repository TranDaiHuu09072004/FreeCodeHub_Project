"use client";
import { useAuth } from "@/app/Context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = ({ className = "" }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const baseMenuAdmin = React.useMemo(
    () => [
      {
        href: "/dashboard/courses",
        icon: "fa-solid fa-book-open",
        label: "Quản lý khóa học",
      },
      {
        href: "/dashboard/blogs",
        icon: "fa-solid fa-file",
        label: "Quản lý bài viết",
      },
      {
        href: "/dashboard/users",
        icon: "fa-solid fa-users",
        label: "Quản lý người dùng",
      },
      {
        href: "/dashboard/comments",
        icon: "fa-solid fa-comments",
        label: "Quản lý bình luận",
      },
      {
        href: "/dashboard/categories",
        icon: "fa-solid fa-layer-group",
        label: "Quản lý danh mục",
      },
      {
        href: "/dashboard/authors",
        icon: "fa-solid fa-pen-nib",
        label: "Quản lý tác giả",
      },
    ],
    []
  );

  const baseMenuAuthor = React.useMemo(
    () => [
      {
        href: "/dashboard/courses",
        icon: "fa-solid fa-book-open",
        label: "Quản lý khóa học",
      },
      {
        href: "/dashboard/blogs",
        icon: "fa-solid fa-file",
        label: "Quản lý bài viết",
      },
    ],
    []
  );

  const menuItems = React.useMemo(() => {
    if (!user) {
      return [
        {
          href: "/admin/login",
          icon: "fa-solid fa-right-to-bracket",
          label: "Đăng nhập",
        },
      ];
    }

    const common = [
      {
        href: "/dashboard/setting",
        icon: "fa-solid fa-gear",
        label: "Cài đặt",
      },
    ];

    if (user.role === "admin") return [...baseMenuAdmin, ...common];
    if (user.role === "author") return [...baseMenuAuthor, ...common];
    return common;
  }, [user, baseMenuAdmin, baseMenuAuthor]);

  return (
    <div
      className={`w-[287px] min-[1368px]:block max-[1368px]:hidden h-screen bg-[#1a1f2b] fixed top-0 left-0 z-50 backdrop-blur-md border-r border-white/10 ${className}`}
    >
      <div className="header_logo relative pb-[2px] text-center">
        <h1 className="text-[25px] mx-[20px] font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text drop-shadow leading-[60px] after:content-[''] after:absolute after:left-[-20px] after:right-[-20px] after:bottom-0 after:h-[2px] after:bg-gradient-to-b after:from-[#eaafc8] after:to-[#654ea3]">
          <Link href="/dashboard">Admin Dashboard</Link>
        </h1>
      </div>

      <div className="flex-grow overflow-y-auto pb-[230px]">
        <ul className="list_sidebar mt-[20px] text-white px-[30px]">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`py-2 px-4 rounded-[3px] mb-[10px] transition-all duration-300 ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3]"
                  : ""
              }`}
            >
              <Link href={item.href} className="flex items-center">
                <i
                  className={item.icon}
                  style={{
                    fontSize: "18px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                ></i>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#654ea3] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{user.name[0]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">
                  {user.name}
                </span>
                <span className="text-gray-400 text-xs">{user.email}</span>
              </div>
            </div>
            <button
              onClick={logout}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
