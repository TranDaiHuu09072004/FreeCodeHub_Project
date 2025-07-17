"use client";
import "../globals.css";
import { AuthProvider } from "@/app/Context/AuthContext";
import SidebarAdmin from "@/components/Sidebar/SideBarAdmin";
// import Head from "next/head";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="icon"
          href="/assets/img/iconx_logo.png"
          type="image/x-icon"
        />
      </head>
      <body className="!bg-[#121826]">
        <AuthProvider>
          <div className="wrapper_app xl:flex">
            <SidebarAdmin />
            <main className="xl:ml-[287px] min-[1366px]:w-[75%] min-[1366px]:ml-[20%] max-sm:overflow-x-hidden max-sm:ml-0 2xl:flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
