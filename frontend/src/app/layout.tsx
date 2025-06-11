"use client";
import "./globals.css";
import { AuthProvider } from "@/app/Context/AuthContext";
import ShowSideBarMenu from "@/components/User/ShowSideBarMenu";
import SidebarLayout from "@/components/Sidebar/SideBarLayout";
import Head from "@/app/head";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <Head />
      <body className="!bg-[#121826]">
        <AuthProvider>
          <div className="wrapper_app xl:flex">
            <SidebarLayout />
            <ShowSideBarMenu />
            <main className="2xl:ml-[287px] min-[1366px]:w-[75%] min-[1366px]:ml-[20%] max-sm:overflow-x-hidden max-sm:ml-0 2xl:flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
