"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, Badge } from "../UI";

export default function PeraturanList({ peraturan, title, subtitle, isFullWidth }) {
  return (
    <section className={isFullWidth ? "lg:col-span-3" : "lg:col-span-1"}>
      <div className="mb-8">
        <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-[16px] text-gray-500">{subtitle}</p>
      </div>
      <Card noPadding={true}>
        <div className="divide-y divide-gray-100">
          {peraturan?.map((reg) => (
            <div
              key={reg.id}
              className="p-6 hover:bg-gray-50 transition-colors flex items-start space-x-4"
            >
              <div className="mt-1 p-2.5 bg-indigo-50 rounded-[10px] text-primary border border-indigo-100 shadow-sm">
                <Icons.FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h5
                    className="font-semibold text-[14px] font-display text-gray-900 truncate"
                    title={reg.nomor}
                  >
                    {reg.nomor}
                  </h5>
                  <Badge variant="outline" className="w-max text-[12px] py-0.5">
                    {reg.tahun}
                  </Badge>
                </div>
                <p className="text-[14px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                  {reg.tentang}
                </p>
                <a
                  href={reg.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-primary hover:text-indigo-700 inline-flex items-center"
                >
                  Unduh PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}