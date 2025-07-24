// app/client/layout.tsx
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
      <div className="wrapper_app xl:flex">
        <SidebarUser />
        <ShowSideBarMenu />
        <main className="2xl:ml-[287px] min-[1366px]:w-[75%] min-[1366px]:ml-[20%] max-sm:overflow-x-hidden max-sm:ml-0 2xl:flex-1">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
