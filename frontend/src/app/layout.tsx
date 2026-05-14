import { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/app/Context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://free-code-hub-project.vercel.app"),
  title: {
    default: "FreeCodeHub - Học lập trình miễn phí",
    template: "%s | FreeCodeHub",
  },
  description:
    "Nền tảng tổng hợp khóa học lập trình miễn phí chất lượng cao được sưu tầm từ các kênh Youtube hàng đầu Việt Nam",
  keywords: [
    "học lập trình",
    "học lập trình miễn phí",
    "lộ trình học lập trình miễn phí",
    "khóa học miễn phí",
    "khóa học backend",
    "khóa học frontend",
    "khóa học reactjs",
    "khóa học nextjs",
    "khóa học java",
    "khóa học nodejs & expressjs",
    "Học lập trình cùng FreeCodeHub",
  ],
  authors: [
    { name: "Hữu Dev", url: "https://free-code-hub-project.vercel.app" },
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "FreeCodeHub",
    title: "FreeCodeHub - Học lập trình miễn phí",
    description:
      "Khám phá kho tàng kiến thức lập trình web từ các kênh Youtube hàng đầu Việt Nam",
    images: [
      {
        url: "https://free-code-hub-project.vercel.app/assets/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Học lập trình cùng FreeCodeHub",
      },
    ],
    phoneNumbers: "0392706753",
    emails: "trandaihuu4766@gmail.com",
    countryName: "Việt Nam",
  },
  alternates: {
    canonical: `https://free-code-hub-project.vercel.app`,
  },
  robots: { index: true, follow: true },
};

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
