"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card, EmptyState } from "../UI";
import { FALLBACK_IMAGE } from "../../config";

export default function BeritaList({ berita, title, subtitle, onSelect, isFullWidth }) {
  if (!berita || berita.length === 0) {
    return (
      <section className={isFullWidth ? "lg:col-span-3" : "lg:col-span-2"}>
        <div className="mb-8">
          <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">{title}</h3>
          <p className="text-[16px] text-gray-500">{subtitle}</p>
        </div>
        <EmptyState message="Coba gunakan kata kunci lain untuk mencari berita." icon={Icons.Newspaper} />
      </section>
    );
  }

  return (
    <section className={isFullWidth ? "lg:col-span-3" : "lg:col-span-2"}>
      <div className="mb-8">
        <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-[16px] text-gray-500">{subtitle}</p>
      </div>
      <div className={`grid gap-8 ${isFullWidth ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {berita.map((item) => (
          <Card
            key={item.id}
            noPadding={true}
            className="flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            onClick={() => onSelect(item)}
          >
            <div className="h-52 overflow-hidden relative border-b border-gray-100 bg-gray-100">
              <img
                src={item.gambar_url}
                loading="lazy"
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-gray-900 shadow-sm uppercase tracking-wider">
                  Berita
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-[12px] font-bold text-gray-400 mb-4 space-x-2 uppercase tracking-wide">
                <Icons.Calendar className="w-4 h-4 text-primary" />
                <span>
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h4 className="text-[19px] font-bold font-display text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {item.judul}
              </h4>
              <p className="text-[15px] text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
                {item.ringkasan}
              </p>
              <div className="text-[14px] font-bold text-primary inline-flex items-center mt-auto group-hover:gap-2 transition-all">
                Baca Selengkapnya <Icons.ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}