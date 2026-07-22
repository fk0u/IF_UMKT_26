# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + TanStack Query + TanStack Table** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **Sistem Login & Register (Authentication)**:
  - Form gerbang masuk & daftar akun terintegrasi.
  - Mahasiswa baru daftar dengan input Nama, NIM (awalan `26` divalidasi), WhatsApp, Email, dan Password.
  - Registrasi Admin mendukung input kode undangan dari berkas lingkungan (.env).
- ✅ **Sistem Otorisasi Peran (Authorization)**:
  - Role `'user'`: Akses terbatas ke Dashboard, Coming Soon (Jadwal, BTQ, Tugas), Tips, News, Forum (posting dengan nama otomatis terikat ke sesi login), dan verifikasi grup WA pribadi.
  - Role `'admin'`: Akses eksklusif ke **Dashboard Admin Terpadu** (statistik, verifikasi berkas PDF OCR, direktori user mahasiswa, publish buletin, & publish tugas).
- ✅ **Penyensoran Kredensial & Berkas `.env`**:
  - Semua informasi sensitif (Password Admin, Kode Undangan, Link WA) dipindahkan dari *hardcoded* kode sumber ke berkas konfigurasi lokal `.env` (di-ignore oleh git).
  - Ditambahkan berkas `src/vite-env.d.ts` untuk menyediakan tipe data Vite client.
  - Kredensial polos disensor dari dokumen `README.md` dan `.agents/session-briefing.md`.
- ✅ **Halaman Coming Soon**:
  - Halaman **Jadwal Kuliah**, **Ujian BTQ**, dan **Daftar Tugas** dikosongkan secara visual dan diganti dengan status "Coming Soon" Hallmark yang bersih dan informatif.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2609 nodes, 3004 edges, 225 communities).

## Key Files & Structure
- [.env](file:///d:/Project/IF_UMKT_26/.env) - Local secrets (ignored by Git)
- [.env.example](file:///d:/Project/IF_UMKT_26/.env.example) - Template environment variables
- [src/vite-env.d.ts](file:///d:/Project/IF_UMKT_26/src/vite-env.d.ts) - TS type declarations for Vite
- [src/context/AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) - Auth & session management
- [src/App.tsx](file:///d:/Project/IF_UMKT_26/src/App.tsx) - Gerbang Login/Signup & router view
