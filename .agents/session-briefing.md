# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + TanStack Query + TanStack Table** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **Halaman Detail Konten Terdedikasi**:
  - [ForumDetailView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ForumDetailView.tsx) untuk membaca penuh satu diskusi forum, melihat balasan terstruktur, dan mengirim komentar baru.
  - [NewsDetailView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/NewsDetailView.tsx) untuk menampilkan berita pengumuman resmi angkatan secara editorial komprehensif.
- ✅ **Moderasi Forum Langsung (Inline Moderation)**:
  - Admin yang sedang melihat detail utas diskusi dapat langsung melakukan moderasi di halaman tersebut: mengedit judul/kategori/konten secara inline, menghapus utas, dan menghapus komentar mahasiswa.
- ✅ **Sistem ERP CRUD Administrator Penuh (Discord-Like)**:
  - **Kelola Mahasiswa**: Tambah manual mahasiswa, edit data profil & peran (User/Admin), serta hapus akun mahasiswa.
  - **Verifikasi WA**: Reset atau hapus berkas pendaftaran verifikasi WA.
  - **Kelola Buletin & Tugas**: Edit data judul/isi pengumuman/tugas yang sudah diposting dan hapus data.
  - **Moderasi Forum**: Edit/ubah isi postingan forum milik mahasiswa lain, menghapus thread, atau menghapus komentar balasan yang melanggar aturan.
- ✅ **Sistem Login & Register (Authentication)**:
  - Form gerbang masuk & daftar akun terintegrasi.
  - Mahasiswa baru daftar dengan input Nama, NIM (awalan `26` divalidasi), WhatsApp, Email, dan Password.
  - Registrasi Admin mendukung input kode undangan dari berkas lingkungan (.env).
- ✅ **Penyensoran Kredensial & Berkas `.env`**:
  - Semua informasi sensitif (Password Admin, Kode Undangan, Link WA) dipindahkan dari *hardcoded* kode sumber ke berkas konfigurasi lokal `.env` (di-ignore oleh git).
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2624 nodes, 3038 edges, 219 communities).

## Key Files & Structure
- [src/components/views/ForumDetailView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ForumDetailView.tsx) - Tampilan detail forum dengan inline moderation
- [src/components/views/NewsDetailView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/NewsDetailView.tsx) - Tampilan detail buletin berita
- [src/components/views/AdminView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/AdminView.tsx) - Kontrol panel ERP CRUD Administrator
- [src/services/mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) - CRUD logic mock & local storage sync
- [src/App.tsx](file:///d:/Project/IF_UMKT_26/src/App.tsx) - Router view & gerbang autentikasi
