// app/admin/layout.tsx
"use client";

import { AuthProvider } from "@/app/Context/AuthContext";
import SidebarAdmin from "@/components/Sidebar/SideBarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="wrapper_app xl:flex">
        <SidebarAdmin />
        <main className="xl:ml-[287px] min-[1366px]:w-[75%] min-[1366px]:ml-[20%] max-sm:overflow-x-hidden max-sm:ml-0 2xl:flex-1">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
