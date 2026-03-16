"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { Button } from "../UI";

export default function AdminHeader({ subTab, onMenuClick, onGoPublic }) {
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 shrink-0">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icons.Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-2">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 capitalize">
            {subTab === "aplikasi" ? "Manajemen Aplikasi" : subTab === "dashboard" ? "Ringkasan" : `Kelola ${subTab}`}
          </h1>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="text-xs md:text-sm py-2 px-3 md:px-4"
        onClick={() => navigate("/")}
      >
        Buka Portal
      </Button>
    </header>
  );
}