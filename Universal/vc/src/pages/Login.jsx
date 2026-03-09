import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-2 text-center">Direct Login</h2>
        <p className="text-center text-gray-600 mb-6">Choose your role to jump in without credentials.</p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link to="/student-login" className="block text-center bg-[#262C53] text-white py-3 rounded hover:bg-[#1a1f3a]">Student</Link>
          <Link to="/mentor-login" className="block text-center bg-[#262C53] text-white py-3 rounded hover:bg-[#1a1f3a]">Mentor</Link>
          <Link to="/parent-login" className="block text-center bg-[#262C53] text-white py-3 rounded hover:bg-[#1a1f3a]">Parent</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
