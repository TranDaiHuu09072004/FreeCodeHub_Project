"use client";
import { AuthProvider } from "@/app/Context/AuthContext";
import SidebarUser from "@/components/Sidebar/SideBarUser";
import ShowSideBarMenu from "@/components/User/ShowSideBarMenu";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="wrapper_app min-h-screen bg-[#0f1218] relative">
        <SidebarUser />

        <div className="lg:hidden">
          <ShowSideBarMenu />
        </div>

        <main className="transition-all duration-300 w-full lg:ml-[287px] lg:w-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
