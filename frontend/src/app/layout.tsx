import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";
import Sidebar from "./layout/Sidebar";
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
        <div className="wrapper_app flex">
          <ThemeProvider>
            <Sidebar />
            <main className="ml-[287px] flex-1">{children}</main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
