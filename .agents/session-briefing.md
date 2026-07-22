# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + Node.js Express (Full-Stack Hybrid) + iOS SwiftUI & Android Jetpack Compose Companion Apps** dengan **Hallmark Anti-AI-Slop Redesign**.

## Current Status
- ✅ **Konfigurasi Proyek & SDK Mobile Ready**:
  - **Android**: Berkas `settings.gradle.kts`, `build.gradle.kts`, `app/build.gradle.kts`, dan `AndroidManifest.xml` (lengkap dengan konfigurasi izin Internet & Cleartext HTTP) telah ditambahkan sehingga proyek android/ dapat dibuka dan dijalankan langsung dari Android Studio.
  - **iOS**: Dokumen panduan `ios/README.md` ditambahkan untuk mempermudah impor berkas Swift ke proyek Xcode baru.
- ✅ **Aplikasi Mobile Android Pendamping (Kotlin & Jetpack Compose)**:
  - Berkas baru di bawah [android/app/src/main/java/com/infotik26/app/](file:///d:/Project/IF_UMKT_26/android/app/src/main/java/com/infotik26/app/) berisi proyek Android Kotlin lengkap.
  - Mengimplementasikan navigasi bottom bar material 3 (Buletin, Jadwal, Forum, Tugas, Profil).
  - Terkoneksi ke backend melalui Retrofit `NetworkService.kt` (`RetrofitInstance.kt`).
  - **Sistem Moderasi Admin Android**: Modul edit utas inline, hapus utas, dan hapus balasan komentar terintegrasi langsung di aplikasi jika login sebagai Admin.
- ✅ **Aplikasi Mobile iOS Pendamping Lengkap (Swift & SwiftUI)**:
  - Integrasi tab **Forum Diskusi** lengkap di iOS: `ForumView.swift` untuk daftar pertanyaan dan input thread baru, serta `ForumDetailView.swift` untuk membaca detail utas dan mengirim komentar/balasan.
  - **Sistem Moderasi Admin Native iOS**: Tombol edit inline, hapus utas, dan hapus balasan komentar terintegrasi langsung di aplikasi jika login sebagai Admin.
- ✅ **Backend API Server (Node.js Express)**:
  - Berkas baru [api/index.ts](file:///d:/Project/IF_UMKT_26/api/index.ts) yang mengimplementasikan REST API lengkap untuk mengelola mahasiswa (CRUD), berita, tugas, diskusi forum, dan verifikasi WA (dengan OCR simulation).
  - Ekspor Express app kompatibel dengan Vercel Serverless Functions.
- ✅ **Konfigurasi Deployment Vercel**:
  - Berkas baru [vercel.json](file:///d:/Project/IF_UMKT_26/vercel.json) ditambahkan untuk merutekan permintaan `/api/*` ke backend serverless functions, dan permintaan halaman statis/Aset lainnya ke Vite SPA.
- ✅ **Proxy Lokal (Development)**:
  - Konfigurasi [vite.config.ts](file:///d:/Project/IF_UMKT_26/vite.config.ts) ditambahkan proxy `/api` ke port `3001` (backend).
  - Skrip baru `"dev:all"` menggunakan `concurrently` untuk memutar server frontend & backend sekaligus secara lokal.
- ✅ **Arsitektur Hibrida Frontend & Client Fallback**:
  - [mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) dan [AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) ditingkatkan agar melakukan panggilan fetch API ke backend, dengan fallback otomatis ke `localStorage` jika backend sedang offline/tidak dapat diakses.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2834 nodes, 3336 edges, 252 communities).

## Key Files & Structure
- [android/](file:///d:/Project/IF_UMKT_26/android/) - Android Studio Gradle project
- [ios/](file:///d:/Project/IF_UMKT_26/ios/) - iOS Swift SwiftUI project
- [api/index.ts](file:///d:/Project/IF_UMKT_26/api/index.ts) - Node.js Express backend server
- [vercel.json](file:///d:/Project/IF_UMKT_26/vercel.json) - Vercel deployment configuration
- [src/services/mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) - Hybrid API gateway & fallbacks
- [src/context/AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) - Auth gateway with backend integrations
- [vite.config.ts](file:///d:/Project/IF_UMKT_26/vite.config.ts) - Vite configuration with Port 3002 and Proxy 3001
- [package.json](file:///d:/Project/IF_UMKT_26/package.json) - Dependencies & Scripts
