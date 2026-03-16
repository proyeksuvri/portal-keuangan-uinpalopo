"use client";

import React from "react";
import { Icons, renderIcon } from "../Icons";
import { Card } from "../UI";

export default function AplikasiList({ links, title, subtitle, onSeeAll, isHome }) {
  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-[16px] text-gray-500">{subtitle}</p>
        </div>
        {isHome && (
          <button
            onClick={onSeeAll}
            className="text-[14px] font-semibold text-primary hover:text-indigo-700 hidden sm:flex items-center"
          >
            Lihat Semua <Icons.ChevronRight className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {links?.map((link) => (
          <a
            key={link.id}
            href={link.url && link.url !== "#" ? link.url : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-[16px] border border-gray-200 p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-[12px] bg-indigo-50 text-primary flex items-center justify-center mb-6 border border-indigo-100">
              {renderIcon(link.icon, { className: "w-6 h-6" })}
            </div>
            <h4 className="text-[18px] font-semibold font-display text-gray-900 mb-2 leading-tight">
              {link.nama_aplikasi}
            </h4>
            <p className="text-[14px] text-gray-500 mb-6 flex-grow line-clamp-3 leading-relaxed">
              {link.deskripsi}
            </p>
            <div className="text-[14px] font-semibold text-primary flex items-center mt-auto group">
              Buka Aplikasi{" "}
              <Icons.ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}