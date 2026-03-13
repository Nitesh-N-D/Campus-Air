const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    googleId: String,
    password: String,
    authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "google",
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    department: String,
    year: Number,
    profileImage: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
    resetTokenExpiry: Date,
    verificationToken: String,
    verificationTokenExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
