import DetailCourses from "./DetailCourseClient";

async function getCoursesDetail(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}`, {
      next: { revalidate: 10, tags: ["courses", `courses-${slug}`] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCoursesDetail(slug);
  if (!course) return { title: "Không tìm thấy khóa học" };
  const pageUrl = `/courses/${slug}`;
  const ogImage =
    course.thumbnail ||
    "https://free-code-hub-project.vercel.app/assets/img/banner_detail-course.jpg";
  return {
    title: `${course.title}`,
    description: course.description || "Khóa học miễn phí tại FreeCodeHub",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: course.title,
      description: course.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    facebook: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [ogImage],
    },
  };
}

export default async function CoursesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCoursesDetail(slug);
  if (!course) {
    return (
      <div className="text-white text-center mt-20 text-2xl font-bold">
        Khóa học không tồn tại!
      </div>
    );
  }

  return <DetailCourses initialCourse={course} slug={slug} />;
}
