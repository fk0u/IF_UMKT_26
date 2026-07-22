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
- ✅ **Halaman Coming Soon**:
  - Halaman **Jadwal Kuliah**, **Ujian BTQ**, dan **Daftar Tugas** dikosongkan secara visual dan diganti dengan status "Coming Soon" Hallmark yang bersih dan informatif.
- ✅ **Dokumentasi & Git**:
  - Berkas `.gitignore` lengkap dan berstandar produksi telah ditambahkan.
  - Berkas `README.md` dokumentasi sangat lengkap berbahasa Indonesia telah dibuat di root proyek.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2604 nodes, 3001 edges, 221 communities).

## Key Files & Structure
- [README.md](file:///d:/Project/IF_UMKT_26/README.md) - Dokumentasi lengkap proyek
- [.gitignore](file:///d:/Project/IF_UMKT_26/.gitignore) - Gitignore produksi & corpus safety
- [src/context/AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) - Auth & session management
- [src/App.tsx](file:///d:/Project/IF_UMKT_26/src/App.tsx) - Gerbang Login/Signup & router view
- [src/components/views/AdminView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/AdminView.tsx) - Kontrol panel pengurus angkatan
