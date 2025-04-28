"use client";
import { usePathname } from "next/navigation";
import SidebarUser from "../components/Sidebar/SideBarUser";
import SidebarAdmin from "../components/Sidebar/SideBarAdmin";

export default function Sidebar() {
  const pathname = usePathname();

  // Các route bắt đầu bằng các tiền tố này sẽ là admin
  const adminPrefixes = [
    "/dashboard",
    "/blog-management",
    "/user-management",
    "/category-management",
    "/author-management",
    "/courses-management",
    "/setting",
  ];

  // Kiểm tra nếu pathname bắt đầu bằng bất kỳ prefix nào ở trên
  const isAdmin = adminPrefixes.some((prefix) => pathname.startsWith(prefix));

  return isAdmin ? <SidebarAdmin /> : <SidebarUser />;
}
