"use client";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { usePortalData } from "./hooks/usePortalData";
import PublicPortal from "./components/PublicPortal";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import { Icons } from "./components/Icons";
import { Card, Button } from "./components/UI";

export default function App() {
  const { data, loading, error, setData } = usePortalData();
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Preloader or initial loading state
  if (loading && !data.berita.length) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Memuat data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4 font-sans">
        <Card className="max-w-md w-full text-center">
          <Icons.AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
          <h2 className="text-[24px] font-bold font-display text-gray-900 mb-2">
            Koneksi Gagal
          </h2>
          <p className="text-[16px] text-gray-500 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Coba Lagi
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route 
          path="/" 
          element={
            <PublicPortal
              data={data}
              currentUser={currentUser}
              onGoAdmin={() => window.location.href = "/admin"}
            />
          } 
        />

        {/* Login Route */}
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

        {/* Admin Route */}
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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}