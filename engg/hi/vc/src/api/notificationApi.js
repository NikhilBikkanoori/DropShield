// src/api/notificationApi.js
import axios from "axios";

const API_BASE = "http://localhost:5000/api/notifications"; // adjust

export const fetchParentNotifications = async (parentId) => {
  const res = await axios.get(`${API_BASE}/parent/${parentId}`);
  return res.data;
};

export const markNotificationRead = async (id) => {
  const res = await axios.patch(`${API_BASE}/${id}/read`);
  return res.data;
};
