const Announcement = require("../models/Announcement");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

function parseBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase() === "true";
  }

  return false;
}

async function sendImportantAnnouncementEmail({ title, content }) {
  const students = await User.find({ role: "student" }).select("email");
  const emails = students
    .map((user) => user.email?.trim())
    .filter(Boolean);

  if (emails.length === 0) {
    return;
  }

  await sendEmail(
    emails,
    `Important Announcement: ${title}`,
    content,
    `<p>${content}</p>`
  );
}

exports.createAnnouncement = async (req, res) => {
  try {
    const authenticatedUser = req.authUser || req.user;

    const { title, content } = req.body;
    const isImportant = parseBoolean(req.body.isImportant);

    const announcement = new Announcement({
      title,
      content,
      image: req.file ? req.file.path : "",
      isImportant,
      createdBy: authenticatedUser ? authenticatedUser._id : null
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

    res.status(201).json(announcement);

    if (isImportant) {
      sendImportantAnnouncementEmail({ title, content }).catch((error) => {
        console.error("Failed to send important announcement email:", error);
      });
    }

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
