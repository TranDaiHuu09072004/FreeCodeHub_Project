import mongoose, { Schema } from "mongoose";
const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    targetType: {
        type: String,
        enum: ["Lesson", "Blog"],
        required: true,
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "targetType",
    },
    content: {
        type: String,
        required: true,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
}, { timestamps: true });
CommentSchema.pre("findOneAndDelete", async function (next) {
    const comment = await this.model.findOne(this.getFilter());
    if (comment) {
        await comment.model("Comment").deleteMany({ parentId: comment._id });
    }
    next();
});
const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
