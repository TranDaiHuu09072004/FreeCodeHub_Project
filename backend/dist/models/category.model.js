import mongoose from "mongoose";
import slugify from "slugify";
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    courseCount: { type: Number, default: 0 },
}, { timestamps: true });
// Tự động tạo slug trước khi lưu
CategorySchema.pre("save", async function (next) {
    if (this.isModified("name")) {
        let baseSlug = slugify(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;
        while (await mongoose.models.Category.findOne({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }
        this.slug = slug;
    }
    next();
});
const Category = mongoose.model("Category", CategorySchema);
export default Category;
