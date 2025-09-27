// User
export interface User {
  _id: string;
  name: string;
  role: string;
  createdAt: string;
  registeredCourses?: string[]; // Danh sách slug của course
}

// Course
export interface Course {
  _id: string;
  title: string;
  slug: string;
}

// Lesson
export interface Lesson {
  _id: string;
  courseId: string;
}

// Blog
export interface Blog {
  _id: string;
  title: string;
  slug: string;
}
