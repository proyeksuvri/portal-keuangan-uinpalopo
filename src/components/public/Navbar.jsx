"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { Button } from "../UI";

export default function Navbar({ activeTab, setActiveTab, currentUser }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setActiveTab("home");
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Icons.Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-[20px] text-gray-900 tracking-tight">
            Portal<span className="text-primary">Keuangan</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { id: "home", label: "Beranda" },
            { id: "aplikasi", label: "Aplikasi" },
            { id: "peraturan", label: "Peraturan" },
            { id: "berita", label: "Berita" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[14px] font-semibold transition-all relative py-1 ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in slide-in-from-left duration-300"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center">
          {currentUser ? (
            <Button
              variant="outline"
              className="py-2.5 text-[14px] px-4 md:px-6"
              onClick={() => navigate("/admin")}
            >
              <Icons.LayoutDashboard className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Ruang Kerja</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              className="py-2.5 px-6 text-[14px]"
              onClick={() => navigate("/login")}
            >
              Masuk
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}