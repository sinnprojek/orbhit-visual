// src/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Periksa apakah ada kata sandi yang tersimpan di sessionStorage
    const isAuthenticated = sessionStorage.getItem('adminPassword');

    if (!isAuthenticated) {
        // Jika tidak ada, "lempar" pengguna kembali ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika ada, tampilkan halaman yang seharusnya (misalnya, AdminLayout)
    return children;
};

export default ProtectedRoute;