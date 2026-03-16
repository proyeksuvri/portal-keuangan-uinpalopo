// ============================================================
// KONFIGURASI UTAMA — Ubah nilai GAS_WEB_APP_URL sesuai
// URL Web App Google Apps Script Anda.
// ============================================================
export const GAS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbzJCYP2VUoOKtLjD1S4yH9U1ygKP4qf0EeQQgh9wBj5UTPMiv6PQGisihzsuTDOf18rmA/exec";

export const DEFAULT_HERO = {
  id: "hero_1",
  badge: "Sistem Informasi Terpadu",
  title1: "Pusat Layanan Data Keuangan",
  title2: "UIN Palopo",
  description:
    "Akses cepat ke berbagai sistem aplikasi keuangan, pembaruan regulasi terbaru, dan informasi anggaran secara transparan dan terintegrasi dalam satu platform cerdas.",
  btn1_text: "Mulai Eksplorasi",
  btn1_target: "aplikasi",
  btn2_text: "Lihat Regulasi Terbaru",
  btn2_target: "peraturan",
  bg_image_url: "",
};

export const DEFAULT_SECTIONS = [
  {
    id: "sec_1",
    section_key: "aplikasi",
    title: "Portal Aplikasi",
    subtitle: "Sistem terintegrasi kementerian keuangan",
  },
  {
    id: "sec_2",
    section_key: "berita",
    title: "Berita & Pembaruan",
    subtitle: "Informasi terbaru seputar anggaran & keuangan",
  },
  {
    id: "sec_3",
    section_key: "peraturan",
    title: "Regulasi Terkini",
    subtitle: "Arsip dokumen & landasan hukum",
  },
];

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400&h=250";
