"use client";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { usePortalData } from "./hooks/usePortalData";
import PublicPortal from "./components/PublicPortal";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import { Icons } from "./components/Icons";
import { Card, Button, Skeleton } from "./components/UI";

export default function App() {
  const { data, loading, error, setData } = usePortalData();
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (loading && !data.berita.length) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center p-6 space-y-8">
        <div className="max-w-7xl w-full flex justify-between items-center py-4">
          <Skeleton className="h-10 w-48" />
          <div className="flex space-x-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="max-w-7xl w-full">
          <Skeleton className="h-[450px] w-full rounded-[24px]" />
        </div>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-56 w-full rounded-[16px]" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4 font-sans">
        <Card className="max-w-md w-full text-center p-10">
          <div className="w-16 h-16 bg-red-50 text-error rounded-full flex items-center justify-center mx-auto mb-6">
            <Icons.AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-[24px] font-bold font-display text-gray-900 mb-2">
            Koneksi Gagal
          </h2>
          <p className="text-[16px] text-gray-500 mb-8 leading-relaxed">
            {error}. Pastikan URL Google Apps Script sudah benar atau periksa koneksi internet Anda.
          </p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Coba Segarkan Halaman
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicPortal
              data={data}
              currentUser={currentUser}
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            currentUser ? (
              <Navigate to={currentUser.role === "admin" ? "/admin" : "/"} replace />
            ) : (
              <LoginPage
                onSuccess={handleLoginSuccess}
              />
            )
          } 
        />
        <Route 
          path="/admin" 
          element={
            currentUser?.role === "admin" ? (
              <AdminDashboard
                data={data}
                setData={setData}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}