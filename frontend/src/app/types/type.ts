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
  updatedAt: string;
}

// Lesson Comment
export interface LessonComment {
  user: string;
  avatar?: string;
  content: string;
  createdAt: string;
}

// Lesson
export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  description?: string;
  videoId: string;
  videoUrl?: string;
  order?: number;
  duration?: string;
  comments?: LessonComment[];
}

// Blog
export interface Blog {
  _id: string;
  title: string;
  slug: string;
  updatedAt: string;
}

// Author
export interface Author {
  name: string;
  channel: string;
  description: string;
  avatar: string;
  numCourses: number;
  numSubscribers: number;
}

// Categories
export interface Categories {
  name: string;
  slug: string;
  description: string;
}
