"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Button } from "../UI";

export default function HeroManager({ hero, onEdit }) {
  const item = hero?.[0] || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Konfigurasi Spanduk Hero</h2>
        <Button onClick={() => onEdit("hero", item)} className="flex items-center">
          <Icons.Edit className="w-4 h-4 mr-2" /> Edit Spanduk
        </Button>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="relative h-64 bg-gray-900">
          {item.bg_image_url ? (
            <img 
              src={item.bg_image_url} 
              className="w-full h-full object-cover opacity-60" 
              alt="Hero Preview" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-violet-700">
              <Icons.Image className="w-16 h-16 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 p-10 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[12px] font-bold w-fit mb-4 border border-white/30">
              {item.badge || "Sistem Informasi Terpadu"}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {item.title1} <span className="text-indigo-300">{item.title2}</span>
            </h1>
            <p className="text-white/80 max-w-xl text-sm line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase mb-2">Tombol Utama</p>
              <div className="p-3 bg-gray-50 rounded-[12px] border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{item.btn1_text}</p>
                <p className="text-[12px] text-gray-500 truncate">Target: {item.btn1_target}</p>
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase mb-2">Tombol Sekunder</p>
              <div className="p-3 bg-gray-50 rounded-[12px] border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{item.btn2_text}</p>
                <p className="text-[12px] text-gray-500 truncate">Target: {item.btn2_target}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}