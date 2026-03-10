const Announcement = require("../models/Announcement");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

exports.createAnnouncement = async (req, res) => {
  try {

    const { title, content, isImportant } = req.body;

    const announcement = new Announcement({
      title,
      content,
      image: req.file ? req.file.path : "",
      isImportant,
      createdBy: req.user ? req.user._id : null
    });

    await announcement.save();

    /* Notification Save */

    await Notification.create({
      title: announcement.title,
      message: "New announcement posted",
      type: "announcement"
    });

    /* Real-time notification */

    if (global.io) {
      global.io.emit("newAnnouncement", {
        title: announcement.title,
        message: "New announcement posted"
      });
    }

    /* Send email ONLY if important */

    if (isImportant) {

      const students = await User.find({ role: "student" });

      const emails = students.map(u => u.email);

      if (emails.length > 0) {

        await sendEmail(
          emails,
          `Important Announcement: ${title}`,
          content
        );

      }

    }

    res.status(201).json(announcement);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating announcement" });
  }
};

exports.getAnnouncements = async (req, res) => {

  const announcements = await Announcement
    .find()
    .sort({ createdAt: -1 });

  res.json(announcements);

};