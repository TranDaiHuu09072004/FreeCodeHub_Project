/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  images: {
    domains: ["localhost", "files.fullstack.edu.vn"],
  }, // 👈 THÊM DÒNG NÀY
};

export default nextConfig;
