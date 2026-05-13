import DetailBlog from "./DetailBlogClient";

async function getBlogDetail(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getRelatedBlogs(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/blogs/${slug}/related`, {
      next: { revalidate: 3600 },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogDetail(params.slug);
  if (!blog) return { title: "Không tìm thấy khóa học" };
  return {
    title: `${blog.title} | FreeCodeHub`,
    description: blog.description || "Khóa học miễn phí tại FreeCodeHub",
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.thumbnail || "/assets/img/banner_detail-blog.png"],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [blog, relatedBlogs] = await Promise.all([
    getBlogDetail(params.slug),
    getRelatedBlogs(params.slug),
  ]);
  if (!blog) {
    return (
      <div className="text-white text-center mt-20">
        Bài viết không tồn tại!
      </div>
    );
  }

  return <DetailBlog initialBlog={blog} initialRelatedBlogs={relatedBlogs} />;
}
