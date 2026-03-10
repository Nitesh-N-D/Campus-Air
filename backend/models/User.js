const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  role: {
    type: String,
    enum: ["admin","student"],
    default: "student"
  },
  department: String,
  year: Number,
  profileImage: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);