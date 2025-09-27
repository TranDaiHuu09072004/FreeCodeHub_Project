/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "files.fullstack.edu.vn",
      "yt3.ggpht.com",
      "avatars.githubusercontent.com",
      "github.com",
      "placehold.co",
      "https://freecodehub-project.onrender.com",
    ],
  }, // 👈 THÊM DÒNG NÀY
};

export default nextConfig;
