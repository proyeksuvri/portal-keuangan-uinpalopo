"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { Button } from "../UI";

export default function Navbar({ activeTab, setActiveTab, currentUser }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => setActiveTab("home")}
        >
          <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
            <Icons.Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-[20px] text-gray-900 tracking-tight">
            Portal<span className="text-primary">Keuangan</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["home", "aplikasi", "peraturan", "berita"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[14px] font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab === "home" ? "Beranda" : tab}
            </button>
          ))}
        </nav>

        <div>
          {currentUser ? (
            <Button
              variant="outline"
              className="py-2.5 text-[14px]"
              onClick={() => navigate("/admin")}
            >
              <Icons.LayoutDashboard className="w-4 h-4 mr-2" /> Ruang Kerja
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