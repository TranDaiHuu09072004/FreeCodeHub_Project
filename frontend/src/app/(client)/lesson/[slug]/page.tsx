import LearningClient from "./LearningClient";

async function getLessonData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/courses/${slug}/lessons`, {
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lessonCourses = await getLessonData(slug);
  // Thường thì trang này dùng slug của khóa học, nên ta lấy thông tin khóa học/bài học đầu tiên
  const firstLesson = lessonCourses[0];
  if (!firstLesson)
    return { title: "Không tìm thấy nội dung học tập | FreeCodeHub" };
  const pageUrl = `/lesson/${slug}`; // Phải khớp với thư mục /lesson/[slug]
  const ogImage = "/assets/img/banner_learning.jpg"; // Nên có một ảnh đại diện chung cho trang học tập
  return {
    title: `${firstLesson.title} | FreeCodeHub`,
    description: `Tham gia khóa học và học bài: ${firstLesson.title}. Nền tảng học lập trình miễn phí chất lượng cao.`,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: firstLesson.title,
      description: `Học lập trình online: ${firstLesson.title}`,
      url: pageUrl,
      siteName: "FreeCodeHub",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
    },
    // Lưu ý: Next.js dùng 'twitter' thay vì 'facebook' cho thẻ card
    twitter: {
      card: "summary_large_image",
      title: firstLesson.title,
      description: firstLesson.description,
      images: [ogImage],
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lessons = await getLessonData(slug);

  if (!lessons) {
    return <div className="text-white p-10">Không tìm thấy bài học nào.</div>;
  }

  return <LearningClient allLessons={lessons} />;
}
