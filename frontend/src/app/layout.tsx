"use client";
import "./globals.css";
// import { ThemeProvider } from "next-themes";
import ShowSideBarMenu from "@/app/components/User/ShowSideBarMenu";
import SidebarUser from "@/app/components/Sidebar/SideBarUser";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <title>FreeCodeHub - Học lập trình miễn phí</title>
        <link rel="icon" href="assets/img/iconx_logo.png" type="image/x-icon" />
      </head>
      <body className="bg-[#121826]">
        <div className="wrapper_app xl:flex">
          <SidebarUser />
          <ShowSideBarMenu />
          <main className="2xl:ml-[287px] min-[1366px]:w-[75%] min-[1366px]:ml-[20%] max-sm:overflow-x-hidden max-sm:ml-0 2xl:flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
