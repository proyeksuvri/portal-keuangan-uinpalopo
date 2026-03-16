"use client";

import React, { useState, useMemo } from "react";
import Navbar from "./public/Navbar";
import Hero from "./public/Hero";
import AplikasiList from "./public/AplikasiList";
import BeritaList from "./public/BeritaList";
import PeraturanList from "./public/PeraturanList";
import SearchBar from "./public/SearchBar";
import { Icons } from "./Icons";
import { Button, Modal } from "./UI";
import { DEFAULT_HERO, DEFAULT_SECTIONS, FALLBACK_IMAGE } from "../config";

function getSection(sections, key) {
  const sec = sections?.find(
    (s) => String(s.section_key).trim().toLowerCase() === key.toLowerCase()
  );
  const def = DEFAULT_SECTIONS.find((s) => s.section_key === key);
  return {
    title: sec?.title || def?.title || "",
    subtitle: sec?.subtitle || def?.subtitle || "",
  };
}

export default function PublicPortal({ data, currentUser }) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const hero = data.hero?.[0] || DEFAULT_HERO;

  const filteredBerita = useMemo(() => {
    if (!searchQuery) return data.berita;
    const q = searchQuery.toLowerCase();
    return data.berita?.filter(b => 
      b.judul?.toLowerCase().includes(q) || 
      b.ringkasan?.toLowerCase().includes(q)
    );
  }, [data.berita, searchQuery]);

  const filteredPeraturan = useMemo(() => {
    if (!searchQuery) return data.peraturan;
    const q = searchQuery.toLowerCase();
    return data.peraturan?.filter(p => 
      p.nomor?.toLowerCase().includes(q) || 
      p.tentang?.toLowerCase().includes(q)
    );
  }, [data.peraturan, searchQuery]);

  const handleHeroBtnClick = (target) => {
    if (!target) return;
    if (target.startsWith("http")) window.open(target, "_blank", "noopener,noreferrer");
    else setActiveTab(target);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />
      
      <main className="flex-grow w-full">
        {activeTab === "home" && <Hero hero={hero} onBtnClick={handleHeroBtnClick} />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {(activeTab === "home" || activeTab === "aplikasi") && (
            <AplikasiList 
              links={data.links}
              title={getSection(data.sections, "aplikasi").title}
              subtitle={getSection(data.sections, "aplikasi").subtitle}
              isHome={activeTab === "home"}
              onSeeAll={() => setActiveTab("aplikasi")}
            />
          )}

          {activeTab !== "home" && activeTab !== "aplikasi" && (
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder={`Cari ${activeTab === "berita" ? "berita" : "peraturan"}...`} 
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {(activeTab === "home" || activeTab === "berita") && (
              <BeritaList 
                berita={activeTab === "home" ? data.berita : filteredBerita}
                title={getSection(data.sections, "berita").title}
                subtitle={getSection(data.sections, "berita").subtitle}
                onSelect={setSelectedNews}
                isFullWidth={activeTab === "berita"}
              />
            )}

            {(activeTab === "home" || activeTab === "peraturan") && (
              <PeraturanList 
                peraturan={activeTab === "home" ? data.peraturan : filteredPeraturan}
                title={getSection(data.sections, "peraturan").title}
                subtitle={getSection(data.sections, "peraturan").subtitle}
                isFullWidth={activeTab === "peraturan"}
              />
            )}
          </div>
        </div>
      </main>

      <Modal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)} title="Pratinjau Artikel">
        {selectedNews && (
          <div className="space-y-6">
            <img
              src={selectedNews.gambar_url || FALLBACK_IMAGE}
              className="w-full h-56 object-cover rounded-[12px] shadow-sm border border-gray-200"
              alt={selectedNews.judul}
            />
            <h2 className="text-[24px] font-bold font-display text-gray-900 leading-tight">{selectedNews.judul}</h2>
            <div className="flex items-center text-[14px] font-medium text-gray-500 space-x-2">
              <Icons.Calendar className="w-4 h-4" />
              <span>{new Date(selectedNews.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <div className="text-gray-600 whitespace-pre-wrap text-[16px] leading-relaxed border-t border-gray-100 pt-6">
              {selectedNews.konten || selectedNews.ringkasan}
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setSelectedNews(null)} variant="outline">Tutup Artikel</Button>
            </div>
          </div>
        )}
      </Modal>

      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <Icons.Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-[18px] text-gray-900 tracking-tight">Portal<span className="text-primary">Keuangan</span></span>
          </div>
          <div className="border-t border-gray-200 pt-8 text-[14px] text-gray-500 font-medium">
            © {new Date().getFullYear()} Sub Bagian Keuangan UIN Palopo. Hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}