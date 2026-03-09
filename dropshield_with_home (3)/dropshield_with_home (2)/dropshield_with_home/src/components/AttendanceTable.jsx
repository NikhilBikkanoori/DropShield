const AttendanceTable = ({ attendance }) => {
  // attendance = [{ date: ISOString, status: "Present" | "Absent" }]
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">
        Attendance Details
      </h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="border px-3 py-2 text-left">Date</th>
            <th className="border px-3 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {(attendance || []).map((a, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-3 py-2">
                {new Date(a.date).toLocaleDateString()}
              </td>
              <td
                className={`border px-3 py-2 ${
                  a.status === "Present" ? "text-green-600" : "text-red-600"
                }`}
              >
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
