"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import Image from "next/image";

const baseListMenu = [
  { href: "/", icon: "fa-solid fa-house", label: "Trang Chủ" },
  { href: "/courses", icon: "fa-solid fa-graduation-cap", label: "Khóa học" },
  { href: "/blog", icon: "fa-solid fa-note-sticky", label: "Bài viết" },
  { href: "/about-us", icon: "fa-solid fa-user", label: "Về Chúng Tôi" },
];

const SidebarUser = ({ className = "" }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Logic tạo menu giữ nguyên
  const menuItems = [...baseListMenu];
  if (user) {
    menuItems.push({
      href: "/setting",
      icon: "fa-solid fa-gear",
      label: "Cài đặt",
    });
  } else {
    menuItems.push({
      href: "/login",
      icon: "fa-solid fa-right-to-bracket",
      label: "Đăng nhập",
    });
  }

  return (
    <aside
      className={`
        /* KÍCH THƯỚC & VỊ TRÍ CỐ ĐỊNH */
        w-[287px] h-screen fixed top-0 left-0 z-50 
        bg-[#1a1f2b] border-r border-white/10 backdrop-blur-md
        /* LOGIC RESPONSIVE (QUAN TRỌNG NHẤT) */
        hidden lg:flex flex-col
        ${className}
      `}
    >
      {/* 1. LOGO HEADER */}
      <div className="header_logo relative pb-[2px] text-center flex-shrink-0 pt-4">
        <h1 className="text-3xl mx-[20px] font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text drop-shadow leading-[60px] relative">
          <Link href="/">FreeCodeHub</Link>
          {/* Đường gạch chân gradient */}
          <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#eaafc8] to-[#654ea3]" />
        </h1>
      </div>

      {/* 2. MENU LIST (Scrollable) */}
      <div className="flex-grow overflow-y-auto mt-4 custom-scrollbar">
        <ul className="list_sidebar text-white px-[30px]">
          {menuItems.map((item, index) => {
            // Logic Active
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li
                key={index}
                className={`py-2 px-4 rounded-[6px] mb-[10px] transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white shadow-lg"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <i
                    className={`${item.icon} w-[24px] text-center text-[18px]`}
                  ></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. USER FOOTER (Luôn nằm đáy) */}
      {user && (
        <div className="p-4 border-t border-white/10 flex-shrink-0 bg-[#1a1f2b]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-[#654ea3]"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-[#654ea3] to-[#eaafc8] rounded-full flex items-center justify-center font-bold text-white shadow-inner">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <div className="flex flex-col overflow-hidden">
                <span className="text-white text-sm font-bold truncate max-w-[120px]">
                  {user.name}
                </span>
                <span className="text-gray-400 text-xs truncate max-w-[120px]">
                  {user.email}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors"
              title="Đăng xuất"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SidebarUser;
