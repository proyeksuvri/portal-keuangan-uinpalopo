"use client";

import { useState } from "react";
import Sidebar from "./admin/Sidebar";
import AdminHeader from "./admin/AdminHeader";
import DashboardHome from "./admin/DashboardHome";
import AdminForm from "./admin/AdminForm";
import AplikasiManager from "./admin/AplikasiManager";
import BeritaManager from "./admin/BeritaManager";
import PeraturanManager from "./admin/PeraturanManager";
import HeroManager from "./admin/HeroManager";
import SectionsManager from "./admin/SectionsManager";
import { Modal, Button } from "./UI";
import { gasSave } from "../utils/gasApi";

const CACHE_KEY = "portalUINData";

export default function AdminDashboard({ data, setData, currentUser, onLogout }) {
  const [subTab, setSubTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "", mode: "edit", item: null });
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeModal = () => setModalConfig({ isOpen: false, type: "", mode: "edit", item: null });
  const openModal = (type, item = null) => {
    setFormData(item || {});
    setModalConfig({ isOpen: true, type, mode: item ? "edit" : "add", item });
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

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans overflow-hidden">
      <Sidebar 
        subTab={subTab} 
        setSubTab={setSubTab} 
        currentUser={currentUser} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <AdminHeader 
          subTab={subTab} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {subTab === "dashboard" && <DashboardHome data={data} currentUser={currentUser} onNavigate={setSubTab} />}
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