"use client";

import React from "react";
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

export default function Sidebar({ subTab, setSubTab, currentUser, onLogout, onGoPublic }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex shrink-0">
      <div className="h-20 flex items-center px-6 border-b border-gray-200 cursor-pointer" onClick={onGoPublic}>
        <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mr-3 shadow-sm">
          <Icons.Building2 className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-bold text-[20px] text-gray-900 tracking-tight">
          Portal<span className="text-primary">CRM</span>
        </span>
      </div>
      <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</p>
        {sidebarItems.map(({ key, label, icon }) => {
          const Icon = Icons[icon];
          return (
            <button
              key={key}
              onClick={() => setSubTab(key)}
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
          <div className="w-9 h-9 rounded-full bg-indigo-50 text-primary flex items-center justify-center font-bold border border-indigo-100">
            {currentUser.name.charAt(0)}
          </div>
          <div className="ml-3 flex-1 overflow-hidden">
            <p className="text-[14px] font-semibold text-gray-900 truncate">{currentUser.name}</p>
            <p className="text-[12px] text-gray-500">{currentUser.role}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full text-[14px] text-gray-500 justify-start px-2 hover:bg-gray-50" onClick={onLogout}>
          <Icons.LogOut className="w-4 h-4 mr-2" /> Keluar
        </Button>
      </div>
    </aside>
  );
}