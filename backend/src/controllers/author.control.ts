import { RequestHandler } from "express";
import Author from "../models/author.model.js";
import Course from "../models/course.models.js"; // Make sure to import the Course model

// GET all authors with their course count
export const getAllAuthors: RequestHandler = async (req, res) => {
  try {
    const authors = await Author.find();

    // Get the course count for each author
    const authorsWithCount = await Promise.all(
      authors.map(async (author) => {
        const count = await Course.countDocuments({ author: author.name });
        return {
          ...author.toObject(),
          courseCount: count,
        };
      })
    );

    res.status(200).json(authorsWithCount);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// CREATE a new author
export const createAuthor: RequestHandler = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error: any) {
    console.error("Error creating author:", error);
    res.status(500).json({
      message: "An error occurred while creating the author.",
      error: error.message || error,
    });
  }
};

// UPDATE an existing author
export const updateAuthor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const authorData = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(id, authorData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAuthor) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Author updated successfully", author: updatedAuthor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// DELETE an author
export const deleteAuthor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);

    if (!deletedAuthor) {
      res.status(404).json({ message: "Author not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Author deleted successfully", author: deletedAuthor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
