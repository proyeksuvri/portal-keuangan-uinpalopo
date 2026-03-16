"use client";

import React from "react";

const inputClass = "w-full rounded-[10px] border border-gray-200 p-3 text-[14px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
const labelClass = "block text-[13px] font-semibold text-gray-700 mb-1.5";

export default function AdminForm({ type, formData, setFormData }) {
  if (type === "links") {
    return (
      <div className="space-y-4">
        <div><label className={labelClass}>Nama Aplikasi</label><input className={inputClass} value={formData.nama_aplikasi || ""} onChange={e => setFormData({...formData, nama_aplikasi: e.target.value})} required /></div>
        <div><label className={labelClass}>Deskripsi</label><textarea className={inputClass} rows={2} value={formData.deskripsi || ""} onChange={e => setFormData({...formData, deskripsi: e.target.value})} required /></div>
        <div><label className={labelClass}>URL</label><input className={inputClass} value={formData.url || ""} onChange={e => setFormData({...formData, url: e.target.value})} required /></div>
        <div><label className={labelClass}>Icon Lucide</label><input className={inputClass} placeholder="ExternalLink, etc." value={formData.icon || ""} onChange={e => setFormData({...formData, icon: e.target.value})} required /></div>
      </div>
    );
  }
  
  if (type === "berita") {
    return (
      <div className="space-y-4">
        <div><label className={labelClass}>Judul</label><input className={inputClass} value={formData.judul || ""} onChange={e => setFormData({...formData, judul: e.target.value})} required /></div>
        <div><label className={labelClass}>Tanggal</label><input type="date" className={inputClass} value={formData.tanggal || ""} onChange={e => setFormData({...formData, tanggal: e.target.value})} required /></div>
        <div><label className={labelClass}>Ringkasan</label><textarea className={inputClass} rows={2} value={formData.ringkasan || ""} onChange={e => setFormData({...formData, ringkasan: e.target.value})} required /></div>
        <div><label className={labelClass}>Isi Konten</label><textarea className={inputClass} rows={4} value={formData.konten || ""} onChange={e => setFormData({...formData, konten: e.target.value})} /></div>
        <div><label className={labelClass}>URL Gambar</label><input className={inputClass} value={formData.gambar_url || ""} onChange={e => setFormData({...formData, gambar_url: e.target.value})} /></div>
      </div>
    );
  }

  if (type === "peraturan") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Nomor</label><input className={inputClass} value={formData.nomor || ""} onChange={e => setFormData({...formData, nomor: e.target.value})} required /></div>
          <div><label className={labelClass}>Tahun</label><input className={inputClass} value={formData.tahun || ""} onChange={e => setFormData({...formData, tahun: e.target.value})} required /></div>
        </div>
        <div><label className={labelClass}>Tentang</label><textarea className={inputClass} rows={2} value={formData.tentang || ""} onChange={e => setFormData({...formData, tentang: e.target.value})} required /></div>
        <div><label className={labelClass}>URL PDF</label><input className={inputClass} value={formData.file_url || ""} onChange={e => setFormData({...formData, file_url: e.target.value})} required /></div>
      </div>
    );
  }

  if (type === "hero") {
    return (
      <div className="space-y-4">
        <div><label className={labelClass}>Label Kecil (Badge)</label><input className={inputClass} value={formData.badge || ""} onChange={e => setFormData({...formData, badge: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Judul 1</label><input className={inputClass} value={formData.title1 || ""} onChange={e => setFormData({...formData, title1: e.target.value})} /></div>
          <div><label className={labelClass}>Judul 2 (Ungu)</label><input className={inputClass} value={formData.title2 || ""} onChange={e => setFormData({...formData, title2: e.target.value})} /></div>
        </div>
        <div><label className={labelClass}>Deskripsi</label><textarea className={inputClass} rows={2} value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
        <div><label className={labelClass}>URL Latar Belakang (Image)</label><input className={inputClass} value={formData.bg_image_url || ""} onChange={e => setFormData({...formData, bg_image_url: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Teks Tombol 1</label><input className={inputClass} value={formData.btn1_text || ""} onChange={e => setFormData({...formData, btn1_text: e.target.value})} /></div>
          <div><label className={labelClass}>Target Tombol 1</label><input className={inputClass} value={formData.btn1_target || ""} onChange={e => setFormData({...formData, btn1_target: e.target.value})} /></div>
        </div>
      </div>
    );
  }

  if (type === "sections") {
    return (
      <div className="space-y-4">
        <div><label className={labelClass}>Judul Bagian</label><input className={inputClass} value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
        <div><label className={labelClass}>Sub-judul Bagian</label><textarea className={inputClass} rows={2} value={formData.subtitle || ""} onChange={e => setFormData({...formData, subtitle: e.target.value})} required /></div>
      </div>
    );
  }

  return null;
}