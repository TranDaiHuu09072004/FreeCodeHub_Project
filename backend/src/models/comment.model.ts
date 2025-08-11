import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  targetType: "Lesson" | "Blog";
  targetId: mongoose.Types.ObjectId;
  content: string;
  parentId?: mongoose.Types.ObjectId | null;
}

const CommentSchema = new Schema<IComment>(
  {
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
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
