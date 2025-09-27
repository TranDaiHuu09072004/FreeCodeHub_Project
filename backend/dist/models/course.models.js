import mongoose from "mongoose";
import slugify from "slugify";
import Category from "./category.model.js";
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    level: { type: String },
    isFeatured: { type: Boolean },
    slogan: { type: String },
    status: { type: String },
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
}, { timestamps: true });
// Sau khi tạo mới khóa học
courseSchema.post("save", async function (doc) {
    await Category.findOneAndUpdate({
        name: doc.category,
    }, {
        $inc: { courseCount: 1 },
    });
});
// Sau khi xóa khóa học
courseSchema.post("findOneAndDelete", async function (doc) {
    if (doc?.category) {
        await Category.findOneAndDelete({
            name: doc.category,
        }, {
            $inc: { courseCount: -1 },
        });
    }
});
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
courseSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    // Lấy document hiện tại để so sánh category
    const docToUpdate = await this.model.findOne(this.getQuery());
    // Convert update về dạng chuẩn
    const updateQuery = typeof update === "object" && !Array.isArray(update)
        ? update
        : {};
    // 1. Cập nhật slug nếu title thay đổi
    const newTitle = updateQuery.title ?? updateQuery.$set?.title;
    if (newTitle) {
        const baseSlug = slugify(newTitle, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;
        while (await mongoose.models.Course.findOne({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }
        if (updateQuery.$set) {
            updateQuery.$set.slug = slug;
        }
        else {
            updateQuery.slug = slug;
        }
        this.setUpdate(updateQuery);
    }
    // 2. Cập nhật lại category count nếu category thay đổi
    const newCategory = updateQuery.category ?? updateQuery.$set?.category;
    if (newCategory && newCategory !== docToUpdate.category) {
        await Category.findOneAndUpdate({ name: docToUpdate.category }, { $inc: { courseCount: -1 } });
        await Category.findOneAndUpdate({ name: newCategory }, { $inc: { courseCount: 1 } });
    }
    next();
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
