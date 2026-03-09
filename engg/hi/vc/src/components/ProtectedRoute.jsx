import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const student = localStorage.getItem('studentData');
    const mentor = localStorage.getItem('mentorData');
    const parent = localStorage.getItem('parentData');
    const admin = localStorage.getItem('adminToken'); // Assuming admin uses a token

    // Basic check: is there ANY form of authentication?
    const isAuthenticated = token || student || mentor || parent || admin;

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
