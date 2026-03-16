"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../Icons";
import { Button } from "../UI";

const sidebarItems = [
  { key: "dashboard", label: "Dasbor", icon: "LayoutDashboard" },
  { key: "hero", label: "Spanduk Hero", icon: "Image" },
  { key: "sections", label: "Judul Bagian", icon: "Type" },
  { key: "berita", label: "Berita", icon: "Newspaper" },
  { key: "aplikasi", label: "Aplikasi", icon: "ExternalLink" },
  { key: "peraturan", label: "Peraturan", icon: "FileText" },
];

export default function Sidebar({ subTab, setSubTab, currentUser, onLogout, isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNav = (key) => {
    setSubTab(key);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden backdrop-blur-sm animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`fixed md:relative z-50 w-64 bg-white border-r border-gray-200 h-full flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-200 justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mr-3 shadow-sm">
              <Icons.Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-[20px] text-gray-900 tracking-tight">
              Portal<span className="text-primary">CRM</span>
            </span>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</p>
          {sidebarItems.map(({ key, label, icon }) => {
            const Icon = Icons[icon];
            return (
              <button
                key={key}
                onClick={() => handleNav(key)}
                className={`w-full flex items-center px-3 py-2.5 rounded-[10px] text-[14px] font-semibold transition-all ${
                  subTab === key ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 opacity-90" />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-2 rounded-[10px] hover:bg-gray-50 mb-2">
            <div className="w-9 h-9 rounded-full bg-indigo-50 text-primary flex items-center justify-center font-bold border border-indigo-100 uppercase">
              {currentUser.name?.charAt(0) || "A"}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-[14px] font-semibold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-[12px] text-gray-500 capitalize">{currentUser.role}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full text-[14px] text-gray-500 justify-start px-2 hover:bg-gray-50" onClick={onLogout}>
            <Icons.LogOut className="w-4 h-4 mr-2" /> Keluar
          </Button>
        </div>
      </aside>
    </>
  );
}