const Event = require("../models/Event");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.createEvent = async (req, res) => {

  try {

    const { title, description, date, location, isImportant } = req.body;

    const event = new Event({
      title,
      description,
      date,
      location,
      image: req.file ? req.file.path : "",
      isImportant,
      createdBy: req.user ? req.user._id : null
    });

    await event.save();

    /* Save Notification */

    await Notification.create({
      title: event.title,
      message: "New event posted",
      type: "event"
    });

    /* Real-time notification */

    if (global.io) {
      global.io.emit("newNotification", {
        title: event.title,
        type: "event"
      });
    }

    /* Send Email ONLY if Important */

    if (isImportant) {

      const students = await User.find({ role: "student" });

      const emails = students.map(u => u.email);

      if (emails.length > 0) {

        await sendEmail(
          emails,
          `Important Event: ${title}`,
          `
A new important campus event has been posted.

Title: ${title}

Description:
${description}

Location: ${location}

Date: ${date}
`
        );

      }

    }

    res.status(201).json(event);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error creating event" });

  }

};


exports.getEvents = async (req, res) => {

  try {

    const events = await Event
      .find()
      .sort({ createdAt: -1 });

    res.json(events);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error fetching events" });

  }

};