const router = require("express").Router();
const upload = require("../utils/cloudinaryStorage");
const isAdmin = require("../middleware/adminMiddleware");
const {
  createEvent,
  getEvents
} = require("../controllers/eventController");
router.post("/create", isAdmin, upload.single("image"), createEvent);

router.get("/", getEvents);

module.exports = router;