import DetailCourses from "./DetailCourseClient";

async function getCoursesDetail(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}`, {
      next: { revalidate: 3600 },
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
  params: { slug: string };
}) {
  const course = await getCoursesDetail(params.slug);
  if (!course) return { title: "Không tìm thấy khóa học" };
  return {
    title: `${course.title} | FreeCodeHub`,
    description: course.description || "Khóa học miễn phí tại FreeCodeHub",
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail || "/assets/img/banner_detail-course.png"],
    },
  };
}

export default async function CoursesDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCoursesDetail(params.slug);
  if (!course) {
    return (
      <div className="text-white text-center mt-20 text-2xl font-bold">
        Khóa học không tồn tại!
      </div>
    );
  }

  return <DetailCourses initialCourse={course} slug={params.slug} />;
}
