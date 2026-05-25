const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
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
  { timestamps: true }
);

// Create unique indexes explicitly
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);