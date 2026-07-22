# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + Node.js Express (Full-Stack Hybrid) + TanStack Query + TanStack Table** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **Backend API Server (Node.js Express)**:
  - Berkas baru [api/index.ts](file:///d:/Project/IF_UMKT_26/api/index.ts) yang mengimplementasikan REST API lengkap untuk mengelola mahasiswa (CRUD), berita, tugas, diskusi forum, dan verifikasi WA (dengan OCR simulation).
  - Ekspor Express app kompatibel dengan model Vercel Serverless Functions.
- ✅ **Konfigurasi Deployment Vercel**:
  - Berkas baru [vercel.json](file:///d:/Project/IF_UMKT_26/vercel.json) ditambahkan untuk merutekan permintaan `/api/*` ke backend serverless functions, dan permintaan halaman statis/Aset lainnya ke Vite SPA.
- ✅ **Proxy Lokal (Development)**:
  - Konfigurasi [vite.config.ts](file:///d:/Project/IF_UMKT_26/vite.config.ts) ditambahkan proxy `/api` ke port `3001` (backend).
  - Skrip baru `"dev:all"` menggunakan `concurrently` untuk memutar server frontend & backend sekaligus secara lokal.
- ✅ **Arsitektur Hibrida Frontend & Client Fallback**:
  - [mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) dan [AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) ditingkatkan agar melakukan panggilan fetch API ke backend, dengan fallback otomatis ke `localStorage` jika backend sedang offline/tidak dapat diakses.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2660 nodes, 3071 edges, 235 communities).

## Key Files & Structure
- [api/index.ts](file:///d:/Project/IF_UMKT_26/api/index.ts) - Node.js Express backend server
- [vercel.json](file:///d:/Project/IF_UMKT_26/vercel.json) - Vercel deployment configuration
- [src/services/mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) - Hybrid API gateway & fallbacks
- [src/context/AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) - Auth gateway with backend integrations
- [vite.config.ts](file:///d:/Project/IF_UMKT_26/vite.config.ts) - Vite configuration with Port 3002 and Proxy 3001
- [package.json](file:///d:/Project/IF_UMKT_26/package.json) - Dependencies & Scripts
