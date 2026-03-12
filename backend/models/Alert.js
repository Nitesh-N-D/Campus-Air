const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({

  title: String,

  message: String,

  priority: {
    type: String,
    enum: ["High","Medium","Low"],
    default: "Low"
  },
 expiresAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Alert", alertSchema);