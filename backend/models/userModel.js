import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: { type: Array, required: true, default: [] },
    following: { type: Array, required: true, default: [] },
    profileImage: {
      type: String,
      required: true,
      default:
        "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png",
    },
    description: { type: Array, required: true, default: "" },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
