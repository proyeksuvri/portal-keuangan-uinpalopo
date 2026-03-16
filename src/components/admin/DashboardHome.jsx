"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Button, Badge } from "../UI";
import StatCard from "./StatCard";
import { GAS_WEB_APP_URL } from "../../config";

export default function DashboardHome({ data, currentUser, onNavigate }) {
  const stats = [
    { label: "Total Berita", value: data.berita?.length || 0, icon: "Newspaper", color: "indigo" },
    { label: "Total Aplikasi", value: data.links?.length || 0, icon: "ExternalLink", color: "blue" },
    { label: "Total Regulasi", value: data.peraturan?.length || 0, icon: "FileText", color: "purple" },
  ];

  const totalData = stats.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
        <StatCard label="Total Data" value={totalData} isPrimary icon="LayoutDashboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Selamat Datang, {currentUser?.name}</h3>
            <Badge variant="success">Sistem Aktif</Badge>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Anda sedang mengelola portal informasi keuangan UIN Palopo. Semua perubahan yang Anda lakukan di sini akan langsung disinkronkan dengan basis data Google Sheets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => onNavigate("berita")} variant="outline" className="text-sm py-2 px-4">
              <Icons.Plus className="w-4 h-4 mr-2" /> Tulis Berita Baru
            </Button>
            <Button onClick={() => onNavigate("hero")} variant="outline" className="text-sm py-2 px-4">
              <Icons.Edit className="w-4 h-4 mr-2" /> Sesuaikan Hero
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-6">Status Koneksi</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[10px] border border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase">Server GAS</span>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
                <span className="text-sm font-bold text-gray-900">Terhubung</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[10px] border border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase">Cache Lokal</span>
              <span className="text-sm font-bold text-gray-900">Aktif</span>
            </div>
            <div className="pt-2">
              <p className="text-[10px] text-gray-400 font-mono break-all line-clamp-2">
                ENDPOINT: {GAS_WEB_APP_URL.substring(0, 50)}...
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}