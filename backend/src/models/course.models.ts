import mongoose from "mongoose";
import slugify from "slugify";
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    level: { type: String },
    isFeatured: { type: Boolean },
    slogan: { type: String },
    status: { type: Boolean },
    views: { type: Number },
    thumbnail: { type: String },
    image_author: { type: String },
    highlights: { type: [String] },
    badge: { type: String, default: "Khóa học miễn phí" },
    slug: { type: String, unique: true },
    lessons: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
        courseId: { type: String }, // Or mongoose.Schema.Types.ObjectId if it references a Course by ID
        title: { type: String },
        duration: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Tự động tạo slug trước khi lưu
courseSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Course.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
  }
  next();
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
