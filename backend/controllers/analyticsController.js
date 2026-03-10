const User = require("../models/User");
const Event = require("../models/Event");
const Announcement = require("../models/Announcement");

exports.getAnalytics = async (req, res) => {

  try {

    const totalStudents = await User.countDocuments({ role: "student" });
    const totalEvents = await Event.countDocuments();
    const totalAnnouncements = await Announcement.countDocuments();

    const events = await Event.find();
    const announcements = await Announcement.find();

    const eventsPerMonth = {};
    const announcementsPerMonth = {};

    events.forEach(e => {
      const month = new Date(e.createdAt).toLocaleString("default", { month: "short" });

      eventsPerMonth[month] = (eventsPerMonth[month] || 0) + 1;
    });

    announcements.forEach(a => {
      const month = new Date(a.createdAt).toLocaleString("default", { month: "short" });

      announcementsPerMonth[month] = (announcementsPerMonth[month] || 0) + 1;
    });

    res.json({
      totalStudents,
      totalEvents,
      totalAnnouncements,
      eventsPerMonth,
      announcementsPerMonth
    });

  } catch (error) {

    res.status(500).json({ message: "Analytics error" });

  }

};