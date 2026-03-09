const MarksTable = ({ marks }) => {
  // marks = [{ subject, internal, external, total }]
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-3">Student Marks</h3>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="border px-3 py-2 text-left">Subject</th>
            <th className="border px-3 py-2 text-left">Optained</th>
            <th className="border px-3 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {(marks || []).map((m, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border px-3 py-2">{m.subject}</td>
              <td className="border px-3 py-2">{m.Optained}</td>
              <td className="border px-3 py-2">{m.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;
