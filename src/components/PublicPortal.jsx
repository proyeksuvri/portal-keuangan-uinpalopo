// src/components/PublicPortal.jsx
// Tampilan portal publik: header, hero, aplikasi, berita, peraturan, footer, modal berita

import { useState } from "react";
import { Icons, renderIcon } from "./Icons";
import { Card, Badge, Button, Modal } from "./UI";
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

export default function PublicPortal({ data, currentUser, onLogin, onGoAdmin }) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNews, setSelectedNews] = useState(null);

  const hero = data.hero?.[0] || DEFAULT_HERO;

  const handleHeroBtnClick = (target) => {
    if (!target) return;
    if (target.startsWith("http")) window.open(target, "_blank", "noopener,noreferrer");
    else setActiveTab(target);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans flex flex-col">
      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <Icons.Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-[20px] text-gray-900 tracking-tight">
              Portal<span className="text-primary">Keuangan</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {["home", "aplikasi", "peraturan", "berita"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[14px] font-semibold transition-colors capitalize ${
                  activeTab === tab
                    ? "text-primary"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab === "home" ? "Beranda" : tab}
              </button>
            ))}
          </nav>

          <div>
            {currentUser ? (
              <Button
                variant="outline"
                className="py-2.5 text-[14px]"
                onClick={onGoAdmin}
              >
                <Icons.LayoutDashboard className="w-4 h-4 mr-2" /> Ruang Kerja
              </Button>
            ) : (
              <Button
                variant="primary"
                className="py-2.5 px-6 text-[14px]"
                onClick={onLogin}
              >
                Masuk
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow w-full">
        {/* ── Hero ── */}
        {activeTab === "home" && (
          <section className="bg-white border-b border-gray-200 relative overflow-hidden">
            {hero.bg_image_url && (
              <div className="absolute inset-0 z-0">
                <img
                  src={hero.bg_image_url}
                  className="w-full h-full object-cover"
                  alt="Latar Belakang"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
              </div>
            )}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center relative z-10">
              <Badge
                variant="outline"
                className="mb-6 rounded-full border-gray-200 text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-sm"
              >
                {hero.badge}
              </Badge>
              <h1 className="text-[36px] md:text-[56px] font-bold font-display text-gray-900 leading-tight mb-6 max-w-4xl tracking-tight drop-shadow-sm">
                {hero.title1} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent drop-shadow-sm">
                  {hero.title2}
                </span>
              </h1>
              <p className="text-[18px] text-gray-700 font-medium mb-10 max-w-2xl leading-relaxed drop-shadow-sm">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  variant="primary"
                  className="px-8 py-4 shadow-lg"
                  onClick={() => handleHeroBtnClick(hero.btn1_target)}
                >
                  {hero.btn1_text}
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white"
                  onClick={() => handleHeroBtnClick(hero.btn2_target)}
                >
                  {hero.btn2_text}
                </Button>
              </div>
            </div>
          </section>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* ── Aplikasi ── */}
          {(activeTab === "home" || activeTab === "aplikasi") && (
            <section className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
                    {getSection(data.sections, "aplikasi").title}
                  </h3>
                  <p className="text-[16px] text-gray-500">
                    {getSection(data.sections, "aplikasi").subtitle}
                  </p>
                </div>
                {activeTab === "home" && (
                  <button
                    onClick={() => setActiveTab("aplikasi")}
                    className="text-[14px] font-semibold text-primary hover:text-indigo-700 hidden sm:flex items-center"
                  >
                    Lihat Semua <Icons.ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.links?.map((link) => (
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
                {(!data.links || data.links.length === 0) && (
                  <p className="text-gray-500 col-span-full">
                    Belum ada aplikasi yang ditambahkan.
                  </p>
                )}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ── Berita ── */}
            {(activeTab === "home" || activeTab === "berita") && (
              <section
                className={`lg:col-span-2 ${
                  activeTab === "berita" ? "lg:col-span-3" : ""
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
                    {getSection(data.sections, "berita").title}
                  </h3>
                  <p className="text-[16px] text-gray-500">
                    {getSection(data.sections, "berita").subtitle}
                  </p>
                </div>
                <div
                  className={`grid gap-8 ${
                    activeTab === "berita"
                      ? "md:grid-cols-2 lg:grid-cols-3"
                      : "md:grid-cols-2"
                  }`}
                >
                  {data.berita?.map((item) => (
                    <Card
                      key={item.id}
                      noPadding={true}
                      className="flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => setSelectedNews(item)}
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
                            {new Date(item.tanggal).toLocaleDateString(
                              "id-ID",
                              { day: "numeric", month: "long", year: "numeric" }
                            )}
                          </span>
                        </div>
                        <h4 className="text-[18px] font-semibold font-display text-gray-900 mb-3 leading-snug line-clamp-2">
                          {item.judul}
                        </h4>
                        <p className="text-[14px] text-gray-500 mb-6 line-clamp-3 leading-relaxed flex-grow">
                          {item.ringkasan}
                        </p>
                        <span className="text-[14px] font-semibold text-primary inline-flex items-center mt-auto">
                          Baca Artikel{" "}
                          <Icons.ChevronRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </Card>
                  ))}
                  {(!data.berita || data.berita.length === 0) && (
                    <p className="text-gray-500 col-span-full">
                      Belum ada berita yang diterbitkan.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* ── Peraturan ── */}
            {(activeTab === "home" || activeTab === "peraturan") && (
              <section
                className={`lg:col-span-1 ${
                  activeTab === "peraturan" ? "lg:col-span-3" : ""
                }`}
              >
                <div className="mb-8">
                  <h3 className="text-[24px] font-bold font-display text-gray-900 mb-2">
                    {getSection(data.sections, "peraturan").title}
                  </h3>
                  <p className="text-[16px] text-gray-500">
                    {getSection(data.sections, "peraturan").subtitle}
                  </p>
                </div>
                <Card noPadding={true}>
                  <div className="divide-y divide-gray-100">
                    {data.peraturan?.map((reg) => (
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
                            <Badge
                              variant="outline"
                              className="w-max text-[12px] py-0.5"
                            >
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
                    {(!data.peraturan || data.peraturan.length === 0) && (
                      <div className="p-6 text-[14px] text-gray-500 text-center">
                        Belum ada data peraturan.
                      </div>
                    )}
                  </div>
                  {activeTab === "home" && data.peraturan?.length > 0 && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                      <Button
                        variant="ghost"
                        className="w-full text-[14px]"
                        onClick={() => setActiveTab("peraturan")}
                      >
                        Lihat Seluruh Arsip
                      </Button>
                    </div>
                  )}
                </Card>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* ── Modal Berita ── */}
      <Modal
        isOpen={!!selectedNews}
        onClose={() => setSelectedNews(null)}
        title="Pratinjau Artikel"
      >
        {selectedNews && (
          <div className="space-y-6">
            <img
              src={selectedNews.gambar_url}
              loading="lazy"
              alt={selectedNews.judul}
              className="w-full h-56 object-cover rounded-[12px] shadow-sm border border-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = FALLBACK_IMAGE;
              }}
            />
            <h2 className="text-[24px] font-bold font-display text-gray-900 leading-tight">
              {selectedNews.judul}
            </h2>
            <div className="flex items-center text-[14px] font-medium text-gray-500 space-x-2">
              <Icons.Calendar className="w-4 h-4" />
              <span>
                {new Date(selectedNews.tanggal).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="text-gray-600 whitespace-pre-wrap text-[16px] leading-relaxed border-t border-gray-100 pt-6">
              {selectedNews.konten || selectedNews.ringkasan}
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setSelectedNews(null)} variant="outline">
                Tutup Artikel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                  <Icons.Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-[18px] text-gray-900 tracking-tight">
                  Portal<span className="text-primary">Keuangan</span>
                </span>
              </div>
              <p className="text-[14px] text-gray-500 max-w-sm leading-relaxed">
                Platform SaaS terpadu yang memusatkan seluruh layanan data keuangan,
                regulasi, dan informasi anggaran Universitas Islam Negeri Palopo.
              </p>
            </div>
            <div>
              <h4 className="font-bold font-display text-gray-900 mb-6">Sumber Daya</h4>
              <ul className="space-y-4 text-[14px]">
                {[
                  ["Situs Utama UIN Palopo", "#"],
                  ["Kementerian Agama RI", "#"],
                  ["Pusat Layanan Kemenkeu", "#"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-gray-500 hover:text-primary transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-display text-gray-900 mb-6">Kontak</h4>
              <ul className="space-y-4 text-[14px] text-gray-500">
                <li>Gedung Rektorat Lt. 2</li>
                <li>Jl. Agatis, Balandai</li>
                <li>Sulawesi Selatan 91914</li>
                <li className="font-semibold text-primary pt-2">
                  keu.uinpalopo@uinpalopo.ac.id
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-[14px] text-center text-gray-500 font-medium">
            © {new Date().getFullYear()} Sub Bagian Keuangan UIN Palopo. Hak cipta
            dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
