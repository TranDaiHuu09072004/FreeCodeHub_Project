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
      "freecodehub-project.onrender.com",
      "res.cloudinary.com"
    ],
  }, 
};

export default nextConfig;
