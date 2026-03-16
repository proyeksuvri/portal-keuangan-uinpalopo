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
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full animate-in fade-in duration-500">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-[12px] bg-indigo-50 text-primary flex items-center justify-center mb-4 border border-indigo-100">
              <Icons.Lock className="w-6 h-6" />
            </div>
            <h2 className="text-[24px] font-bold font-display text-gray-900">
              Selamat Datang Kembali
            </h2>
            <p className="text-[14px] text-gray-500 mt-2">
              Masukkan kredensial Anda untuk mengakses sistem
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-error p-4 rounded-[10px] text-[14px] mb-6 flex items-start space-x-3 border border-red-100">
              <Icons.AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1.5">
                Nama Pengguna
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-[10px] border border-gray-200 p-3 text-[16px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-1.5">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[10px] border border-gray-200 p-3 text-[16px] text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                required
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Mengautentikasi..." : "Masuk"}
            </Button>
            {onCancel && (
              <Button type="button" variant="ghost" className="w-full" onClick={onCancel}>
                Kembali ke Portal
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
