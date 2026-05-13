import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/Context/AuthContext";

export const metadata:Metadata = {
  title: "FreeCodeHub - Học lập trình miễn phí",
  description: "Khám phá kho tàng kiến thức lập trình"
}

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
        <link
          rel="icon"
          href="/assets/img/iconx_logo.png"
          type="image/x-icon"
        />
      </head>
      <body className="!bg-[#121826]">
        <AuthProvider>
          <div className="">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
