const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Invalid email"],
    },
    profileImage: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+/, "Please use a valid URL"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
