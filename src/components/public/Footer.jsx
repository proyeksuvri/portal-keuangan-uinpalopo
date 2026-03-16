"use client";

import React from "react";
import { Icons } from "../Icons";

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                <Icons.Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-[22px] text-gray-900 tracking-tight">
                Portal<span className="text-primary">Keuangan</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6 font-medium">
              Sistem informasi keuangan terpadu yang menyajikan data transparansi, regulasi, dan aplikasi keuangan bagi seluruh sivitas akademika UIN Palopo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Icons.Activity className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Icons.PieChart className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Navigasi Cepat</h4>
            <ul className="space-y-4">
              {['Beranda', 'Aplikasi', 'Peraturan', 'Berita'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      setActiveTab(item.toLowerCase() === 'beranda' ? 'home' : item.toLowerCase());
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-500 hover:text-primary transition-colors font-medium flex items-center"
                  >
                    <Icons.ChevronRight className="w-4 h-4 mr-2 opacity-50" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-500 font-medium">
                <Icons.Landmark className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>Kampus I UIN Palopo, Jl. Agatis No. 1, Kota Palopo, Sulawesi Selatan</span>
              </li>
              <li className="flex items-center text-gray-500 font-medium">
                <Icons.Bell className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>keuangan@uinpalopo.ac.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[14px] text-gray-500 font-medium space-y-4 md:space-y-0">
          <div>© {new Date().getFullYear()} Sub Bagian Keuangan UIN Palopo.</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}