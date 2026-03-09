const StudentInfoCard = ({ info }) => {
  if (!info) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">
        Student Details
      </h3>

      <div className="text-gray-800 space-y-2 text-sm">
        <p><strong>Name:</strong> {info.name}</p>
        <p><strong>Roll Number:</strong> {info.rollNo}</p>
        <p><strong>Class:</strong> {info.className}</p>
        <p><strong>Days Present:</strong> {info.presentDays}</p>
        <p><strong>Days Absent:</strong> {info.absentDays}</p>
      </div>
    </div>
  );
};

export default StudentInfoCard;
