const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../utils/cloudinaryStorage");

const {
  createAnnouncement,
  getAnnouncements
} = require("../controllers/announcementController");
router.post("/create", isAdmin, upload.single("image"), createAnnouncement);
router.get("/", getAnnouncements);

module.exports = router;