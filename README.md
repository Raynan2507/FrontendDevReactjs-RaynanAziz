# Restaurant Finder

Technical test Front End Developer — aplikasi pencarian restoran dibangun dengan React JS, menggunakan data dari [Restaurant API](https://restaurant-api.dicoding.dev/).

## Tech Stack

- React 19.2.7
- Vite 8.1.0
- React Router DOM 7.18.0
- Axios 1.18.1
- Tailwind CSS 4.3.1

## Requirements

- Node.js v22.x
- npm

## Cara Menjalankan Project

1. Clone repo ini

   ```bash
   git clone https://github.com/Raynan2507/restaurant-simple.git
   cd restaurant-simple
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Jalankan development server

   ```bash
   npm run dev
   ```

   Aplikasi berjalan di `http://localhost:5173`

4. Build untuk production

   ```bash
   npm run build
   ```

## Fitur

- Menampilkan daftar restoran dari API
- Pencarian restoran berdasarkan nama (server-side, dengan debounce 500ms)
- Filter restoran berdasarkan status buka (Open Now), price range, dan kategori (client-side)
- Halaman detail restoran: deskripsi, kategori, menu (Foods/Drinks), dan review pelanggan
- Tampilan responsif untuk Desktop, Tablet, dan Mobile

## Catatan

API yang digunakan tidak menyediakan data `price range` dan status `open/closed`, sehingga kedua data tersebut dibuat secara deterministik berdasarkan `id` restoran (konsisten setiap kali halaman dimuat ulang, bukan random).

## Live Demo

- Netlify: `https://NAMA-PROJECT-ANDA.netlify.app`
- GitHub Repo: `https://github.com/USERNAME-ANDA/FrontendDevReactjs-NamaAnda`