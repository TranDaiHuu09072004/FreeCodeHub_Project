import mongoose, { UpdateQuery } from "mongoose";
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
    thumbnail: { type: String },
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

// Middleware cho findOneAndUpdate
blogSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Dùng type guard để kiểm tra nếu là UpdateQuery
  if (update && typeof update === "object" && !Array.isArray(update)) {
    const updateQuery = update as UpdateQuery<any>;

    // Kiểm tra nếu title được update (có thể trong $set hoặc trực tiếp)
    const newTitle = updateQuery.title ?? updateQuery.$set?.title;

    if (newTitle) {
      const baseSlug = slugify(newTitle, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      while (await mongoose.models.Blog.findOne({ slug })) {
        slug = `${baseSlug}-${count++}`;
      }

      // Gán slug mới vào đúng chỗ ($set hoặc root)
      if (updateQuery.$set) {
        updateQuery.$set.slug = slug;
      } else {
        updateQuery.slug = slug;
      }

      this.setUpdate(updateQuery);
    }
  }

  next();
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
