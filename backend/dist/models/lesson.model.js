import mongoose from "mongoose";
const LessonSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true, // fix "require" -> "required"
    },
    title: { type: String, required: true },
    description: { type: String },
    videoId: { type: String, required: true, unique: true },
    videoUrl: { type: String },
    order: { type: Number },
    duration: { type: String },
    comments: [
        {
            user: { type: String, required: true },
            avatar: { type: String },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, {
    timestamps: true,
});
const Lesson = mongoose.model("Lesson", LessonSchema);
export default Lesson;
