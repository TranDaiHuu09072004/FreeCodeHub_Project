import { Metadata } from "next";
import CoursesClientPage from "./CoursesClient";

async function getCoursesData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = { next: { revalidate: 10, tags: ["courses"] } };

  try {
    const [coursesRes, authorRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/courses`, fetchOptions),
      fetch(`${baseUrl}/authors`, fetchOptions),
      fetch(`${baseUrl}/categories`, fetchOptions),
    ]);

    return {
      courses: coursesRes.ok ? await coursesRes.json() : [],
      author: authorRes.ok ? await authorRes.json() : [],
      categories: categoriesRes.ok ? await categoriesRes.json() : [],
    };
  } catch {
    return { courses: [], author: [], categories: [] };
  }
}

export const metadata: Metadata = {
  title: "Tất cả khóa học lập trình miễn phí | FreeCodeHub",
  description:
    "Khám phá kho tàng khóa học lập trình miễn phí chất lượng cao. Học ReactJS, Next.js, Node.js và nhiều công nghệ khác với lộ trình bài bản.",
  openGraph: {
    title: "Tất cả khóa học lập trình miễn phí | FreeCodeHub",
    description:
      "Khám phá kho tàng khóa học lập trình miễn phí chất lượng cao.",
    images: ["/assets/img/banner_course.jpg"],
  },
};

export default async function CoursesPage() {
  const { courses, author, categories } = await getCoursesData();
  return (
    <CoursesClientPage
      initialCourses={courses}
      initialAuthor={author}
      initialCategories={categories}
    />
  );
}
