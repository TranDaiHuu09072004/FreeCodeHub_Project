import mongoose from "mongoose";
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    thumbnail: { type: String, require: true },
    author: { type: String, require: true },
    date: { type: String },
    status: { type: String },
    excerpt: { type: String },
    tags: { type: String },
    isFeatured: { type: Boolean },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
