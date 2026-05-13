import HomeClient from "./HomeClient";

async function getPublicData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = { next: { revalidate: 60 } };
  try {
    const [featuredRes, coursesRes] = await Promise.all([
      fetch(`${baseUrl}/courses/featured`, fetchOptions),
      fetch(`${baseUrl}/courses`, fetchOptions),
    ]);
    const featuredCourses = featuredRes.ok ? await featuredRes.json() : [];
    const courses = coursesRes.ok ? await coursesRes.json() : [];

    return { featuredCourses, courses };
  } catch {
    return { featuredCourses: [], courses: [] };
  }
}

export default async function Home() {
  const { featuredCourses, courses } = await getPublicData();
  return (
    <HomeClient
      initialFeaturedCourses={featuredCourses}
      initialCourses={courses}
    />
  );
}
