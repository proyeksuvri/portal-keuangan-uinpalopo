"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { Card, Button, Modal } from "./UI";
import Sidebar from "./admin/Sidebar";
import StatCard from "./admin/StatCard";
import AdminForm from "./admin/AdminForm";
import AplikasiManager from "./admin/AplikasiManager";
import BeritaManager from "./admin/BeritaManager";
import PeraturanManager from "./admin/PeraturanManager";
import HeroManager from "./admin/HeroManager";
import SectionsManager from "./admin/SectionsManager";
import { gasSave } from "../utils/gasApi";

const CACHE_KEY = "portalUINData";

export default function AdminDashboard({ data, setData, currentUser, onLogout }) {
  const [subTab, setSubTab] = useState("dashboard");
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "", mode: "edit", item: null });
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => setModalConfig({ isOpen: false, type: "", mode: "edit", item: null });
  const openModal = (type, item = null) => {
    const isEditing = !!item;
    setFormData(item || {});
    setModalConfig({ isOpen: true, type, mode: isEditing ? "edit" : "add", item });
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
    const newItem = { ...formData, id: mode === "add" ? `id_${Date.now()}` : item?.id || "hero_1" };

    try {
      const result = await gasSave(type, mode, newItem);
      if (result.success) {
        let updatedList;
        if (type === "hero") updatedList = [newItem];
        else if (mode === "add") updatedList = [newItem, ...data[type]];
        else updatedList = data[type].map((d) => (d.id === newItem.id ? newItem : d));
        
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

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Berita" value={data.berita?.length || 0} icon="Newspaper" color="indigo" />
        <StatCard label="Total Aplikasi" value={data.links?.length || 0} icon="ExternalLink" color="blue" />
        <StatCard label="Total Regulasi" value={data.peraturan?.length || 0} icon="FileText" color="purple" />
        <StatCard label="Total Data" value={(data.berita?.length || 0) + (data.links?.length || 0) + (data.peraturan?.length || 0)} isPrimary />
      </div>
      <Card className="min-h-[300px] flex flex-col justify-center items-center text-gray-400 bg-white/50 border-dashed">
        <Icons.Activity className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-medium">Selamat datang di Panel Kontrol Keuangan UIN Palopo.</p>
      </Card>
    </div>
  );

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
          <AdminForm type={modalConfig.type} formData={formData} setFormData={setFormData} />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={closeModal} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan Konfigurasi"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}