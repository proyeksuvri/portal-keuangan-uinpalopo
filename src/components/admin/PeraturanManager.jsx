"use client";

import React, { useState, useMemo } from "react";
import { Icons } from "../Icons";
import { Card, Button, Badge } from "../UI";
import { gasDelete } from "../../utils/gasApi";

export default function PeraturanManager({ peraturan, onEdit, onAdd, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeraturan = useMemo(() => {
    if (!searchQuery) return peraturan;
    const q = searchQuery.toLowerCase();
    return peraturan?.filter(reg => 
      reg.nomor?.toLowerCase().includes(q) || 
      reg.tentang?.toLowerCase().includes(q) ||
      reg.tahun?.toString().includes(q)
    );
  }, [peraturan, searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus peraturan ini?")) {
      try {
        const res = await gasDelete("peraturan", id);
        if (res.success) onDelete("peraturan", id);
      } catch (err) {
        alert("Gagal menghapus: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manajemen Peraturan</h2>
          <p className="text-sm text-gray-500">Kelola dokumen hukum dan regulasi keuangan.</p>
        </div>
        <Button onClick={() => onAdd("peraturan")} className="flex items-center w-full md:w-auto">
          <Icons.Plus className="w-4 h-4 mr-2" /> Tambah Peraturan
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icons.Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="Cari nomor, tahun, atau tentang peraturan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card noPadding>
        <div className="divide-y divide-gray-100">
          {filteredPeraturan?.map((reg) => (
            <div key={reg.id} className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="p-2.5 bg-indigo-50 text-primary rounded-[10px] border border-indigo-100">
                  <Icons.FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-gray-900 truncate">{reg.nomor}</p>
                    <Badge variant="outline" className="py-0 h-5 text-[10px]">{reg.tahun}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 truncate max-w-md">{reg.tentang}</p>
                </div>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost_primary" onClick={() => onEdit("peraturan", reg)}>
                  <Icons.Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost_danger" onClick={() => handleDelete(reg.id)}>
                  <Icons.Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {filteredPeraturan?.length === 0 && (
          <div className="p-12 text-center">
            <Icons.Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Tidak ada peraturan yang ditemukan.</p>
          </div>
        )}
      </Card>
    </div>
  );
}