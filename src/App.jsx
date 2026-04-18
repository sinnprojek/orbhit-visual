// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // <-- 1. IMPORT TOASTER DI SINI

import MainLayout from '@/pages/MainLayout';
import LoginPage from '@/pages/LoginPage';
import GalleryPage from '@/pages/GalleryPage';
import DetailPage from '@/pages/DetailPage';
import AdminLayout from '@/layouts/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import ManageWorksPage from '@/pages/admin/ManageWorksPage';
import CustomCursor from '@/components/CustomCursor';
import ProtectedRoute from '@/auth/ProtectedRoute';

export default function App() {
  return (
    <>
      <CustomCursor />
      <Toaster position="top-right" reverseOrder={false} /> {/* <-- 2. LETAKKAN DI SINI */}
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/gallery/:id" element={<DetailPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="works" element={<ManageWorksPage />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}