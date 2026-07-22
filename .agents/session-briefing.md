# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + TanStack Query + TanStack Table** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **100% Visual Redesign Complete**:
  - Semua view halaman (Dashboard, Schedule, Masta, BTQ, Tips, Tasks, Forum, News, WA, Admin) telah di-redesign penuh menggunakan standar Hallmark Skill.
  - Mengubah seluruh container generic ke `hm-card` dan typography token yang konsisten.
  - Memakai font *Plus Jakarta Sans* untuk headings/display, *Inter* untuk body, dan *JetBrains Mono* (`font-mono-tag`) untuk kode NIM, SKS, nomor tiket WA, jam kuliah, dan nomor ruangan.
- ✅ All TanStack Query & TanStack Table integrations verified.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2582 nodes, 2980 edges, 219 communities).

## Key Files & Structure
- [src/index.css](file:///d:/Project/IF_UMKT_26/src/index.css) - Hallmark CSS tokens & critique stamp
- [tailwind.config.js](file:///d:/Project/IF_UMKT_26/tailwind.config.js) - Typography & theme scale
- [src/components/views/MastaView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/MastaView.tsx) - Hallmark timeline Masta
- [src/components/views/BtqView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/BtqView.tsx) - Hallmark BTQ guide
- [src/components/views/TasksView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/TasksView.tsx) - Hallmark tasks manager
- [src/components/views/ForumView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ForumView.tsx) - Hallmark forum threads
- [src/components/views/NewsView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/NewsView.tsx) - Hallmark news cards
- [src/components/views/AdminView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/AdminView.tsx) - Hallmark Admin panel
