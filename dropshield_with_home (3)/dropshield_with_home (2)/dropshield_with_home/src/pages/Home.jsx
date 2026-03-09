import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative">
      <a href="http://localhost:5173" className="absolute top-6 left-6 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-all font-semibold">
        ← Back to Main Branch
      </a>
      <div className="bg-white p-10 rounded-xl shadow-xl w-96 text-center border">

        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          DropShield Portal
        </h1>

        {/* ADMIN */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Admin Login
          </p>

          <Link
            to="/admin/dashboard"
            className="block bg-blue-600 text-white py-2 rounded-lg shadow
                      hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            Go to Admin Dashboard
          </Link>
        </div>

        {/* PARENT */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Parent Login
          </p>

          <Link
            to="/parent/dashboard"
            className="block bg-blue-600 text-white py-2 rounded-lg shadow
                      hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            Go to Parent Dashboard
          </Link>
        </div>

        {/* TEACHER */}
        <div className="mb-2">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Teacher Login
          </p>

          <Link
            to="/teacher/dashboard"
            className="block bg-blue-600 text-white py-2 rounded-lg shadow
                      hover:bg-blue-700 hover:scale-105 transition-all duration-200"
          >
            Go to Teacher Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;