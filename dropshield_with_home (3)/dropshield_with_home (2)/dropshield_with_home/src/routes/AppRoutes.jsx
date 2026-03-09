import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import ParentLogin from "../pages/ParentLogin.jsx";
import ParentDashboard from "../pages/ParentDashboard.jsx";
import TeacherDashboard from "../pages/TeacherDashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home page - first page */}
        <Route path="/" element={<Home />} />

        {/* Parent */}
        <Route path="/parent/login" element={<ParentLogin />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />

        {/* Teacher */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* 404 */}
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;