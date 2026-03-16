"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Button, Badge } from "../UI";
import { gasDelete } from "../../utils/gasApi";

export default function PeraturanManager({ peraturan, onEdit, onAdd, onDelete }) {
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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Manajemen Peraturan</h2>
        <Button onClick={() => onAdd("peraturan")} className="flex items-center">
          <Icons.Plus className="w-4 h-4 mr-2" /> Tambah Peraturan
        </Button>
      </div>

      <Card noPadding>
        <div className="divide-y divide-gray-100">
          {peraturan?.map((reg) => (
            <div key={reg.id} className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4 min-w-0">
                <div className="p-2.5 bg-indigo-50 text-primary rounded-[10px] border border-indigo-100">
                  <Icons.FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-gray-900 truncate">{reg.nomor}</p>
                    <Badge variant="outline" className="py-0">{reg.tahun}</Badge>
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
      </Card>
    </div>
  );
}