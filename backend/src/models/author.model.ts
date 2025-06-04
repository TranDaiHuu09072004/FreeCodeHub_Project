import mongoose, { Schema, Document } from "mongoose";

interface IAuthor extends Document {
  name: string;
  description: string;
  avatar: string;
  channel: string;
  numCourses: number;
  numSubscribers: number;
  createdAt: Date;
}

const authorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    channel: { type: String, required: true },
    description: { type: String },
    avatar: { type: String },
    numCourses: { type: Number, default: 0 },
    numSubscribers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Author = mongoose.model<IAuthor>("Author", authorSchema);
export default Author;
