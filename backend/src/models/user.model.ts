import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // <-- vẫn có!
    role: { type: String, enum: ["admin", "user", "author"], default: "user" },
    status: { type: Boolean, default: true },
    registeredCourses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    ],
  },
  { timestamps: true }
);

// Băm mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
