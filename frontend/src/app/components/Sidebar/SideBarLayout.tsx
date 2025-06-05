"use client";
import { useAuth } from "@/app/Context/AuthContext";
import SidebarUser from "@/app/components/Sidebar/SideBarUser";
import SidebarAdmin from "@/app/components/Sidebar/SideBarAdmin";
import SidebarAuthor from "@/app/components/Sidebar/SidebarAuthor";

const SidebarLayout = ({ className = "" }) => {
  const { user } = useAuth();

  if (!user) {
    return <SidebarUser className={className} />;
  }

  switch (user.role) {
    case "admin":
      return <SidebarAdmin className={className} />;
    case "author":
      return <SidebarAuthor className={className} />;
    default:
      return <SidebarUser className={className} />;
  }
};

export default SidebarLayout;
