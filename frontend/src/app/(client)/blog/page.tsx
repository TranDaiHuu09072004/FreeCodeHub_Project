import BlogClient from "./BlogClient";

async function getBlogData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    next: { revalidate: 3600 },
  };
  try {
    const [blogRes, featuredBlogRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/blogs`, fetchOptions),
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
