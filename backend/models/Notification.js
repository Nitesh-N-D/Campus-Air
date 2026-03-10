const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

  title: String,
  message: String,

  type: {
    type: String,
    enum: ["event","announcement"]
  },

  isRead: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Notification", notificationSchema);