import mongoose from "mongoose";
import slugify from "slugify";
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    category: { type: String },
    author: { type: String, require: true },
    imageAuthor: { type: String },
    date: { type: String },
    status: { type: String, enum: ["Đã đăng", "Nháp"], default: "Nháp" },
    excerpt: { type: String },
    isFeatured: { type: Boolean },
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

// Tự động tạo slug trước khi lưu
blogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title || "", { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Blog.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
