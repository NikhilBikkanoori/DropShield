import { useEffect, useState } from "react";
import API from "../utils/api.js";

const ContactTeacherSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/teachers/list")
      .then((res) => setTeachers(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleSend = async () => {
    if (!selectedTeacherId || !message.trim()) {
      setStatus("Please select a teacher and enter a message.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await API.post("/parent/message/send", {
        teacherId: selectedTeacherId,
        message,
      });
      setStatus("Message sent successfully.");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Contact Teacher
      </h3>

      <select
        className="w-full mb-3 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedTeacherId}
        onChange={(e) => setSelectedTeacherId(e.target.value)}
      >
        <option value="">Select Teacher</option>
        {teachers.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name} ({t.subject})
          </option>
        ))}
      </select>

      <textarea
        className="w-full h-24 border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message to teacher..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md
                   hover:bg-blue-700 hover:scale-105 transition-all duration-200
                   disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ContactTeacherSection;
