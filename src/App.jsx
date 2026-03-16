// src/App.jsx
// Root komponen — routing antar: portal publik, login, admin dashboard

import { useState } from "react";
import { usePortalData } from "./hooks/usePortalData";
import PublicPortal from "./components/PublicPortal";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import { Icons } from "./components/Icons";
import { Card, Button } from "./components/UI";

export default function App() {
  const { data, loading, error, setData } = usePortalData();
  const [view, setView] = useState("public"); // "public" | "login" | "admin"
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setView(user.role === "admin" ? "admin" : "public");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView("public");
  };

  // Preloader
  if (loading && !data.berita.length) return null;

  // Error state
  if (error)
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

  if (view === "login")
    return (
      <LoginPage
        onSuccess={handleLoginSuccess}
        onCancel={() => setView("public")}
      />
    );

  if (view === "admin" && currentUser?.role === "admin")
    return (
      <AdminDashboard
        data={data}
        setData={setData}
        currentUser={currentUser}
        onGoPublic={() => setView("public")}
        onLogout={handleLogout}
      />
    );

  return (
    <PublicPortal
      data={data}
      currentUser={currentUser}
      onLogin={() => setView("login")}
      onGoAdmin={() => setView("admin")}
    />
  );
}
