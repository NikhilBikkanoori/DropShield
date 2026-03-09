import { useEffect, useState } from "react";
import API from "../utils/api.js";

const ParentReasoningBox = () => {
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    API.get("/parent/reasons")
      .then((res) => setReasons(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Messages from Teacher
      </h3>

      {reasons.length === 0 && (
        <p className="text-gray-500 text-sm">No messages yet.</p>
      )}

      <ul className="space-y-3">
        {reasons.map((r, idx) => (
          <li
            key={idx}
            className="p-3 bg-blue-50 rounded-lg border shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-gray-700 text-sm">{r.message}</p>
            <p className="text-xs text-right text-gray-500 mt-1">
              {r.createdAt
                ? new Date(r.createdAt).toLocaleString()
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParentReasoningBox;
