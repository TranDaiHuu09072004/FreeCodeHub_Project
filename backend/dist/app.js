import express from "express";
import cors from "cors";
const app = express();
import courseRoutes from "./routes/course.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import CategoriesRoutes from "./routes/category.routes.js";
import UserRoutes from "./routes/user.routes.js";
import AuthorRoutes from "./routes/author.routes.js";
import LessonRoutes from "./routes/lesson.routes.js";
import authRoutes from "./routes/auth.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import path from "path";
const allowedOrigins = [
    "http://localhost:3000", // FE dev
    "http://127.0.0.1:3000",
    "https://your-frontend.com", // FE production
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use("/api/auth", courseRoutes);
app.use("/api/auth", blogRoutes);
app.use("/api/auth", UserRoutes);
app.use("/api/auth", CategoriesRoutes);
app.use("/api/auth", AuthorRoutes);
app.use("/api/auth", LessonRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", uploadRoutes);
app.use("/api/auth", commentRoutes);
export default app;
