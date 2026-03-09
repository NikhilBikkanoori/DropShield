import { useState } from "react";
import API from "../utils/api.js";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/parent/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setStatus("");
      window.location.href = "/parent/dashboard";
    } catch (err) {
      console.error(err);
      setStatus("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 p-8 bg-white rounded-xl shadow-lg border">
        <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Parent Login
        </h2>

        <input
          type="email"
          placeholder="Parent Email"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md
                     hover:bg-blue-700 hover:scale-105 transition-all duration-200"
        >
          Login
        </button>

        {status && <p className="mt-3 text-sm text-red-500">{status}</p>}
      </div>
    </div>
  );
};

export default ParentLogin;
