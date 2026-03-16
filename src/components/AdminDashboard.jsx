"use client";

import { useState, useEffect } from "react";
import { Icons } from "./Icons";
import { Card, Button, Modal } from "./UI";
import Sidebar from "./admin/Sidebar";
import StatCard from "./admin/StatCard";
import AplikasiManager from "./admin/AplikasiManager";
import BeritaManager from "./admin/BeritaManager";
import PeraturanManager from "./admin/PeraturanManager";
import { DEFAULT_HERO } from "../config";
import { gasSave } from "../utils/gasApi";

const CACHE_KEY = "portalUINData";
const inputClass = "w-full rounded-[10px] border border-gray-200 p-3 text-[14px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
const labelClass = "block text-[13px] font-semibold text-gray-700 mb-1.5";

export default function AdminDashboard({ data, setData, currentUser, onLogout }) {
  const [subTab, setSubTab] = useState("dashboard");
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "", mode: "add", item: null });
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => setModalConfig({ isOpen: false, type: "", mode: "add", item: null });
  const openModal = (type, mode, item = null) => {
    setFormData(item || {});
    setModalConfig({ isOpen: true, type, mode, item });
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
    
    // Simple ID generation for new items
    const newItem = { 
      ...formData, 
      id: mode === "add" ? `id_${Date.now()}` : item.id,
      status: "aktif" 
    };

    try {
      const result = await gasSave(type, mode, newItem);
      if (result.success) {
        const updatedList = mode === "add" 
          ? [newItem, ...data[type]] 
          : data[type].map((d) => (d.id === item.id ? newItem : d));
        
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
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Berita" value={totals.berita} icon="Newspaper" color="indigo" />
          <StatCard label="Total Aplikasi" value={totals.links} icon="ExternalLink" color="blue" />
          <StatCard label="Total Regulasi" value={totals.peraturan} icon="FileText" color="purple" />
          <StatCard label="Total Data Sistem" value={totals.berita + totals.links + totals.peraturan} isPrimary />
        </div>
        <Card className="min-h-[300px] flex flex-col justify-center items-center text-gray-400 bg-white/50 border-dashed">
          <Icons.Activity className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium">Pilih menu di samping untuk mengelola konten.</p>
        </Card>
      </div>
    );
  };

  const renderFormFields = () => {
    const { type } = modalConfig;
    if (type === "links") {
      return (
        <>
          <div>
            <label className={labelClass}>Nama Aplikasi</label>
            <input className={inputClass} value={formData.nama_aplikasi || ""} onChange={e => setFormData({...formData, nama_aplikasi: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>Deskripsi Singkat</label>
            <textarea className={inputClass} rows={2} value={formData.deskripsi || ""} onChange={e => setFormData({...formData, deskripsi: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>URL Aplikasi</label>
            <input className={inputClass} placeholder="https://..." value={formData.url || ""} onChange={e => setFormData({...formData, url: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>Nama Icon (Lucide)</label>
            <input className={inputClass} placeholder="ExternalLink, Building2, etc." value={formData.icon || ""} onChange={e => setFormData({...formData, icon: e.target.value})} required />
          </div>
        </>
      );
    }
    if (type === "berita") {
      return (
        <>
          <div>
            <label className={labelClass}>Judul Berita</label>
            <input className={inputClass} value={formData.judul || ""} onChange={e => setFormData({...formData, judul: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>Tanggal</label>
            <input type="date" className={inputClass} value={formData.tanggal || ""} onChange={e => setFormData({...formData, tanggal: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>Ringkasan</label>
            <textarea className={inputClass} rows={3} value={formData.ringkasan || ""} onChange={e => setFormData({...formData, ringkasan: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>URL Gambar</label>
            <input className={inputClass} value={formData.gambar_url || ""} onChange={e => setFormData({...formData, gambar_url: e.target.value})} />
          </div>
        </>
      );
    }
    if (type === "peraturan") {
      return (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nomor Peraturan</label>
              <input className={inputClass} value={formData.nomor || ""} onChange={e => setFormData({...formData, nomor: e.target.value})} required />
            </div>
            <div>
              <label className={labelClass}>Tahun</label>
              <input className={inputClass} value={formData.tahun || ""} onChange={e => setFormData({...formData, tahun: e.target.value})} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Tentang</label>
            <textarea className={inputClass} rows={3} value={formData.tentang || ""} onChange={e => setFormData({...formData, tentang: e.target.value})} required />
          </div>
          <div>
            <label className={labelClass}>URL File PDF</label>
            <input className={inputClass} value={formData.file_url || ""} onChange={e => setFormData({...formData, file_url: e.target.value})} required />
          </div>
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
            <span className="text-[14px] text-gray-500 font-medium">Pengelolaan Data</span>
          </div>
          <Button variant="outline" onClick={() => window.location.href = "/"}>Lihat Portal Publik</Button>
        </header>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {subTab === "dashboard" && renderDashboard()}
          {subTab === "aplikasi" && <AplikasiManager links={data.links} onEdit={openModal} onAdd={openModal} onDelete={handleDeleteLocal} />}
          {subTab === "berita" && <BeritaManager berita={data.berita} onEdit={openModal} onAdd={openModal} onDelete={handleDeleteLocal} />}
          {subTab === "peraturan" && <PeraturanManager peraturan={data.peraturan} onEdit={openModal} onAdd={openModal} onDelete={handleDeleteLocal} />}
          {(subTab === "hero" || subTab === "sections") && (
            <Card className="p-12 text-center text-gray-400">
              <Icons.ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
              Fitur konfigurasi {subTab} sedang disiapkan.
            </Card>
          )}
        </div>
      </main>

      <Modal isOpen={modalConfig.isOpen} onClose={closeModal} title={`${modalConfig.mode === "add" ? "Tambah" : "Edit"} ${modalConfig.type}`}>
        <form onSubmit={handleSave} className="space-y-5">
          {renderFormFields()}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={closeModal} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}