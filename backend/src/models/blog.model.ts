import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    category: { type: String },
    thumbnail: { type: String, require: true },
    author: { type: String, require: true },
    date: { type: String },
    status: { type: String, enum: ["Đã đăng", "Nháp"], default: "Nháp" },
    excerpt: { type: String },
    tags: { type: String },
    isFeatured: { type: Boolean },
    slug: { type: String },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
