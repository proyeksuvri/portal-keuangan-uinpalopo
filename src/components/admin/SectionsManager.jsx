"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Button } from "../UI";

export default function SectionsManager({ sections, onEdit }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Pengaturan Judul Bagian</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections?.map((sec) => (
          <Card key={sec.id} noPadding className="group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-[10px] bg-indigo-50 text-primary flex items-center justify-center border border-indigo-100 uppercase font-bold text-[12px]">
                  {sec.section_key?.substring(0, 3)}
                </div>
                <Button variant="ghost_primary" onClick={() => onEdit("sections", sec)}>
                  <Icons.Edit className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[12px] font-bold text-gray-400 uppercase mb-1">Judul</p>
              <h4 className="font-bold text-gray-900 mb-3">{sec.title}</h4>
              <p className="text-[12px] font-bold text-gray-400 uppercase mb-1">Sub-judul</p>
              <p className="text-sm text-gray-500 line-clamp-2">{sec.subtitle}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}