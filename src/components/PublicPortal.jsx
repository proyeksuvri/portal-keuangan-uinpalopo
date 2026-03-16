"use client";

import React, { useState } from "react";
import Navbar from "./public/Navbar";
import Hero from "./public/Hero";
import { Icons, renderIcon } from "./Icons";
import { Card, Badge, Modal } from "./UI";
import { DEFAULT_HERO, FALLBACK_IMAGE } from "../config";

export default function PublicPortal({ data, currentUser }) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNews, setSelectedNews] = useState(null);
  const hero = data.hero?.[0] || DEFAULT_HERO;

  const handleHeroBtnClick = (target) => {
    if (!target) return;
    if (target.startsWith("http")) window.open(target, "_blank");
    else setActiveTab(target);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />
      <main className="flex-grow w-full">
        {activeTab === "home" && <Hero hero={hero} onBtnClick={handleHeroBtnClick} />}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
          {(activeTab === "home" || activeTab === "aplikasi") && (
            <section>
              <h3 className="text-2xl font-bold mb-8">Portal Aplikasi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.links?.map((link) => (
                  <Card key={link.id} className="hover:shadow-lg transition-all cursor-pointer">
                    <div className="h-12 w-12 rounded-lg bg-indigo-50 text-primary flex items-center justify-center mb-4">
                      {renderIcon(link.icon, { className: "w-6 h-6" })}
                    </div>
                    <h4 className="font-bold mb-2">{link.nama_aplikasi}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{link.deskripsi}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {(activeTab === "home" || activeTab === "berita") && (
            <section>
              <h3 className="text-2xl font-bold mb-8">Berita Terbaru</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.berita?.map((item) => (
                  <Card key={item.id} noPadding className="hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedNews(item)}>
                    <img src={item.gambar_url || FALLBACK_IMAGE} className="w-full h-48 object-cover" alt={item.judul} />
                    <div className="p-6">
                      <h4 className="font-bold mb-2 line-clamp-2">{item.judul}</h4>
                      <p className="text-sm text-gray-500 line-clamp-3">{item.ringkasan}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Modal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)} title="Detail Berita">
        {selectedNews && (
          <div className="space-y-4">
            <img src={selectedNews.gambar_url || FALLBACK_IMAGE} className="w-full h-56 object-cover rounded-lg" alt="" />
            <h2 className="text-2xl font-bold">{selectedNews.judul}</h2>
            <div className="text-gray-600 whitespace-pre-wrap">{selectedNews.konten || selectedNews.ringkasan}</div>
          </div>
        )}
      </Modal>

      <footer className="bg-white border-t border-gray-200 py-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sub Bagian Keuangan UIN Palopo.
      </footer>
    </div>
  );
}