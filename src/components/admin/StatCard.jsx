"use client";

import React from "react";
import { Card } from "../UI";
import { Icons } from "../Icons";

export default function StatCard({ label, value, icon, color, isPrimary = false }) {
  const Icon = Icons[icon];
  
  if (isPrimary) {
    return (
      <Card noPadding className="p-6 relative overflow-hidden group bg-primary">
        <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center text-white mb-4 relative z-10 group-hover:scale-110 transition-transform">
          <Icons.LayoutDashboard className="w-6 h-6" />
        </div>
        <h3 className="text-[32px] font-bold font-display text-white relative z-10">{value}</h3>
        <p className="text-[14px] text-indigo-100 font-medium relative z-10">{label}</p>
      </Card>
    );
  }

  return (
    <Card noPadding className={`p-6 relative overflow-hidden group`}>
      <div className={`w-12 h-12 rounded-[12px] bg-${color}-50 border border-${color}-100 flex items-center justify-center text-${color}-600 mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-[32px] font-bold font-display text-gray-900">{value}</h3>
      <p className="text-[14px] text-gray-500 font-medium">{label}</p>
    </Card>
  );
}