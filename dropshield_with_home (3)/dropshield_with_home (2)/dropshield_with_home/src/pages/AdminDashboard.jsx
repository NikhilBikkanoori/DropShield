import Navbar from "../components/Navbar";
import { useRef } from "react";

const AdminDashboard = () => {
  const studentRef = useRef();
  const parentRef = useRef();
  const teacherRef = useRef();

  // Trigger file input
  const handleClick = (ref) => {
    ref.current.click();
  };

  // Handle file selection
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    alert(`${type} file selected: ${file.name}`);

    // TODO: Send file to backend API
    // Example:
    // const formData = new FormData();
    // formData.append("file", file);
    // API.post(`/admin/upload/${type}`, formData)
  };

  return (
    <>
      <Navbar role="admin" />

      <div className="p-10">

        {/* Buttons Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Student Upload */}
          <div className="bg-white p-8 rounded-xl shadow-md border text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Upload Student Data
            </h3>
            <button
              onClick={() => handleClick(studentRef)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md 
                         hover:bg-blue-700 hover:scale-105 transition-all"
            >
            Upload Student Sheet
            </button>
            <input
              type="file"
              ref={studentRef}
              onChange={(e) => handleFileUpload(e, "student")}
              className="hidden"
              accept=".csv, .xlsx"
            />
          </div>
          {/* Parent Upload */}
          <div className="bg-white p-8 rounded-xl shadow-md border text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Upload Parent Data
            </h3>
            <button
              onClick={() => handleClick(parentRef)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md 
                         hover:bg-blue-700 hover:scale-105 transition-all"
            >
            Upload Parent Sheet
            </button>
            <input
              type="file"
              ref={parentRef}
              onChange={(e) => handleFileUpload(e, "parent")}
              className="hidden"
              accept=".csv, .xlsx"
            />
          </div>
          {/* Teacher Upload */}
          <div className="bg-white p-8 rounded-xl shadow-md border text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Upload Teacher Data
            </h3>
            <button
              onClick={() => handleClick(teacherRef)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md 
                         hover:bg-blue-700 hover:scale-105 transition-all"
            >
              Upload Teacher Sheet
            </button>

            <input
              type="file"
              ref={teacherRef}
              onChange={(e) => handleFileUpload(e, "teacher")}
              className="hidden"
              accept=".csv, .xlsx"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;