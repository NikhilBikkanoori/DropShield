// controllers/notificationController.js
const Notification = require("../models/notification");
const ParentAdmin = require("../models/ParentAdmin");
// const StudentAdmin = require("../models/StudentAdmin"); // if needed
const nodemailer = require("nodemailer");   
const parentAdmin = require("../models/ParentAdmin");   
// 1️⃣ Create notification (called by mentor/admin/ML-event)
const createNotification = async (req, res) => {
  try {
    const { parentId, studentId, title, message, type } = req.body;

    if (!parentId || !title || !message) {
      return res.status(400).json({ message: "parentId, title, message are required" });
    }

    const notification = new Notification({
      parent: parentId,
      student: studentId || null,
      title,
      message,
      type: type || "GENERAL",
    });

    await notification.save();

    // TODO: Optionally trigger email/SMS here (see section 4)

    return res.status(201).json({
      message: "Notification created successfully",
      notification,
    });
  } catch (err) {
    console.error("Error creating notification:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// 2️⃣ Get all notifications of a parent (for Parent portal)
const getParentNotifications = async (req, res) => {
  try {
    const { parentId } = req.params;   // /api/notifications/parent/:parentId

    const notifications = await Notification.find({ parent: parentId })
      .sort({ createdAt: -1 });

    return res.json(notifications);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// 3️⃣ Mark one notification as read
const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;     // /api/notifications/:id/read

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (err) {
    console.error("Error marking notification read:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
// Simple transporter (use real email creds or service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendParentEmail = async (parentId, title, message) => {
  const parent = await ParentAdmin.findById(parentId);
  if (!parent || !parent.Email) return;

  await transporter.sendMail({
    from: `"Student Risk Alert" <${process.env.MAIL_USER}>`,
    to: parent.Email,
    subject: title,
    text: message,
  });
};

module.exports = {
  createNotification,
  getParentNotifications,
  markNotificationRead,
};
