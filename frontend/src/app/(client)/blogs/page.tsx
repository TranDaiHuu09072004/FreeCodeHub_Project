import { Metadata } from "next";
import BlogClient from "./BlogClient";

async function getBlogData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    next: { revalidate: 10, tags: ["blogs"] },
  };
  try {
    const [blogRes, featuredBlogRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/blogs?t=${Date.now()}`, fetchOptions),
      fetch(`${baseUrl}/blogs/featured`, fetchOptions),
      fetch(`${baseUrl}/categories`, fetchOptions),
    ]);
    return {
      blog: blogRes.ok ? await blogRes.json() : [],
      featured: featuredBlogRes.ok ? await featuredBlogRes.json() : [],
      categories: categoriesRes.ok ? await categoriesRes.json() : [],
    };
  } catch {
    return { blog: [], featured: [], categories: [] };
  }
}

export const metadata: Metadata = {
  title: "Bài viết chia sẻ kiến thức & kinh nghiệm lập trình | FreeCodeHub",
  description:
    "Đọc các bài viết mới nhất về kinh nghiệm học lập trình, mẹo code hiệu quả và cập nhật xu hướng công nghệ cùng FreeCodeHub.",
  openGraph: {
    title: "Bài viết chia sẻ kiến thức & kinh nghiệm lập trình | FreeCodeHub",
    description: "Cập nhật kiến thức lập trình mới nhất mỗi ngày.",
    images: ["/assets/img/banner_blog.jpg"],
  },
};

export default async function BlogPage() {
  const { blog, featured, categories } = await getBlogData();
  return (
    <BlogClient
      initialBlog={blog}
      initialFeaturedBlog={Array.isArray(featured) ? featured[0] : null}
      initialCategories={categories}
    />
  );
}
