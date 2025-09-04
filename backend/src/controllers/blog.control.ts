import { Request, RequestHandler, Response } from "express";
import Blog from "../models/blog.model";

export const getAllBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

export const CreateBlogs: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      author,
      content,
      category,
      status,
      isFeatured,
      date,
      excerpt,
      imageAuthor,
      thumbnail,
    } = req.body;
    const newsBlog = new Blog({
      title,
      author,
      content,
      category,
      status,
      isFeatured,
      date,
      excerpt,
      imageAuthor,
      thumbnail,
    });

    const saveBlogs = await newsBlog.save();
    res.status(201).json(saveBlogs);
  } catch (error) {
    console.error("Lỗi chi tiết:", error); // 👈 thêm dòng này để xem lỗi
    res.status(500).json({ message: "Lỗi khi tạo mới blogs" });
  }
};

export const SearchBlogs: RequestHandler = async (req, res) => {
  try {
    const query = req.query.q?.toString().toLocaleLowerCase() || "";
    const regex = new RegExp(query, "i");

    const result = await Blog.find({
      $or: [
        {
          title: regex,
          author: regex,
          category: regex,
          tags: regex,
          slug: regex,
        },
      ],
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm bài viết" });
  }
};

export const getFeaturedBlogs: RequestHandler = async (req, res) => {
  try {
    const FeaturedBlogs = await Blog.find({ isFeatured: true });
    res.status(201).json(FeaturedBlogs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy bài viết nổi bật" });
  }
};

//get detail by slug
export const getBlogsBySlug: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      res
        .status(404)
        .json({ message: "Không thể lấy chi tiết bài viết theo slug" });
    }

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

//update Blogs
export const UpdateBlogs: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updateBlogs = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updateBlogs) {
      res.status(404).json({ message: "Không tìm thấy bài viết cần cập nhật" });
    }

    res.status(200).json(updateBlogs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật" });
  }
};

//deleted Blogs

export const DeletedBlogs: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogs = await Blog.findByIdAndDelete(id);
    if (!deletedBlogs) {
      res.status(404).json({ message: "Không tìm thấy bài viết cần xóa" });
    }
    res.status(200).json({ message: "Xóa bài viết thành công", deletedBlogs });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server", error });
  }
};

//Bài viết liên quan

export const getRelatedBlogs: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) res.status(404).json({ message: "Không tìm thấy bài viết" });
    const relatedBlogs = await Blog.find({
      category: blog?.category,
      slug: { $ne: blog?.slug },
    }).limit(5);
    res.status(201).json(relatedBlogs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy bài viết theo slug

export const getBlogBySlug: RequestHandler = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
