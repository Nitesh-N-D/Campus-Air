const Event = require("../models/Event");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const Notification = require("../models/Notification");

function parseBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase() === "true";
  }

  return false;
}

async function sendImportantEventEmail({ title, description, location, date }) {
  const students = await User.find({ role: "student" }).select("email");
  const emails = students
    .map((user) => user.email?.trim())
    .filter(Boolean);
  console.log("Important event email triggered");
  console.log("Student emails:", emails);
  if (emails.length === 0) {
    return;
  }

  await sendEmail(
    emails,
    `Important Event: ${title}`,
    `A new important campus event has been posted.

Title: ${title}

Description:
${description}

Location: ${location}

Date: ${date}`,
    `<p>A new important campus event has been posted.</p>
<p><strong>Title:</strong> ${title}</p>
<p><strong>Description:</strong><br />${description}</p>
<p><strong>Location:</strong> ${location}</p>
<p><strong>Date:</strong> ${date}</p>`
  );
}

exports.createEvent = async (req, res) => {

  try {
    const authenticatedUser = req.authUser || req.user;

    const { title, description, date, location } = req.body;
    const isImportant = parseBoolean(req.body.isImportant);

    const event = new Event({
      title,
      description,
      date,
      location,
      image: req.file ? req.file.path : "",
      isImportant,
      createdBy: authenticatedUser ? authenticatedUser._id : null
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

    res.status(201).json(event);

    if (isImportant) {
      sendImportantEventEmail({ title, description, location, date }).catch((error) => {
        console.error("Failed to send important event email:", error);
      });
    }

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error creating event" });

  }

};

exports.updateEvent = async (req, res) => {

  try {
    const { title, description, date, location } = req.body;
    const isImportant = parseBoolean(req.body.isImportant);

    const existingEvent = await Event.findById(req.params.id);

    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    existingEvent.title = title;
    existingEvent.description = description;
    existingEvent.date = date;
    existingEvent.location = location;
    existingEvent.isImportant = isImportant;

    if (req.file) {
      existingEvent.image = req.file.path;
    }

    await existingEvent.save();

    return res.status(200).json(existingEvent);

  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: "Error updating event" });

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

exports.deleteEvent = async (req, res) => {

  try {

    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });

  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: "Error deleting event" });

  }

};
