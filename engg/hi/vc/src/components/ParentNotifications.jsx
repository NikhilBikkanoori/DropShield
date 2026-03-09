// src/components/ParentNotifications.jsx
import React, { useEffect, useState } from "react";
import {
  fetchParentNotifications,
  markNotificationRead,
} from "../api/notificationApi";

const ParentNotifications = ({ parentId }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all notifications for this parent
  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await fetchParentNotifications(parentId);
      setNotifications(data);
    } catch (err) {
      console.error("Error loading notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (parentId) {
      loadNotifications();
    }
  }, [parentId]);

  // Mark notification as read
  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read", err);
    }
  };

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="parent-notifications">
      <h3>Notifications</h3>

      {notifications.length === 0 && (
        <p>No notifications yet.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {notifications.map((n) => (
          <li
            key={n._id}
            style={{
              border: "1px solid #ddd",
              marginBottom: "8px",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: n.isRead ? "#f9f9f9" : "#e6f3ff",
            }}
          >
            <strong>{n.title}</strong>
            <div style={{ fontSize: "0.9rem", marginTop: "4px" }}>
              {n.message}
            </div>

            <small style={{ display: "block", marginTop: "6px", color: "#666" }}>
              {new Date(n.createdAt).toLocaleString()} • {n.type}
            </small>

            {!n.isRead && (
              <button
                style={{
                  marginTop: "8px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkRead(n._id)}
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentNotifications;
