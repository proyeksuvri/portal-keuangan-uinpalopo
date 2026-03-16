"use client";

import React from "react";
import { Icons } from "../Icons";
import { Card } from "../UI";
import { FALLBACK_IMAGE } from "../../config";

export default function BeritaList({ berita, title, subtitle, onSelect, isFullWidth }) {
  return (
    <section className={isFullWidth ? "lg:col-span-3" : "lg:col-span-2"}>
      <div className="mb-8">
        <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-[16px] text-gray-500">{subtitle}</p>
      </div>
      <div className={`grid gap-8 ${isFullWidth ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
        {berita?.map((item) => (
          <Card
            key={item.id}
            noPadding={true}
            className="flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="h-48 overflow-hidden relative border-b border-gray-100 bg-gray-50">
              <img
                src={item.gambar_url}
                loading="lazy"
                alt={item.judul}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-[12px] font-medium text-gray-500 mb-4 space-x-2">
                <Icons.Calendar className="w-4 h-4" />
                <span>
                  {new Date(item.tanggal).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h4 className="text-[18px] font-semibold font-display text-gray-900 mb-3 leading-snug line-clamp-2">
                {item.judul}
              </h4>
              <p className="text-[14px] text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
                {item.ringkasan}
              </p>
              <span className="text-[14px] font-semibold text-primary inline-flex items-center mt-auto">
                Baca Artikel <Icons.ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}