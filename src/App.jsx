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
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
        <div className="max-w-7xl w-full space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-[400px] w-full" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    );
  }

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