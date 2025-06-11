"use client";
import { AuthProvider } from "@/app/Context/AuthContext";
import Head from "@/app/head";
import SidebarAdmin from "@/components/Sidebar/SideBarAdmin";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Head />
      <div className="wrapper_app xl:flex">
        <SidebarAdmin />
        <main className="max-sm:overflow-x-hidden max-sm:ml-0 2xl:flex-1">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
