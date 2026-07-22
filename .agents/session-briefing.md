# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + TanStack Query + TanStack Table** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **Sistem Login & Register (Authentication)**:
  - Form gerbang masuk & daftar akun terintegrasi.
  - Mahasiswa baru daftar dengan input Nama, NIM (awalan `26` divalidasi), WhatsApp, Email, dan Password.
  - Registrasi Admin mendukung input kode undangan `admin2026`.
- ✅ **Sistem Otorisasi Peran (Authorization)**:
  - Role `'user'`: Akses terbatas ke Dashboard, Coming Soon (Jadwal, BTQ, Tugas), Tips, News, Forum (posting dengan nama otomatis terikat ke sesi login), dan verifikasi grup WA pribadi.
  - Role `'admin'`: Akses eksklusif ke **Dashboard Admin Terpadu** (statistik, verifikasi berkas PDF OCR, direktori user mahasiswa, publish buletin, & publish tugas).
- ✅ **Sidebar Dinamis & Logout**:
  - Profil pengguna aktif ditampilkan di bagian bawah sidebar beserta tombol Logout.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2597 nodes, 2995 edges, 230 communities).

## Key Files & Structure
- [src/context/AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) - Auth & session management
- [src/App.tsx](file:///d:/Project/IF_UMKT_26/src/App.tsx) - Gerbang Login/Signup & router view
- [src/components/layout/Sidebar.tsx](file:///d:/Project/IF_UMKT_26/src/components/layout/Sidebar.tsx) - Profil & navigasi dinamis role
- [src/components/views/AdminView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/AdminView.tsx) - Kontrol panel pengurus angkatan
- [src/components/views/ForumView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ForumView.tsx) - Forum terikat dengan profil user aktif
