// src/components/AdminDashboard.jsx
// Panel admin: sidebar CRM, sub-tab dashboard/hero/sections/berita/aplikasi/peraturan

import { useState, useEffect } from "react";
import { Icons } from "./Icons";
import { Card, Button, Modal } from "./UI";
import { DEFAULT_HERO } from "../config";
import { gasSave, gasDelete } from "../utils/gasApi";

const CACHE_KEY = "portalUINData";

const inputClass =
  "w-full rounded-[10px] border border-gray-200 p-3 text-[16px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all";
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

  // ── helpers ──
  const openModal = (type, mode, item = null) => {
    setFormData(item || {});
    setModalConfig({ isOpen: true, type, mode, item });
  };
  const closeModal = () => {
    setModalConfig({ isOpen: false, type: "", mode: "add", item: null });
    setFormData({});
  };
  const handleFormChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleHeroChange = (e) =>
    setHeroForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const persistData = (newData) => {
    setData(newData);
    localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
  };

  // ── CRUD ──
  const handleSave = async (e) => {
    e.preventDefault();
    const { type, mode, item } = modalConfig;
    setIsSubmitting(true);
    const newItem = {
      ...formData,
      id: mode === "add" ? `new_${Date.now()}` : item.id,
      status: "aktif",
    };
    try {
      const result = await gasSave(type, mode, newItem);
      if (result.success) {
        const updatedList =
          mode === "add"
            ? [...data[type], newItem]
            : data[type].map((d) => (d.id === item.id ? newItem : d));
        persistData({ ...data, [type]: updatedList });
        closeModal();
      } else {
        alert("Gagal menyimpan: " + result.message);
      }
    } catch (err) {
      alert("Gagal menghubungi server: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newItem = { ...heroForm, id: "hero_1", status: "aktif" };
    try {
      const result = await gasSave("hero", "edit", newItem);
      if (result.success) {
        persistData({ ...data, hero: [newItem] });
        alert("Spanduk Hero berhasil diperbarui!");
      } else {
        alert("Gagal menyimpan: " + result.message);
      }
    } catch (err) {
      alert("Gagal menghubungi server: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    setIsSubmitting(true);
    try {
      const result = await gasDelete(type, id);
      if (result.success) {
        persistData({ ...data, [type]: data[type].filter((i) => i.id !== id) });
      } else {
        alert("Gagal menghapus: " + result.message);
      }
    } catch (err) {
      alert("Gagal menghubungi server: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Sub-render ──
  const renderDashboard = () => {
    const totals = {
      berita: data.berita?.length || 0,
      links: data.links?.length || 0,
      peraturan: data.peraturan?.length || 0,
    };
    const total = totals.berita + totals.links + totals.peraturan;
    const max = Math.max(totals.berita, totals.links, totals.peraturan, 1);
    const recent = [...(data.berita || [])].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)).slice(0, 3);

    return (
      <div>
        <div className="mb-8">
          <h2 className="text-[28px] font-bold font-display text-gray-900">Ringkasan Dasbor</h2>
          <p className="text-[15px] text-gray-500 mt-1">Pantau total data aktual portal hari ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Berita", value: totals.berita, icon: "Newspaper", color: "indigo" },
            { label: "Total Aplikasi", value: totals.links, icon: "ExternalLink", color: "blue" },
            { label: "Total Regulasi", value: totals.peraturan, icon: "FileText", color: "purple" },
          ].map(({ label, value, icon, color }) => {
            const Icon = Icons[icon];
            return (
              <Card key={label} noPadding className={`p-6 relative overflow-hidden group`}>
                <div className={`w-12 h-12 rounded-[12px] bg-${color}-50 border border-${color}-100 flex items-center justify-center text-${color}-600 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-[32px] font-bold font-display text-gray-900">{value}</h3>
                <p className="text-[14px] text-gray-500 font-medium">{label}</p>
              </Card>
            );
          })}

          <Card noPadding className="p-6 relative overflow-hidden group bg-primary">
            <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center text-white mb-4 relative z-10 group-hover:scale-110 transition-transform">
              <Icons.LayoutDashboard className="w-6 h-6" />
            </div>
            <h3 className="text-[32px] font-bold font-display text-white relative z-10">{total}</h3>
            <p className="text-[14px] text-indigo-100 font-medium relative z-10">Total Data Sistem</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 min-h-[380px] flex flex-col">
            <h3 className="text-[18px] font-semibold font-display text-gray-900 mb-6">Perbandingan Konten</h3>
            <div className="flex-1 flex items-end justify-center space-x-12 px-10">
              {[
                { label: "Berita", value: totals.berita, color: "indigo", hoverColor: "primary" },
                { label: "Aplikasi", value: totals.links, color: "blue", hoverColor: "blue-600" },
                { label: "Regulasi", value: totals.peraturan, color: "purple", hoverColor: "purple-600" },
              ].map(({ label, value, color }) => (
                <div key={label} className="w-24 flex flex-col justify-end h-full items-center group">
                  <span className={`mb-2 text-[14px] font-bold text-${color}-600`}>{value}</span>
                  <div
                    className={`w-full bg-${color}-100 rounded-t-[8px] transition-all group-hover:bg-${color}-500`}
                    style={{ height: `${((value / max) * 100) || 5}%` }}
                  />
                  <span className="mt-3 text-[13px] font-medium text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-[18px] font-semibold font-display text-gray-900 mb-4">Berita Terbaru</h3>
            <div className="space-y-4">
              {recent.map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 text-primary flex items-center justify-center shrink-0 border border-indigo-100">
                    <Icons.Newspaper className="w-4 h-4" />
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <p className="text-[13px] font-medium text-gray-900 truncate">{item.judul}</p>
                    <p className="text-[12px] text-gray-500">{new Date(item.tanggal).toLocaleDateString("id-ID")}</p>
                  </div>
                </div>
              ))}
              {recent.length === 0 && <p className="text-gray-500 text-[13px]">Belum ada berita.</p>}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderTable = (type, title, columns, dataList, allowAddDelete = true) => (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-[24px] font-semibold font-display text-gray-900">{title}</h3>
          <p className="text-[14px] text-gray-500 mt-1">Kelola data {title.toLowerCase()}.</p>
        </div>
        {allowAddDelete && (
          <Button onClick={() => openModal(type, "add")} disabled={isSubmitting}>
            <Icons.Plus className="w-5 h-5 mr-2" /> Tambah Data
          </Button>
        )}
      </div>
      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">{c.label}</th>
                ))}
                <th className="px-6 py-4 font-semibold text-gray-500 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}>
              {(!dataList || dataList.length === 0) ? (
                <tr><td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">Tidak ada data.</td></tr>
              ) : dataList.map((item) => (
                <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors">
                  {columns.map((c) => (
                    <td key={c.key} className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">
                      {c.format ? c.format(item[c.key]) : item[c.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Button variant="ghost_primary" onClick={() => openModal(type, "edit", item)}>
                      <Icons.Edit className="w-4 h-4" />
                    </Button>
                    {allowAddDelete && (
                      <Button variant="ghost_danger" className="ml-2" onClick={() => handleDelete(type, item.id)}>
                        <Icons.Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderHeroForm = () => (
    <div>
      <h3 className="text-[24px] font-semibold font-display text-gray-900 mb-6">Pengaturan Spanduk Hero</h3>
      <Card>
        <form onSubmit={handleSaveHero} className="space-y-5">
          {[
            ["badge", "Teks Badge"],
            ["title1", "Judul Baris 1"],
            ["title2", "Judul Baris 2 (berwarna)"],
            ["description", "Deskripsi"],
            ["btn1_text", "Teks Tombol 1"],
            ["btn1_target", "Target Tombol 1 (tab atau URL)"],
            ["btn2_text", "Teks Tombol 2"],
            ["btn2_target", "Target Tombol 2"],
            ["bg_image_url", "URL Gambar Latar (opsional)"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className={labelClass}>{label}</label>
              <input type="text" name={name} value={heroForm[name] || ""} onChange={handleHeroChange}
                className={inputClass} disabled={isSubmitting} />
            </div>
          ))}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );

  // ── Modal form fields per type ──
  const renderModalFields = () => {
    const { type } = modalConfig;
    const f = (name, label, type_ = "text", extra = {}) => (
      <div key={name}>
        <label className={labelClass}>{label}</label>
        {type_ === "textarea" ? (
          <textarea name={name} value={formData[name] || ""} onChange={handleFormChange}
            className={inputClass} rows={extra.rows || 3} disabled={isSubmitting} />
        ) : (
          <input type={type_} name={name} value={formData[name] || ""} onChange={handleFormChange}
            className={inputClass} disabled={isSubmitting} {...extra} />
        )}
      </div>
    );

    if (type === "sections") return [
      <div key="key">
        <label className={labelClass}>Kode Bagian (jangan diubah)</label>
        <input className={`${inputClass} bg-gray-100 text-gray-400`} value={formData.section_key || ""} disabled />
      </div>,
      f("title", "Judul Utama"),
      f("subtitle", "Sub Judul"),
    ];
    if (type === "berita") return [
      f("judul", "Judul Artikel"),
      f("tanggal", "Tanggal Publikasi", "date"),
      f("gambar_url", "URL Gambar", "url"),
      f("ringkasan", "Ringkasan", "textarea", { rows: 2 }),
      f("konten", "Konten Penuh", "textarea", { rows: 5 }),
    ];
    if (type === "links") return [
      f("nama_aplikasi", "Nama Aplikasi"),
      f("url", "URL Tujuan", "url"),
      f("icon", "Nama Ikon (cth: BookOpen, Landmark)"),
      f("deskripsi", "Deskripsi", "textarea", { rows: 2 }),
    ];
    if (type === "peraturan") return [
      f("nomor", "Nomor Dokumen"),
      f("tahun", "Tahun Berlaku", "number"),
      f("file_url", "URL Unduhan", "url"),
      f("tentang", "Tentang / Perihal", "textarea", { rows: 3 }),
    ];
    return null;
  };

  // ── Sidebar items ──
  const sidebarItems = [
    { key: "dashboard", label: "Dasbor", icon: "LayoutDashboard" },
    { key: "hero", label: "Spanduk Hero", icon: "Image" },
    { key: "sections", label: "Judul Bagian", icon: "Type" },
    { key: "berita", label: "Berita", icon: "Newspaper" },
    { key: "aplikasi", label: "Aplikasi", icon: "ExternalLink" },
    { key: "peraturan", label: "Peraturan", icon: "FileText" },
  ];

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 cursor-pointer" onClick={onGoPublic}>
          <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-secondary to-accent flex items-center justify-center mr-3 shadow-sm">
            <Icons.Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-[20px] text-gray-900 tracking-tight">
            Portal<span className="text-primary">CRM</span>
          </span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</p>
          {sidebarItems.map(({ key, label, icon }) => {
            const Icon = Icons[icon];
            return (
              <button
                key={key}
                onClick={() => setSubTab(key)}
                className={`w-full flex items-center px-3 py-2.5 rounded-[10px] text-[14px] font-semibold transition-all ${
                  subTab === key ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3 opacity-90" />
                {label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center p-2 rounded-[10px] hover:bg-gray-50 mb-2">
            <div className="w-9 h-9 rounded-full bg-indigo-50 text-primary flex items-center justify-center font-bold border border-indigo-100">
              {currentUser.name.charAt(0)}
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-[14px] font-semibold text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-[12px] text-gray-500">{currentUser.role}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full text-[14px] text-gray-500 justify-start px-2 hover:bg-gray-50" onClick={onLogout}>
            <Icons.LogOut className="w-4 h-4 mr-2" /> Keluar
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="hidden md:flex items-center relative w-full max-w-md">
            <Icons.Search className="w-5 h-5 text-gray-400 absolute left-3.5" />
            <input type="text" placeholder="Cari data..." className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-[10px] text-[14px] focus:ring-2 focus:ring-primary outline-none transition-all" />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="text-[14px] py-2" onClick={onGoPublic}>
              Lihat Portal Publik
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {subTab === "dashboard" && renderDashboard()}
            {subTab === "hero" && renderHeroForm()}
            {subTab === "sections" && renderTable("sections", "Judul Bagian", [
              { label: "Kode Bagian", key: "section_key" },
              { label: "Judul Utama", key: "title" },
              { label: "Sub Judul", key: "subtitle" },
            ], data.sections, false)}
            {subTab === "berita" && renderTable("berita", "Berita & Artikel", [
              { label: "Judul", key: "judul" },
              { label: "Tanggal", key: "tanggal", format: (v) => new Date(v).toLocaleDateString("id-ID") },
            ], data.berita)}
            {subTab === "aplikasi" && renderTable("links", "Tautan Aplikasi", [
              { label: "Nama Aplikasi", key: "nama_aplikasi" },
              { label: "Deskripsi", key: "deskripsi" },
            ], data.links)}
            {subTab === "peraturan" && renderTable("peraturan", "Dokumen Regulasi", [
              { label: "No. Dokumen", key: "nomor" },
              { label: "Tentang", key: "tentang" },
            ], data.peraturan)}
          </div>
        </div>
      </main>

      {/* Modal CRUD */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={modalConfig.mode === "add" ? "Tambah Data Baru" : "Edit Data"}
      >
        <form onSubmit={handleSave} className="space-y-5">
          {renderModalFields()}
          <div className="flex justify-end space-x-3 pt-6">
            <Button type="button" variant="ghost" onClick={closeModal} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
