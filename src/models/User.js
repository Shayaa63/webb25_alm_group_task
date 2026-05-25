const mongoose = require("mongoose");
const Accommodation = require("./Accommodation");

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

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

userSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()._id;

  if (userId) {
    await Accommodation.deleteMany({ userId });
  }

  next();
});

module.exports = mongoose.model("User", userSchema);