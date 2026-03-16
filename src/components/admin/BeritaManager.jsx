"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Button } from "../UI";
import { gasDelete } from "../../utils/gasApi";
import { FALLBACK_IMAGE } from "../../config";

export default function BeritaManager({ berita, onEdit, onAdd, onDelete }) {
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Manajemen Berita</h2>
        <Button onClick={() => onAdd("berita")} className="flex items-center">
          <Icons.Plus className="w-4 h-4 mr-2" /> Tulis Berita
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {berita?.map((item) => (
          <Card key={item.id} noPadding className="flex group">
            <div className="w-40 h-full bg-gray-100 shrink-0 relative overflow-hidden">
              <img
                src={item.gambar_url || FALLBACK_IMAGE}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-medium text-gray-500">
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
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
              <h4 className="font-bold text-gray-900 mb-2 truncate">{item.judul}</h4>
              <p className="text-sm text-gray-500 line-clamp-2">{item.ringkasan}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}