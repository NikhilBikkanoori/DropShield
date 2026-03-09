import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();   // optional, clears login token
    navigate("/");          // redirect to Home Page
  };

  return (
    <nav className="w-full shadow-md bg-white px-6 py-3 flex justify-between items-center border-b">
      
      {/* CLICKABLE TITLE */}
      <h2 className="text-2xl font-semibold text-blue-600 cursor-pointer">
        <Link to="/">Dropshield Portal</Link>
      </h2>

      <div className="flex items-center gap-4">

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md
                     hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;