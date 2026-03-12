const Alert = require("../models/Alert");
const Notification = require("../models/Notification");

exports.createAlert = async (req, res) => {
  try {

    const { title, message, priority } = req.body;

    const alert = new Alert({
      title,
      message,
      priority,
      createdBy: req.user ? req.user._id : undefined
    });

    await alert.save();

    // create notification safely
    try {
      await Notification.create({
        title,
        message,
        type: "alert"
      });
    } catch (err) {
      console.log("Notification creation failed:", err.message);
    }

    if (global.io) {
      global.io.emit("newAlert", alert);
    }

    res.status(201).json(alert);

  } catch (error) {
    console.error("Create Alert Error:", error);
    res.status(500).json({ message: "Error creating alert" });
  }
};

exports.getAlerts = async (req, res) => {

  const alerts = await Alert
    .find()
    .sort({ createdAt: -1 });

  res.json(alerts);

};