# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + Node.js Express (Full-Stack Hybrid) + iOS SwiftUI & Android Jetpack Compose Companion Apps** dengan **Hallmark Anti-AI-Slop Redesign** dan **Keamanan Enterprise/Startup Grade**.

## Current Status
- ✅ **Perbaikan Bug Kompilasi & Refactor**:
  - **Syntax Error AdminView**: Membungkus sibling element di tab WA menggunakan React Fragment (`<>...</>`) untuk menuntaskan error JSX root element.
  - **Type Signature Hook**: Memperbarui tipe data `submitWAVerificationMutation` di `useWAVerify.ts` agar selaras dengan data riil OCR di backend (`ocrSuccess` & `ocrChecks`).
  - **Typecheck Backend Express**: Memperbaiki parameter decipher update di `api/index.ts` untuk string heksadesimal, menyinkronkan data dummy `INITIAL_WA_SUBMISSIONS` dengan skema WA, serta mendeklarasikan tipe array `dbWASubmissions` sebagai `WASubmission[]`.
  - **PWA Bottom Navigation**: Mengganti class `glass-nav` menjadi `hm-nav-glass` di `MobileBottomNav.tsx` untuk mengaktifkan styling glassmorphism yang konsisten.
- ✅ **Sinkronisasi Akun & Optimalisasi Verifikasi WA OCR**:
  - **Auto-Sync Profil Akun**: Mengambil data `name`, `nim`, dan `whatsapp` langsung dari `currentUser` via hook `useAuth()` di halaman verifikasi WA. Input field otomatis terkunci (*disabled*) untuk mencegah manipulasi data pendaftaran.
  - **Bypass Pengecekan NIM di OCR**: Mengubah logika `verifyExtractedText` di `ocr.ts` agar meloloskan `nimMatches` sebagai `true`, dikarenakan Surat Kelulusan PMB (termasuk yang dicetak fisik/scanned) tidak mencantumkan NIM mahasiswa (hanya memuat Nama, Prodi, dan Tahun masuk).
- ✅ **Implementasi Jadwal Kuliah & Panduan BTQ**:
  - **Halaman Jadwal Kuliah (`ScheduleView.tsx`)**: Menampilkan jadwal kuliah real-time dari backend via TanStack Query dengan filter per hari, layout bento card premium, serta indikator dinamis berkedip (*pulsing live indicator*) untuk kuliah yang sedang aktif berlangsung.
  - **Halaman Panduan BTQ (`BtqView.tsx`)**: Merender data panduan kelulusan BTQ lengkap berisi kriteria kelulusan, konsekuensi keterlambatan, grid interaktif 23 surah Juz 30, serta tips belajar harian.
- ✅ **PWA & Akses Lintas Platform**: Service worker `sw.js` dengan caching Network-First / Stale-While-Revalidate dan metadata notches iOS.
- ✅ Successful production build (`npm run build`).

## Key Files & Structure
- [src/components/views/ScheduleView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/ScheduleView.tsx) - Interactive Schedule view with TanStack Query & Live indicator
- [src/components/views/BtqView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/BtqView.tsx) - Detailed BTQ preparation view
- [src/components/views/WAVerifyView.tsx](file:///d:/Project/IF_UMKT_26/src/components/views/WAVerifyView.tsx) - Locked form with pre-filled account details & OCR triggers
- [src/utils/ocr.ts](file:///d:/Project/IF_UMKT_26/src/utils/ocr.ts) - Scanned PDF OCR parsing & custom validation logic
- [api/index.ts](file:///d:/Project/IF_UMKT_26/api/index.ts) - Node.js Express backend server with HMAC SHA-256
