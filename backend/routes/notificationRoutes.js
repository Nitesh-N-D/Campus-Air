const router = require("express").Router();

const {
  getNotifications,
  markAsRead
} = require("../controllers/notificationController");

router.get("/", getNotifications);

router.put("/read", markAsRead);

module.exports = router;