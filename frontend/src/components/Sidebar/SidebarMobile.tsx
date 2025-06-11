"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const baseClientMenu = [
  { href: "/", icon: "fa-solid fa-house", label: "Trang Chủ" },
  { href: "/courses", icon: "fa-solid fa-graduation-cap", label: "Khóa học" },
  { href: "/blog", icon: "fa-solid fa-note-sticky", label: "Blog" },
  { href: "/about-us", icon: "fa-solid fa-user", label: "Về Chúng Tôi" },
];

const baseAdminMenu = [
  {
    href: "/admin/dashboard",
    icon: "fa-solid fa-border-all",
    label: "Dashboard",
  },
  {
    href: "/admin/blog",
    icon: "fa-solid fa-file",
    label: "Quản lý blog",
  },
  {
    href: "/admin/user",
    icon: "fa-solid fa-users",
    label: "Quản lý người dùng",
  },
  {
    href: "/admin/categories",
    icon: "fa-solid fa-layer-group",
    label: "Quản lý danh mục",
  },
  {
    href: "/admin/author",
    icon: "fa-solid fa-pen-nib",
    label: "Quản lý tác giả",
  },
  {
    href: "/admin/course",
    icon: "fa-solid fa-book-open",
    label: "Quản lý khóa học",
  },
];

const SidebarMobile = ({ className = "", type = "client" }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const baseMenu = type === "admin" ? baseAdminMenu : baseClientMenu;

  const menuItems = [...baseMenu];

  if (user) {
    menuItems.push({
      href: "/setting",
      icon: "fa-solid fa-gear",
      label: "Cài đặt",
    });
  } else if (type === "client") {
    menuItems.push({
      href: "/login",
      icon: "fa-solid fa-right-to-bracket",
      label: "Đăng nhập",
    });
  }

  return (
    <div
      className={`h-screen bg-[#1a1f2b] fixed top-0 left-0 z-50 backdrop-blur-md border-r border-white/10 max-[1364px]:block min-[1365px]:hidden ${className}`}
    >
      <div className="header_logo relative pb-[2px] text-center">
        <h1 className="text-3xl max-sm:text-[20px] max-sm:pr-[10px] xl:mx-[20px] font-bold bg-gradient-to-r from-[#eaafc8] to-[#654ea3] text-transparent bg-clip-text drop-shadow leading-[60px] after:content-[''] max-sm:after:w-full after:absolute after:left-[-20px] max-sm:after:left-0 after:right-[-20px] max-sm:after:right-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-b after:from-[#eaafc8] after:to-[#654ea3]">
          <Link href="/">FreeCodeHub</Link>
        </h1>
      </div>
      <div className="flex-grow overflow-y-auto pb-[280px]">
        <ul className="list_sidebar mt-[20px] text-white px-[30px]">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`xl:py-2 xl:px-4 max-xl:py-2 max-xl:px-1 rounded-[3px] mb-[10px] transition-all duration-300 ${
                (
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                )
                  ? "bg-gradient-to-r from-[#eaafc8] to-[#654ea3]"
                  : ""
              }`}
            >
              <Link
                href={item.href}
                className="flex items-center max-sm:text-[15px]"
              >
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
              <div className="w-10 h-10 max-sm:hidden bg-[#654ea3] rounded-full flex items-center justify-center">
                <span className="text-white text-xl">{user.name[0]}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">
                  {user.name}
                </span>
                <span className="text-gray-400 text-xs max-sm:text-[11px]">
                  {user.email}
                </span>
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

export default SidebarMobile;
