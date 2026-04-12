const router = require("express").Router();
const upload = require("../utils/cloudinaryStorage");
const isAdmin = require("../middleware/adminMiddleware");
const {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent
} = require("../controllers/eventController");
router.post("/create", isAdmin, upload.single("image"), createEvent);
router.put("/:id", isAdmin, upload.single("image"), updateEvent);
router.delete("/:id", isAdmin, deleteEvent);

router.get("/", getEvents);

module.exports = router;
