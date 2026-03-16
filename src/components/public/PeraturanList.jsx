"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Badge, EmptyState } from "../UI";

export default function PeraturanList({ peraturan, title, subtitle, isFullWidth }) {
  if (!peraturan || peraturan.length === 0) {
    return (
      <section className={isFullWidth ? "lg:col-span-3" : "lg:col-span-1"}>
        <div className="mb-8">
          <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">{title}</h3>
          <p className="text-[16px] text-gray-500">{subtitle}</p>
        </div>
        <EmptyState message="Tidak ada regulasi yang sesuai dengan kriteria Anda." icon={Icons.FileText} />
      </section>
    );
  }

  return (
    <section className={isFullWidth ? "lg:col-span-3" : "lg:col-span-1"}>
      <div className="mb-8">
        <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-[16px] text-gray-500">{subtitle}</p>
      </div>
      <Card noPadding={true} className="border-gray-100 shadow-sm">
        <div className="divide-y divide-gray-50">
          {peraturan.map((reg) => (
            <div
              key={reg.id}
              className="p-6 hover:bg-indigo-50/30 transition-all flex items-start space-x-4 group"
            >
              <div className="mt-1 p-3 bg-white rounded-[14px] text-primary border border-gray-100 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <Icons.FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h5
                    className="font-bold text-[15px] font-display text-gray-900 truncate"
                    title={reg.nomor}
                  >
                    {reg.nomor}
                  </h5>
                  <Badge variant="outline" className="w-max text-[10px] bg-white">
                    Thn. {reg.tahun}
                  </Badge>
                </div>
                <p className="text-[14px] text-gray-500 line-clamp-2 mb-4 leading-relaxed font-medium">
                  {reg.tentang}
                </p>
                <a
                  href={reg.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-primary hover:text-indigo-800 inline-flex items-center bg-indigo-50 px-3 py-1.5 rounded-full transition-colors"
                >
                  Lihat Dokumen <Icons.ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}