# Portal Keuangan UIN Palopo

Platform informasi keuangan BLU terpadu — menampilkan portal aplikasi keuangan, berita, dan regulasi yang dikelola melalui Google Sheets.

## Teknologi

- **React 18** + **Vite** — frontend
- **Tailwind CSS** — styling
- **Google Apps Script (GAS)** — backend & database (Google Sheets)

## Struktur Proyek

```
src/
├── App.jsx               ← Root, routing antar view
├── config.js             ← URL GAS & konstanta default
├── main.jsx              ← Entry point React
├── index.css             ← Tailwind + custom scrollbar
├── hooks/
│   └── usePortalData.js  ← Data fetching + cache
├── utils/
│   └── gasApi.js         ← Fungsi API ke GAS (login/save/delete)
└── components/
    ├── Icons.jsx          ← Semua SVG icon
    ├── UI.jsx             ← Card, Badge, Button, Modal
    ├── LoginPage.jsx      ← Halaman login admin
    ├── PublicPortal.jsx   ← Tampilan publik
    └── AdminDashboard.jsx ← Panel admin CRM
```

## Setup Lokal

```bash
# 1. Install dependencies
npm install

# 2. Atur URL Google Apps Script di src/config.js
#    Ganti nilai GAS_WEB_APP_URL

# 3. Jalankan dev server
npm run dev
```

## Deploy ke GitHub Pages

```bash
# 1. Pastikan nama repo sudah sesuai di vite.config.js → base: '/nama-repo/'

# 2. Build & deploy
npm run deploy
```

Setelah deploy, akses di:
`https://<username>.github.io/<nama-repo>/`

## Deploy ke Netlify / Vercel

1. Set `base: '/'` di `vite.config.js`
2. Build command: `npm run build`
3. Publish directory: `dist`

## Konfigurasi Google Apps Script

Backend menggunakan Google Apps Script yang terhubung ke Google Sheets.
Endpoint yang diperlukan:

| Action | Method | Keterangan |
|--------|--------|------------|
| `?action=getData` | GET | Ambil semua data (berita, links, peraturan, hero, sections) |
| `?action=login&username=&password=` | GET | Autentikasi pengguna |
| `?action=delete&type=&id=` | GET | Hapus item |
| Body: `{action:"save", type, mode, item}` | POST | Tambah/edit item |

Response harus mengikuti format:
```json
{
  "success": true,
  "data": {
    "berita": [...],
    "links": [...],
    "peraturan": [...],
    "hero": [...],
    "sections": [...]
  }
}
```

## Lisensi

© Sub Bagian Keuangan UIN Palopo. Hak cipta dilindungi.
