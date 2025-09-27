import mongoose, { Schema } from "mongoose";
const authorSchema = new Schema({
    name: { type: String, required: true },
    channel: { type: String, required: true },
    description: { type: String },
    avatar: { type: String },
    courseCount: { type: Number, default: 0 },
    numSubscribers: { type: Number, default: 0 },
    linkYtb: { type: String },
}, { timestamps: true });
const Author = mongoose.model("Author", authorSchema);
export default Author;
