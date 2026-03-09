// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();

const {
  createNotification,
  getParentNotifications,
  markNotificationRead,
} = require("../controllers/notificationController");

// If you have JWT middleware, add it here (authMiddleware)

// Create a notification (mentor/admin/ML model)
router.post("/", createNotification);

// Get all notifications for a parent
router.get("/parent/:parentId", getParentNotifications);

// Mark as read
router.patch("/:id/read", markNotificationRead);

module.exports = router;
