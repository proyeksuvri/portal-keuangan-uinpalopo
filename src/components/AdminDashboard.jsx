"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { Card, Button, Modal } from "./UI";
import Sidebar from "./admin/Sidebar";
import StatCard from "./admin/StatCard";
import AplikasiManager from "./admin/AplikasiManager";
import BeritaManager from "./admin/BeritaManager";
import PeraturanManager from "./admin/PeraturanManager";
import HeroManager from "./admin/HeroManager";
import SectionsManager from "./admin/SectionsManager";
import { gasSave } from "../utils/gasApi";

const CACHE_KEY = "portalUINData";
const inputClass = "w-full rounded-[10px] border border-gray-200 p-3 text-[14px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
const labelClass = "block text-[13px] font-semibold text-gray-700 mb-1.5";

export default function AdminDashboard({ data, setData, currentUser, onLogout }) {
  const [subTab, setSubTab] = useState("dashboard");
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "", mode: "edit", item: null });
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => setModalConfig({ isOpen: false, type: "", mode: "edit", item: null });
  const openModal = (type, item = null) => {
    const isEditing = !!item;
    setFormData(item || {});
    setModalConfig({ 
      isOpen: true, 
      type, 
      mode: isEditing ? "edit" : "add", 
      item 
    });
  };

  const persistData = (newData) => {
    setData(newData);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
  };

  const handleDeleteLocal = (type, id) => {
    const updatedList = data[type].filter(item => item.id !== id);
    persistData({ ...data, [type]: updatedList });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { type, mode, item } = modalConfig;
    setIsSubmitting(true);
    
    const newItem = { 
      ...formData, 
      id: mode === "add" ? `id_${Date.now()}` : item?.id || "hero_1",
    };

    try {
      const result = await gasSave(type, mode, newItem);
      if (result.success) {
        let updatedList;
        if (type === "hero") {
          updatedList = [newItem];
        } else if (mode === "add") {
          updatedList = [newItem, ...data[type]];
        } else {
          updatedList = data[type].map((d) => (d.id === newItem.id ? newItem : d));
        }
        
        persistData({ ...data, [type]: updatedList });
        closeModal();
      } else {
        alert(result.message || "Gagal menyimpan data.");
      }
    } catch (err) { 
      alert("Error: " + err.message); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const renderDashboard = () => {
    const totals = { 
      berita: data.berita?.length || 0, 
      links: data.links?.length || 0, 
      peraturan: data.peraturan?.length || 0 
    };
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Berita" value={totals.berita} icon="Newspaper" color="indigo" />
          <StatCard label="Total Aplikasi" value={totals.links} icon="ExternalLink" color="blue" />
          <StatCard label="Total Regulasi" value={totals.peraturan} icon="FileText" color="purple" />
          <StatCard label="Total Data Sistem" value={totals.berita + totals.links + totals.peraturan} isPrimary />
        </div>
        <Card className="min-h-[300px] flex flex-col justify-center items-center text-gray-400 bg-white/50 border-dashed">
          <Icons.Activity className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium">Pilih menu di samping untuk mengelola konten portal.</p>
        </Card>
      </div>
    );
  };

  const renderFormFields = () => {
    const { type } = modalConfig;
    if (type === "links") {
      return (
        <>
          <div><label className={labelClass}>Nama Aplikasi</label><input className={inputClass} value={formData.nama_aplikasi || ""} onChange={e => setFormData({...formData, nama_aplikasi: e.target.value})} required /></div>
          <div><label className={labelClass}>Deskripsi</label><textarea className={inputClass} rows={2} value={formData.deskripsi || ""} onChange={e => setFormData({...formData, deskripsi: e.target.value})} required /></div>
          <div><label className={labelClass}>URL</label><input className={inputClass} value={formData.url || ""} onChange={e => setFormData({...formData, url: e.target.value})} required /></div>
          <div><label className={labelClass}>Icon Lucide</label><input className={inputClass} placeholder="ExternalLink, etc." value={formData.icon || ""} onChange={e => setFormData({...formData, icon: e.target.value})} required /></div>
        </>
      );
    }
    if (type === "berita") {
      return (
        <>
          <div><label className={labelClass}>Judul</label><input className={inputClass} value={formData.judul || ""} onChange={e => setFormData({...formData, judul: e.target.value})} required /></div>
          <div><label className={labelClass}>Tanggal</label><input type="date" className={inputClass} value={formData.tanggal || ""} onChange={e => setFormData({...formData, tanggal: e.target.value})} required /></div>
          <div><label className={labelClass}>Ringkasan</label><textarea className={inputClass} rows={2} value={formData.ringkasan || ""} onChange={e => setFormData({...formData, ringkasan: e.target.value})} required /></div>
          <div><label className={labelClass}>Isi Konten</label><textarea className={inputClass} rows={4} value={formData.konten || ""} onChange={e => setFormData({...formData, konten: e.target.value})} /></div>
          <div><label className={labelClass}>URL Gambar</label><input className={inputClass} value={formData.gambar_url || ""} onChange={e => setFormData({...formData, gambar_url: e.target.value})} /></div>
        </>
      );
    }
    if (type === "peraturan") {
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>Nomor</label><input className={inputClass} value={formData.nomor || ""} onChange={e => setFormData({...formData, nomor: e.target.value})} required /></div>
            <div><label className={labelClass}>Tahun</label><input className={inputClass} value={formData.tahun || ""} onChange={e => setFormData({...formData, tahun: e.target.value})} required /></div>
          </div>
          <div><label className={labelClass}>Tentang</label><textarea className={inputClass} rows={2} value={formData.tentang || ""} onChange={e => setFormData({...formData, tentang: e.target.value})} required /></div>
          <div><label className={labelClass}>URL PDF</label><input className={inputClass} value={formData.file_url || ""} onChange={e => setFormData({...formData, file_url: e.target.value})} required /></div>
        </>
      );
    }
    if (type === "hero") {
      return (
        <>
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
        </>
      );
    }
    if (type === "sections") {
      return (
        <>
          <div><label className={labelClass}>Judul Bagian</label><input className={inputClass} value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} required /></div>
          <div><label className={labelClass}>Sub-judul Bagian</label><textarea className={inputClass} rows={2} value={formData.subtitle || ""} onChange={e => setFormData({...formData, subtitle: e.target.value})} required /></div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans overflow-hidden">
      <Sidebar subTab={subTab} setSubTab={setSubTab} currentUser={currentUser} onLogout={onLogout} onGoPublic={() => window.location.href = "/"} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-900 capitalize">{subTab === "links" ? "Aplikasi" : subTab}</h1>
            <span className="text-gray-300">/</span>
            <span className="text-[14px] text-gray-500 font-medium">Panel Kontrol</span>
          </div>
          <Button variant="outline" onClick={() => window.location.href = "/"}>Buka Portal</Button>
        </header>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {subTab === "dashboard" && renderDashboard()}
          {subTab === "hero" && <HeroManager hero={data.hero} onEdit={(t, i) => openModal(t, i)} />}
          {subTab === "sections" && <SectionsManager sections={data.sections} onEdit={(t, i) => openModal(t, i)} />}
          {subTab === "aplikasi" && <AplikasiManager links={data.links} onEdit={(t, i) => openModal(t, i)} onAdd={(t) => openModal(t)} onDelete={handleDeleteLocal} />}
          {subTab === "berita" && <BeritaManager berita={data.berita} onEdit={(t, i) => openModal(t, i)} onAdd={(t) => openModal(t)} onDelete={handleDeleteLocal} />}
          {subTab === "peraturan" && <PeraturanManager peraturan={data.peraturan} onEdit={(t, i) => openModal(t, i)} onAdd={(t) => openModal(t)} onDelete={handleDeleteLocal} />}
        </div>
      </main>

      <Modal isOpen={modalConfig.isOpen} onClose={closeModal} title={`${modalConfig.mode === "add" ? "Tambah" : "Sesuaikan"} ${modalConfig.type}`}>
        <form onSubmit={handleSave} className="space-y-5">
          {renderFormFields()}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={closeModal} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan Konfigurasi"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}