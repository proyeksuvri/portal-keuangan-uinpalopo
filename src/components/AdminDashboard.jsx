"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "./Icons";
import { Card, Button, Modal, Badge } from "./UI";
import Sidebar from "./admin/Sidebar";
import StatCard from "./admin/StatCard";
import AdminForm from "./admin/AdminForm";
import AplikasiManager from "./admin/AplikasiManager";
import BeritaManager from "./admin/BeritaManager";
import PeraturanManager from "./admin/PeraturanManager";
import HeroManager from "./admin/HeroManager";
import SectionsManager from "./admin/SectionsManager";
import { gasSave } from "../utils/gasApi";
import { GAS_WEB_APP_URL } from "../config";

const CACHE_KEY = "portalUINData";

export default function AdminDashboard({ data, setData, currentUser, onLogout }) {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Selamat Datang, {currentUser.name}</h3>
            <Badge variant="success">Sistem Aktif</Badge>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Anda sedang mengelola portal informasi keuangan UIN Palopo. Semua perubahan yang Anda lakukan di sini akan langsung disinkronkan dengan basis data Google Sheets dan akan segera tampil di portal publik setelah Anda menyimpan konfigurasi.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setSubTab("berita")} variant="outline" className="text-sm py-2 px-4">
              <Icons.Plus className="w-4 h-4 mr-2" /> Tulis Berita Baru
            </Button>
            <Button onClick={() => setSubTab("hero")} variant="outline" className="text-sm py-2 px-4">
              <Icons.Edit className="w-4 h-4 mr-2" /> Sesuaikan Hero
            </Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-gray-900 mb-6">Status Koneksi</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[10px] border border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase">Server GAS</span>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
                <span className="text-sm font-bold text-gray-900">Terhubung</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[10px] border border-gray-100">
              <span className="text-xs font-semibold text-gray-500 uppercase">Cache Lokal</span>
              <span className="text-sm font-bold text-gray-900">Aktif</span>
            </div>
            <div className="pt-2">
              <p className="text-[10px] text-gray-400 font-mono break-all line-clamp-2">
                ENDPOINT: {GAS_WEB_APP_URL.substring(0, 50)}...
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

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
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 shrink-0">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 capitalize">
                {subTab === "aplikasi" ? "Manajemen Aplikasi" : subTab === "dashboard" ? "Ringkasan" : `Kelola ${subTab}`}
              </h1>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="text-xs md:text-sm py-2 px-3 md:px-4"
            onClick={() => navigate("/")}
          >
            Buka Portal
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
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