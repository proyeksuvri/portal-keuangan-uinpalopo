"use client";

import React, { useState, useMemo } from "react";
import { Icons, renderIcon } from "../Icons";
import { Card, Button } from "../UI";
import { gasDelete } from "../../utils/gasApi";

export default function AplikasiManager({ links, onEdit, onAdd, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLinks = useMemo(() => {
    if (!searchQuery) return links;
    const q = searchQuery.toLowerCase();
    return links?.filter(link => 
      link.nama_aplikasi?.toLowerCase().includes(q) || 
      link.deskripsi?.toLowerCase().includes(q)
    );
  }, [links, searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus aplikasi ini?")) {
      try {
        const res = await gasDelete("links", id);
        if (res.success) onDelete("links", id);
      } catch (err) {
        alert("Gagal menghapus: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manajemen Aplikasi</h2>
          <p className="text-sm text-gray-500">Kelola daftar aplikasi yang muncul di portal utama.</p>
        </div>
        <Button onClick={() => onAdd("links")} className="flex items-center w-full md:w-auto">
          <Icons.Plus className="w-4 h-4 mr-2" /> Tambah Aplikasi
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icons.Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="Cari aplikasi berdasarkan nama atau deskripsi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLinks?.map((link) => (
          <Card key={link.id} noPadding className="group flex flex-col h-full">
            <div className="p-6 flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-[12px] bg-indigo-50 text-primary flex items-center justify-center border border-indigo-100">
                  {renderIcon(link.icon, { className: "w-6 h-6" })}
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost_primary" onClick={() => onEdit("links", link)}>
                    <Icons.Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost_danger" onClick={() => handleDelete(link.id)}>
                    <Icons.Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{link.nama_aplikasi}</h4>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">{link.deskripsi}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
              <div className="text-[11px] font-mono text-gray-400 truncate flex items-center">
                <Icons.ExternalLink className="w-3 h-3 mr-1.5 shrink-0" />
                {link.url}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredLinks?.length === 0 && (
        <div className="py-12 text-center bg-white rounded-[16px] border border-dashed border-gray-200">
          <Icons.Search className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Tidak ada aplikasi yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}