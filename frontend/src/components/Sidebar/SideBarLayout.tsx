"use client";
import { useAuth } from "@/app/Context/AuthContext";
import SidebarUser from "@/components/Sidebar/SideBarUser";
import SidebarAdmin from "@/components/Sidebar/SideBarAdmin";
import SidebarAuthor from "@/components/Sidebar/SidebarAuthor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SidebarLayout = ({ className = "" }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) {
    // Có thể return null hoặc một spinner/loading nếu muốn
    return null;
  }

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
