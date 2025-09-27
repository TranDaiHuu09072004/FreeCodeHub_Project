import Category from "../models/category.model.js";
import Course from "../models/course.models.js";
export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        // Đếm số lượng course cho từng category
        const categoriesWithCount = await Promise.all(categories.map(async (cat) => {
            // Nếu trường category trong Course là id:
            const count = await Course.countDocuments({ category: cat.name });
            // Nếu là name thì dùng: { category: cat.name }
            return { ...cat.toObject(), courseCount: count };
        }));
        res.json(categoriesWithCount);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
export const CreateCategory = async (req, res) => {
    try {
        const exited = await Category.findOne({ name: req.body.name });
        if (exited) {
            res.status(400).json({ message: "Danh mục đã tồn tại" });
        }
        const newCategory = await Category.create(req.body);
        res.status(201).json({ message: "Tạo danh mục thành công", newCategory });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
export const UpdateCate = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updateCate = await Category.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updateCate) {
            res.status(404).json({ message: "Không tìm thấy danh mục cần cập nhật" });
        }
        res
            .status(200)
            .json({ message: "Cập nhật danh mục thành công", updateCate });
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi Server", error });
    }
};
export const DeletedCate = async (req, res) => {
    try {
        const { id } = req.params;
        const cateDeleted = await Category.findByIdAndDelete(id);
        if (!cateDeleted) {
            res.status(404).json({ message: "Không tìm thấy danh mục cần xóa" });
        }
        res.status(200).json({ message: "Xóa danh mục thành công", cateDeleted });
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi Server", error });
    }
};
// export const recountCourseCount: RequestHandler = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     for (const cat of categories) {
//       const count = await Course.countDocuments({ category: cat._id }); // hoặc cat._id nếu bạn lưu ID
//       await Category.findByIdAndUpdate(cat._id, { courseCount: count });
//     }
//     res
//       .status(200)
//       .json({
//         message: "✅ Đã cập nhật lại số lượng khóa học cho các danh mục.",
//       });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi cập nhật", error });
//   }
// };
