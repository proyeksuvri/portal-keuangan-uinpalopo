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
    else {
      setActiveTab(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
                berita={activeTab === "home" ? data.berita?.slice(0, 4) : filteredBerita}
                title={getSection(data.sections, "berita").title}
                subtitle={getSection(data.sections, "berita").subtitle}
                onSelect={setSelectedNews}
                isFullWidth={activeTab === "berita"}
              />
            )}

            {(activeTab === "home" || activeTab === "peraturan") && (
              <PeraturanList 
                peraturan={activeTab === "home" ? data.peraturan?.slice(0, 6) : filteredPeraturan}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                  <Icons.Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-[22px] text-gray-900 tracking-tight">Portal<span className="text-primary">Keuangan</span></span>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6 font-medium">
                Sistem informasi keuangan terpadu yang menyajikan data transparansi, regulasi, dan aplikasi keuangan bagi seluruh sivitas akademika UIN Palopo.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Icons.Activity className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Icons.PieChart className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Navigasi Cepat</h4>
              <ul className="space-y-4">
                {['Beranda', 'Aplikasi', 'Peraturan', 'Berita'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => setActiveTab(item.toLowerCase())}
                      className="text-gray-500 hover:text-primary transition-colors font-medium flex items-center"
                    >
                      <Icons.ChevronRight className="w-4 h-4 mr-2 opacity-50" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-500 font-medium">
                  <Icons.Landmark className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <span>Kampus I UIN Palopo, Jl. Agatis No. 1, Kota Palopo, Sulawesi Selatan</span>
                </li>
                <li className="flex items-center text-gray-500 font-medium">
                  <Icons.Bell className="w-5 h-5 mr-3 text-primary shrink-0" />
                  <span>keuangan@uinpalopo.ac.id</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[14px] text-gray-500 font-medium space-y-4 md:space-y-0">
            <div>© {new Date().getFullYear()} Sub Bagian Keuangan UIN Palopo.</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}