const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {

  const notifications = await Notification
    .find()
    .sort({ createdAt: -1 });

  res.json(notifications);

};

exports.markAsRead = async (req, res) => {

  await Notification.updateMany(
    { isRead: false },
    { isRead: true }
  );

  res.json({ message: "Notifications marked as read" });

};