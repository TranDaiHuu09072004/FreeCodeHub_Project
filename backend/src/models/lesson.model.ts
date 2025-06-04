import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    videoId: { type: String, required: true, unique: true },
    videoUrl: { type: String },
    order: { type: Number },
    duration: { type: String },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("Lesson", LessonSchema);
export default Lesson;
