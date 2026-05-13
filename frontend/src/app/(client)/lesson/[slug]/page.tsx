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
