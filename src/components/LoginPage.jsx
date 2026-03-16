// src/components/LoginPage.jsx
import { useState } from "react";
import { Icons } from "./Icons";
import { Card, Button } from "./UI";
import { gasLogin } from "../utils/gasApi";

export default function LoginPage({ onSuccess, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await gasLogin(username, password);
      if (result.success) {
        onSuccess({ name: result.name, role: result.role });
      } else {
        setError(result.message || "Nama pengguna atau kata sandi salah.");
      }
    } catch (err) {
      setError("Gagal menghubungi server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
            <Icons.Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold font-display text-gray-900 tracking-tight">
            Portal<span className="text-primary">Keuangan</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">UIN Datokarama Palopo</p>
        </div>

        <Card className="p-8 md:p-10 border-gray-100 shadow-xl shadow-gray-200/50">
          <div className="text-center mb-8">
            <h2 className="text-[22px] font-bold text-gray-900">Masuk ke Sistem</h2>
            <p className="text-[14px] text-gray-500 mt-1">Masukkan kredensial administrasi Anda</p>
          </div>

          {error && (
            <div className="bg-red-50 text-error p-4 rounded-[12px] text-[13px] mb-6 flex items-start space-x-3 border border-red-100 animate-in slide-in-from-top-2">
              <Icons.AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="font-semibold leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Nama Pengguna
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icons.User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-[12px] border border-gray-200 pl-11 p-3.5 text-[15px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50/50"
                  placeholder="admin_keuangan"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icons.Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[12px] border border-gray-200 pl-11 p-3.5 text-[15px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50/50"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full py-4 text-[16px]" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Memproses...
                </div>
              ) : "Masuk Sekarang"}
            </Button>

            {onCancel && (
              <button 
                type="button" 
                className="w-full text-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors pt-2"
                onClick={onCancel}
              >
                Kembali ke Beranda
              </button>
            )}
          </form>
        </Card>
        
        <p className="text-center mt-8 text-[12px] text-gray-400 font-medium">
          Sistem Informasi Keuangan Terpadu &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}