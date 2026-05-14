"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import Image from "next/image"; // Thêm import Image

// --- DATA MENU (Giữ nguyên) ---
const baseClientMenu = [
  { href: "/", icon: "fa-solid fa-house", label: "Trang Chủ" },
  { href: "/courses", icon: "fa-solid fa-graduation-cap", label: "Khóa học" },
  { href: "/blogs", icon: "fa-solid fa-note-sticky", label: "Blog" },
  { href: "/about-us", icon: "fa-solid fa-user", label: "Về Chúng Tôi" },
];

const baseAdminMenu = [
  { href: "/dashboard", icon: "fa-solid fa-border-all", label: "Dashboard" },
  {
    href: "/dashboard/blog",
    icon: "fa-solid fa-file",
    label: "Quản lý bài viết",
  },
  {
    href: "/dashboard/users",
    icon: "fa-solid fa-users",
    label: "Quản lý người dùng",
  },
  {
    href: "/dashboard/categories",
    icon: "fa-solid fa-layer-group",
    label: "Quản lý danh mục",
  },
  {
    href: "/dashboard/author",
    icon: "fa-solid fa-pen-nib",
    label: "Quản lý tác giả",
  },
  {
    href: "/dashboard/course",
    icon: "fa-solid fa-book-open",
    label: "Quản lý khóa học",
  },
];

const baseAuthorMenu = [
  {
    href: "/dashboard/course",
    icon: "fa-solid fa-book-open",
    label: "Khóa học của tôi",
  },
  {
    href: "/dashboard/blog",
    icon: "fa-solid fa-file",
    label: "Bài viết của tôi",
  },
];

const SidebarMobile = ({ className = "" }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Logic chọn menu
  let baseMenu = baseClientMenu;
  if (user?.role === "admin") baseMenu = baseAdminMenu;
  else if (user?.role === "author") baseMenu = baseAuthorMenu;

  const menuItems = [...baseMenu];

  if (user) {
    menuItems.push({
      href:
        user.role === "admin" || user.role === "author"
          ? "/dashboard/settings"
          : "/setting",
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
        fixed top-0 left-0 z-[999]
        h-[100dvh] w-[85vw] max-w-[250px]
        bg-[#1a1f2b]/95 backdrop-blur-xl border-r border-white/10 shadow-2xl flex flex-col min-[1365px]:hidden${className}
      `}
    >
      {/* --- PHẦN 1: HEADER (Cố định chiều cao) --- */}
      <div className="shrink-0 flex items-center justify-center h-[80px] border-b border-white/5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text drop-shadow-sm">
          <Link href="/">FreeCodeHub</Link>
        </h1>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-[230px]">
        <ul className="px-5 space-y-2">
          {" "}
          {/* Xóa py-6 ở đây */}
          {menuItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-white shadow-lg shadow-purple-500/20 font-semibold"
                        : "text-gray-300 hover:bg-white/5 hover:text-white font-medium"
                    }
                  `}
                >
                  {/* Icon kích thước cố định để không bị méo */}
                  <div className="w-[24px] flex justify-center shrink-0">
                    <i className={`${item.icon} text-[18px]`}></i>
                  </div>
                  {/* Text tự động xuống dòng nếu quá dài (nhưng thường menu ngắn) */}
                  <span className="text-[15px] truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* --- PHẦN 3: USER FOOTER (Luôn ghim đáy) --- */}
      {/* Vì div ở trên dùng flex-1 + min-h-0 nên phần này tự động bị đẩy xuống đáy */}
      {user && (
        <div className="shrink-0 p-5 border-t border-white/10 bg-[#151923]">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
            {/* Avatar */}
            <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-[#654ea3] to-[#eaafc8] flex items-center justify-center text-white font-bold shadow-inner overflow-hidden">
              {/* Sửa lại logic hiển thị avatar */}
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                // Chỉ hiển thị chữ cái đầu nếu KHÔNG CÓ avatar
                user.name[0].toUpperCase()
              )}
            </div>

            {/* Info (Truncate để tên dài không phá layout) */}
            <div className="flex flex-col flex-1 overflow-hidden">
              <span className="text-white text-sm font-bold truncate">
                {user.name}
              </span>
              <span className="text-gray-400 text-xs truncate">
                {user.email}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
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

export default SidebarMobile;
