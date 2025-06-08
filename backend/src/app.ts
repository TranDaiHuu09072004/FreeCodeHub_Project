import express from "express";
import cors from "cors";

const app = express();
import courseRoutes from "./routes/course.routes";
import blogRoutes from "./routes/blog.routes";
import CategoriesRoutes from "./routes/category.routes";
import UserRoutes from "./routes/user.routes";
import AuthorRoutes from "./routes/author.routes";
import LessonRoutes from "./routes/lesson.routes";
import authRoutes from "./routes/auth.routes";
import path from "path";
app.use(
  cors({
    origin: "http://localhost:3000", // frontend đang chạy ở đây
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // nếu có sử dụng cookie / token
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use("/api/auth", courseRoutes);
app.use("/api/auth", blogRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/auth", CategoriesRoutes);
app.use("/api/auth", AuthorRoutes);
app.use("/api/auth", LessonRoutes);
app.use("/api/auth", authRoutes); // Để /forgot-password hoạt động đúng

export default app;
