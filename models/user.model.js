import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validator: [isEmail, "Invalid email"],
    },
    bookmarks: [
      {
        show_id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        release_date: { type: Date, required: true },
        backdrop_path: { type: String, required: true },
        vote_average: { type: Number, required: true },
        media_type: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default { User };
