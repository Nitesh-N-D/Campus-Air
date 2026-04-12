const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../utils/cloudinaryStorage");

const {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement
} = require("../controllers/announcementController");
router.post("/create", isAdmin, upload.single("image"), createAnnouncement);
router.put("/:id", isAdmin, upload.single("image"), updateAnnouncement);
router.delete("/:id", isAdmin, deleteAnnouncement);
router.get("/", getAnnouncements);

module.exports = router;
