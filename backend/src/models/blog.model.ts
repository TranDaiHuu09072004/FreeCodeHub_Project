import mongoose, { UpdateQuery } from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // fix "require" -> "required"
    content: { type: String, required: true },
    category: { type: String },
    author: { type: String, required: true },
    imageAuthor: { type: String },
    date: { type: String },
    status: { type: String, enum: ["Đã đăng", "Nháp"], default: "Nháp" },
    excerpt: { type: String },
    isFeatured: { type: Boolean, default: false },
    thumbnail: { type: String },
    slug: { type: String, unique: true },
    comments: [
      {
        user: { type: String, required: true },
        avatar: { type: String },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
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

  if (update && typeof update === "object" && !Array.isArray(update)) {
    const updateQuery = update as UpdateQuery<any>;
    const newTitle = updateQuery.title ?? updateQuery.$set?.title;

    if (newTitle) {
      const baseSlug = slugify(newTitle, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      while (await mongoose.models.Blog.findOne({ slug })) {
        slug = `${baseSlug}-${count++}`;
      }

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
