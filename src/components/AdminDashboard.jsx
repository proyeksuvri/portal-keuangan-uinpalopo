"use client";

import { useState, useEffect } from "react";
import { Icons } from "./Icons";
import { Card, Button, Modal } from "./UI";
import Sidebar from "./admin/Sidebar";
import StatCard from "./admin/StatCard";
import { DEFAULT_HERO } from "../config";
import { gasSave, gasDelete } from "../utils/gasApi";

const CACHE_KEY = "portalUINData";
const inputClass = "w-full rounded-[10px] border border-gray-200 p-3 text-[16px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
const labelClass = "block text-[14px] font-medium text-gray-700 mb-1.5";

export default function AdminDashboard({ data, setData, currentUser, onGoPublic, onLogout }) {
  const [subTab, setSubTab] = useState("dashboard");
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: "", mode: "add", item: null });
  const [formData, setFormData] = useState({});
  const [heroForm, setHeroForm] = useState(DEFAULT_HERO);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data.hero?.[0]) setHeroForm(data.hero[0]);
  }, [data.hero]);

  const closeModal = () => setModalConfig({ isOpen: false, type: "", mode: "add", item: null });
  const openModal = (type, mode, item = null) => {
    setFormData(item || {});
    setModalConfig({ isOpen: true, type, mode, item });
  };

  const persistData = (newData) => {
    setData(newData);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { type, mode, item } = modalConfig;
    setIsSubmitting(true);
    const newItem = { ...formData, id: mode === "add" ? `new_${Date.now()}` : item.id, status: "aktif" };
    try {
      const result = await gasSave(type, mode, newItem);
      if (result.success) {
        const updatedList = mode === "add" ? [...data[type], newItem] : data[type].map((d) => (d.id === item.id ? newItem : d));
        persistData({ ...data, [type]: updatedList });
        closeModal();
      }
    } catch (err) { alert(err.message); } finally { setIsSubmitting(false); }
  };

  const renderDashboard = () => {
    const totals = { berita: data.berita?.length || 0, links: data.links?.length || 0, peraturan: data.peraturan?.length || 0 };
    const total = totals.berita + totals.links + totals.peraturan;
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Berita" value={totals.berita} icon="Newspaper" color="indigo" />
          <StatCard label="Total Aplikasi" value={totals.links} icon="ExternalLink" color="blue" />
          <StatCard label="Total Regulasi" value={totals.peraturan} icon="FileText" color="purple" />
          <StatCard label="Total Data Sistem" value={total} isPrimary />
        </div>
        <Card className="min-h-[300px] flex flex-col justify-center items-center text-gray-500">
          <Icons.Activity className="w-12 h-12 mb-4 opacity-20" />
          <p>Statistik visual akan muncul di sini saat data tersedia.</p>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans overflow-hidden">
      <Sidebar subTab={subTab} setSubTab={setSubTab} currentUser={currentUser} onLogout={onLogout} onGoPublic={onGoPublic} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-gray-900 capitalize">{subTab}</h1>
          <Button variant="outline" onClick={onGoPublic}>Lihat Portal Publik</Button>
        </header>
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {subTab === "dashboard" ? renderDashboard() : <Card className="p-12 text-center text-gray-500">Fitur manajemen {subTab} sedang dalam pengembangan.</Card>}
        </div>
      </main>
      <Modal isOpen={modalConfig.isOpen} onClose={closeModal} title="Kelola Data">
        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-sm text-gray-500">Formulir dinamis akan muncul di sini.</p>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={closeModal}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}