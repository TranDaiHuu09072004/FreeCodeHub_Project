import DetailBlog from "./DetailBlogClient";

async function getBlogDetail(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/blogs/${slug}`, {
      next: { revalidate: 10, tags: ["blogs", `blog-${slug}`] },
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
      next: { revalidate: 10 },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogDetail(slug);
  if (!blog) return { title: "Không tìm thấy bài viết | FreeCodeHub" };
  const pageUrl = `/blogs/${slug}`;
  const ogImage =
    blog.thumbnail ||
    "https://free-code-hub-project.vercel.app/assets/img/banner_detail-blog.jpg";
  return {
    title: `${blog.title} | FreeCodeHub`,
    description:
      blog.excerpt ||
      blog.description ||
      "Đọc bài viết chia sẻ kiến thức lập trình tại FreeCodeHub",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerp || blog.description,
      url: pageUrl,
      sitemap: "FreeCodeHub",
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.author || "FreeCodeHub"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    facebook: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt || blog.description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [blog, relatedBlogs] = await Promise.all([
    getBlogDetail(slug),
    getRelatedBlogs(slug),
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
