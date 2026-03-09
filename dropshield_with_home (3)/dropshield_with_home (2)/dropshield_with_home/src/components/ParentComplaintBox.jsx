import { useState } from "react";
import API from "../utils/api.js";

const ParentComplaintBox = () => {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const sendComplaint = async () => {
    if (!msg.trim()) {
      setStatus("Please type a complaint.");
      return;
    }

    try {
      await API.post("/parent/complaint", { message: msg });
      setStatus("Complaint sent to mentor.");
      setMsg("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send complaint.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Complaint Box
      </h3>

      <textarea
        className="w-full h-24 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your complaint..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <button
        onClick={sendComplaint}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg shadow
                  hover:bg-blue-700 hover:scale-105 transition-all"
      >
        Send Complaint
      </button>

      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </div>
  );
};

export default ParentComplaintBox;
