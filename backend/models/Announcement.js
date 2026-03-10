const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,

  isImportant: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);