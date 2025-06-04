import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", CategoriesSchema);

export default Categories;
