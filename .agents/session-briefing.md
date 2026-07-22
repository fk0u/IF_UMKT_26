# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + TanStack Query + TanStack Table** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **Halaman Coming Soon**:
  - Halaman **Jadwal Kuliah**, **Ujian BTQ**, dan **Daftar Tugas** dikosongkan secara visual dan diganti dengan status "Coming Soon" Hallmark yang bersih dan informatif.
- ✅ **Verifikasi Grup WA (Real Case)**:
  - Input form kini menyertakan **Nomor WhatsApp**.
  - Pemeriksaan awalan NIM: Diawali dengan `26` dianggap lolos verifikasi awal Angkatan 2026. Diawali dengan `25`, `24`, dll. ditolak otomatis.
  - Simulasi **OCR Scanner PDF**: Animasi progress scanner selama 2 detik untuk memeriksa kecocokan Nama, NIM, Prodi (Teknik Informatika), dan Tanggal Surat (Tahun 2026).
  - Sistem **Waitlist Manual**: User yang gagal verifikasi otomatis dapat memindahkan tiketnya ke antrean waitlist manual untuk ditinjau oleh Admin.
- ✅ **Admin Panel Update**:
  - Menampilkan kolom Nomor WhatsApp dan mendukung status `Waitlist` pada tabel pendaftar.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2585 nodes, 2968 edges, 219 communities).

## Key Files & Structure
- [src/components/views/WAVerifyView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/WAVerifyView.tsx) - Form verifikasi & simulasi OCR/Waitlist
- [src/components/views/AdminView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/AdminView.tsx) - Dashboard manajemen pendaftar & waitlist
- [src/services/mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) - Validasi NIM, OCR checks, & Waitlist backend mock
- [src/components/views/ScheduleView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ScheduleView.tsx) - Coming Soon
- [src/components/views/BtqView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/BtqView.tsx) - Coming Soon
- [src/components/views/TasksView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/TasksView.tsx) - Coming Soon
