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
