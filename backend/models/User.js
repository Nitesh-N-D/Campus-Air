const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
    course: {
      type: String,
      trim: true,
      required: function requiredCourse() {
        return this.authProvider === "local";
      },
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
