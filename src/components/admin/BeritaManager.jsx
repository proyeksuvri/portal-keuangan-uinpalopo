"use client";

import React, { useState, useMemo } from "react";
import { Icons } from "../Icons";
import { Card, Button } from "../UI";
import { gasDelete } from "../../utils/gasApi";
import { FALLBACK_IMAGE } from "../../config";

export default function BeritaManager({ berita, onEdit, onAdd, onDelete }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBerita = useMemo(() => {
    if (!searchQuery) return berita;
    const q = searchQuery.toLowerCase();
    return berita?.filter(item => 
      item.judul?.toLowerCase().includes(q) || 
      item.ringkasan?.toLowerCase().includes(q)
    );
  }, [berita, searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        const res = await gasDelete("berita", id);
        if (res.success) onDelete("berita", id);
      } catch (err) {
        alert("Gagal menghapus: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Manajemen Berita</h2>
          <p className="text-sm text-gray-500">Publikasikan informasi dan pembaruan terbaru.</p>
        </div>
        <Button onClick={() => onAdd("berita")} className="flex items-center w-full md:w-auto">
          <Icons.Plus className="w-4 h-4 mr-2" /> Tulis Berita
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icons.Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-[12px] bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="Cari judul atau ringkasan berita..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBerita?.map((item) => (
          <Card key={item.id} noPadding className="flex flex-col sm:flex-row group overflow-hidden">
            <div className="w-full sm:w-40 h-48 sm:h-auto bg-gray-100 shrink-0 relative overflow-hidden">
              <img
                src={item.gambar_url || FALLBACK_IMAGE}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-500 uppercase tracking-wider">
                    {new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
                  </span>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost_primary" onClick={() => onEdit("berita", item)}>
                      <Icons.Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost_danger" onClick={() => handleDelete(item.id)}>
                      <Icons.Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 truncate group-hover:text-primary transition-colors">{item.judul}</h4>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{item.ringkasan}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredBerita?.length === 0 && (
        <div className="py-12 text-center bg-white rounded-[16px] border border-dashed border-gray-200">
          <Icons.Search className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Tidak ada berita yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}