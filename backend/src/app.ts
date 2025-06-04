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
app.use(cors());
app.use(express.json());

app.use("/api/auth", courseRoutes);
app.use("/api/auth", blogRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/auth", CategoriesRoutes);
app.use("/api/auth", AuthorRoutes);
app.use("/api/auth", LessonRoutes);
app.use("/api/auth", authRoutes);

export default app;
