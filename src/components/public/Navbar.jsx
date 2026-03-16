"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { Button } from "../UI";

export default function Navbar({ activeTab, setActiveTab, currentUser }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    setActiveTab("home");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Beranda" },
    { id: "aplikasi", label: "Aplikasi" },
    { id: "peraturan", label: "Peraturan" },
    { id: "berita", label: "Berita" }
  ];

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((tab) => (
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

        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            {currentUser ? (
              <Button
                variant="outline"
                className="py-2.5 text-[14px] px-6"
                onClick={() => navigate("/admin")}
              >
                <Icons.LayoutDashboard className="w-4 h-4 mr-2" />
                Ruang Kerja
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
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-primary"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              {currentUser ? (
                <Button
                  variant="outline"
                  className="w-full py-3"
                  onClick={() => navigate("/admin")}
                >
                  <Icons.LayoutDashboard className="w-4 h-4 mr-2" />
                  Ruang Kerja
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full py-3"
                  onClick={() => navigate("/login")}
                >
                  Masuk ke Sistem
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}