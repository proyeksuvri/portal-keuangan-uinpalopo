// src/hooks/usePortalData.js
// Custom hook: fetch data dari Google Apps Script + cache localStorage

import { useState, useEffect } from "react";
import { GAS_WEB_APP_URL, DEFAULT_HERO, DEFAULT_SECTIONS } from "../config";

const CACHE_KEY = "portalUINData";

const emptyData = {
  berita: [],
  links: [],
  peraturan: [],
  hero: [DEFAULT_HERO],
  sections: DEFAULT_SECTIONS,
};

export function usePortalData() {
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!GAS_WEB_APP_URL || GAS_WEB_APP_URL === "MASUKKAN_URL_GAS_ANDA_DI_SINI") {
        setError("Tolong atur GAS_WEB_APP_URL di src/config.js.");
        setLoading(false);
        return;
      }

      // Tampilkan cache terlebih dahulu (stale-while-revalidate)
      let parsedCache = null;
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          parsedCache = JSON.parse(raw);
          setData(parsedCache);
          setLoading(false);
        }
      } catch {
        console.warn("Cache tidak valid, diabaikan.");
      }

      if (!parsedCache) setLoading(true);

      // Fetch data terbaru dari GAS
      try {
        const res = await fetch(`${GAS_WEB_APP_URL}?action=getData`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();

        if (result.success || result.status === "success") {
          const d = result.data || result;

          const heroData =
            d.hero?.length > 0
              ? d.hero
              : parsedCache?.hero?.length > 0
              ? parsedCache.hero
              : [DEFAULT_HERO];

          const sectionsData =
            d.sections?.length > 0
              ? d.sections
              : parsedCache?.sections?.length > 0
              ? parsedCache.sections
              : DEFAULT_SECTIONS;

          const formatted = {
            berita: d.berita || [],
            links: d.links || [],
            peraturan: d.peraturan || [],
            hero: heroData,
            sections: sectionsData,
          };

          setData(formatted);
          localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
        } else if (!parsedCache) {
          throw new Error(result.message || "Gagal mengambil data.");
        }
      } catch (err) {
        if (!parsedCache) setError(err.message || "Koneksi ke server terputus.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error, setData };
}
