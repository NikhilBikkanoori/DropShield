import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [form, setForm] = useState({ name: "", email: "", roll: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Added:", form);
  };

  return (
    <div style={{ padding: "40px", background: "#1a2349", minHeight: "100vh", color: "white" }}>
      <button onClick={() => navigate("/")} style={{ background: "rgba(162,244,249,0.1)", color: "#A2F4F9", border: "1px solid #A2F4F9", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", marginBottom: "24px" }}>← Back to Home</button>
      <h2 style={{ color: "#A2F4F9" }}>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br /><br />

        <input
          type="text"
          placeholder="Roll Number"
          onChange={(e) => setForm({ ...form, roll: e.target.value })}
        /><br /><br />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
