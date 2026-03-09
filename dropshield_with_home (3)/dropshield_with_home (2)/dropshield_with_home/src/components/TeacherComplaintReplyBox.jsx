import { useEffect, useState } from "react";
import API from "../utils/api";

const TeacherComplaintBox = () => {
  const [students, setStudents] = useState([]);
  const [selectedRoll, setSelectedRoll] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    API.get("/teacher/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const sendComplaint = async () => {
    if (!selectedRoll || !message.trim()) {
      setStatus("Please select a student and type a message.");
      return;
    }

    try {
      await API.post("/teacher/send-to-parent", {
        rollNo: selectedRoll,
        message,
      });

      setStatus("Message sent to the parent successfully.");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        Send Message to Parent
      </h3>

      {/* Select Student */}
      <select
        value={selectedRoll}
        onChange={(e) => setSelectedRoll(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Student by Roll Number</option>
        {students.map((s) => (
          <option key={s.rollNo} value={s.rollNo}>
            {s.rollNo} - {s.name}
          </option>
        ))}
      </select>

      {/* Message */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
      ></textarea>

      <button
        onClick={sendComplaint}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow
                   hover:bg-blue-700 hover:scale-105 transition-all"
      >
        Send Message
      </button>

      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default TeacherComplaintBox;
