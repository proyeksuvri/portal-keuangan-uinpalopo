"use client";

import React from "react";
import { Icons, renderIcon } from "../Icons";
import { Card, Button } from "../UI";
import { gasDelete } from "../../utils/gasApi";

export default function AplikasiManager({ links, onEdit, onAdd, onDelete }) {
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Manajemen Aplikasi</h2>
        <Button onClick={() => onAdd("links")} className="flex items-center">
          <Icons.Plus className="w-4 h-4 mr-2" /> Tambah Aplikasi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {links?.map((link) => (
          <Card key={link.id} noPadding className="group">
            <div className="p-6">
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
              <h4 className="font-bold text-gray-900 mb-1">{link.nama_aplikasi}</h4>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{link.deskripsi}</p>
              <div className="text-[12px] text-gray-400 font-mono truncate bg-gray-50 p-2 rounded-md">
                {link.url}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}