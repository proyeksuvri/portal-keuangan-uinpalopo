"use client";

import React from "react";

const inputClass = "w-full rounded-[10px] border border-gray-200 p-3 text-[14px] text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white";
const labelClass = "block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide";
const helperClass = "mt-1 text-[11px] text-gray-400 font-medium";

export default function AdminForm({ type, formData, setFormData }) {
  if (type === "links") {
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Nama Aplikasi</label>
          <input className={inputClass} value={formData.nama_aplikasi || ""} onChange={e => setFormData({...formData, nama_aplikasi: e.target.value})} placeholder="Contoh: SIPKD Palopo" required />
        </div>
        <div>
          <label className={labelClass}>Deskripsi Singkat</label>
          <textarea className={inputClass} rows={2} value={formData.deskripsi || ""} onChange={e => setFormData({...formData, deskripsi: e.target.value})} placeholder="Jelaskan kegunaan aplikasi ini..." required />
        </div>
        <div>
          <label className={labelClass}>URL Aplikasi</label>
          <input className={inputClass} value={formData.url || ""} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://..." required />
        </div>
        <div>
          <label className={labelClass}>Icon Lucide</label>
          <input className={inputClass} placeholder="Contoh: ExternalLink, Landmark, Calculator" value={formData.icon || ""} onChange={e => setFormData({...formData, icon: e.target.value})} required />
          <p className={helperClass}>Gunakan nama komponen dari Lucide React.</p>
        </div>
      </div>
    );
  }
  
  if (type === "berita") {
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Judul Berita</label>
          <input className={inputClass} value={formData.judul || ""} onChange={e => setFormData({...formData, judul: e.target.value})} placeholder="Masukkan judul utama..." required />
        </div>
        <div>
          <label className={labelClass}>Tanggal Publikasi</label>
          <input type="date" className={inputClass} value={formData.tanggal || ""} onChange={e => setFormData({...formData, tanggal: e.target.value})} required />
        </div>
        <div>
          <label className={labelClass}>Ringkasan (Snippet)</label>
          <textarea className={inputClass} rows={2} value={formData.ringkasan || ""} onChange={e => setFormData({...formData, ringkasan: e.target.value})} placeholder="Ringkasan pendek yang muncul di kartu berita..." required />
        </div>
        <div>
          <label className={labelClass}>Isi Konten Lengkap</label>
          <textarea className={inputClass} rows={6} value={formData.konten || ""} onChange={e => setFormData({...formData, konten: e.target.value})} placeholder="Tulis artikel lengkap di sini..." />
        </div>
        <div>
          <label className={labelClass}>URL Gambar Sampul</label>
          <input className={inputClass} value={formData.gambar_url || ""} onChange={e => setFormData({...formData, gambar_url: e.target.value})} placeholder="https://images.unsplash.com/..." />
        </div>
      </div>
    );
  }

  if (type === "peraturan") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nomor Regulasi</label>
            <input className={inputClass} value={formData.nomor || ""} onChange={e => setFormData({...formData, nomor: e.target.value})} placeholder="PMK No. 123" required />
          </div>
          <div>
            <label className={labelClass}>Tahun</label>
            <input className={inputClass} value={formData.tahun || ""} onChange={e => setFormData({...formData, tahun: e.target.value})} placeholder="2024" required />
          </div>
        </div>
        <div>
          <label className={labelClass}>Tentang / Judul</label>
          <textarea className={inputClass} rows={2} value={formData.tentang || ""} onChange={e => setFormData({...formData, tentang: e.target.value})} placeholder="Subjek peraturan ini..." required />
        </div>
        <div>
          <label className={labelClass}>URL Dokumen (PDF)</label>
          <input className={inputClass} value={formData.file_url || ""} onChange={e => setFormData({...formData, file_url: e.target.value})} placeholder="https://..." required />
        </div>
      </div>
    );
  }

  if (type === "hero") {
    return (
      <div className="space-y-4">
        <div><label className={labelClass}>Label Kecil (Badge)</label><input className={inputClass} value={formData.badge || ""} onChange={e => setFormData({...formData, badge: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Judul Baris 1</label><input className={inputClass} value={formData.title1 || ""} onChange={e => setFormData({...formData, title1: e.target.value})} /></div>
          <div><label className={labelClass}>Judul Baris 2 (Highlight)</label><input className={inputClass} value={formData.title2 || ""} onChange={e => setFormData({...formData, title2: e.target.value})} /></div>
        </div>
        <div><label className={labelClass}>Deskripsi Utama</label><textarea className={inputClass} rows={3} value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
        <div><label className={labelClass}>URL Gambar Latar</label><input className={inputClass} value={formData.bg_image_url || ""} onChange={e => setFormData({...formData, bg_image_url: e.target.value})} placeholder="Opsional" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Teks Tombol 1</label><input className={inputClass} value={formData.btn1_text || ""} onChange={e => setFormData({...formData, btn1_text: e.target.value})} /></div>
          <div><label className={labelClass}>Target Tombol 1</label><input className={inputClass} value={formData.btn1_target || ""} onChange={e => setFormData({...formData, btn1_target: e.target.value})} placeholder="ID bagian atau Link" /></div>
        </div>
      </div>
    );
  }

  if (type === "sections") {
    return (
      <div className="space-y-4">
        <div><label className={labelClass}>Judul Bagian</label><input className={inputClass} value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
        <div><label className={labelClass}>Sub-judul / Penjelasan</label><textarea className={inputClass} rows={3} value={formData.subtitle || ""} onChange={e => setFormData({...formData, subtitle: e.target.value})} required /></div>
      </div>
    );
  }

  return null;
}