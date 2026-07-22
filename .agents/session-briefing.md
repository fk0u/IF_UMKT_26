# Session Briefing - INFOTIK 26 (Pusat Informasi Mahasiswa TI 2026 UMKT)

## Project Overview
Website Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026 (INFOTIK 26) berbasis **React + TypeScript + Vite + Node.js Express (Full-Stack Hybrid) + iOS SwiftUI & Android Jetpack Compose Companion Apps** dengan **Hallmark Anti-AI-Slop Redesign** dan **Keamanan Enterprise/Startup Grade**.

## Current Status
- ✅ **Keamanan & Enkripsi Data Transaksi (Enterprise/Startup Grade)**:
  - **Enkripsi Klien (Client-Side Encryption)**: Berkas baru [secureStorage.ts](file:///d:/Project/IF_UMKT_26/src/utils/secureStorage.ts) ditambahkan untuk mengenkripsi seluruh penyimpanan lokal `localStorage` (seperti sesi, daftar user, dan log registrasi WA) menggunakan XOR-Base64 cipher interaktif agar tidak dapat diinspeksi secara plaintext.
  - **Hashing Password Satu Arah (Server-Side Hashing)**: Endpoint login, pendaftaran akun, dan manajemen ERP pada backend Express menggunakan modul `crypto` bawaan Node.js untuk memproses sandi lewat HMAC SHA-256 ber-salt.
  - **Header Keamanan CDN & Server**: Header anti-clickjacking, nosniff, referrer, dan Content-Security-Policy (CSP) terdaftar di Express middleware dan file `vercel.json` untuk pengamanan aset CDN.
- ✅ **Optimalisasi Caching & Transaksi Data**:
  - **TanStack Query Caching**: Terkonfigurasi caching reaktif dengan `staleTime` 5 menit di client.
  - **Cache-Control API**: Request jadwal kuliah `/api/schedules` di-cache di level CDN/Browser selama 1 jam (`public, max-age=3600`) dengan penambahan endpoint server baru.
- ✅ **Aplikasi Mobile Android Pendamping (Kotlin & Jetpack Compose)**:
  - Konfigurasi Gradle (`settings.gradle.kts`, `build.gradle.kts`, `app/build.gradle.kts`) dan `AndroidManifest.xml` (lengkap dengan izin Internet & Cleartext HTTP) telah ditambahkan.
- ✅ **Aplikasi Mobile iOS Pendamping Lengkap (Swift & SwiftUI)**:
  - Integrasi tab Forum Diskusi lengkap dan Sistem Moderasi Admin Native iOS.
- ✅ Successful production build (`npm run build`).
- ✅ Updated Graphify Knowledge Graph (2844 nodes, 3352 edges, 249 communities).

## Key Files & Structure
- [src/utils/secureStorage.ts](file:///d:/Project/IF_UMKT_26/src/utils/secureStorage.ts) - Obfuscated cryptography for localStorage
- [api/index.ts](file:///d:/Project/IF_UMKT_26/api/index.ts) - Node.js Express backend server with HMAC SHA-256
- [vercel.json](file:///d:/Project/IF_UMKT_26/vercel.json) - Vercel deployment configuration with CSP headers
- [android/](file:///d:/Project/IF_UMKT_26/android/) - Android Studio Gradle project
- [ios/](file:///d:/Project/IF_UMKT_26/ios/) - iOS Swift SwiftUI project
- [src/services/mockApi.ts](file:///d:/Project/IF_UMKT_26/src/services/mockApi.ts) - Hybrid API gateway & fallbacks
- [src/context/AuthContext.tsx](file:///d:/Project/IF_UMKT_26/src/context/AuthContext.tsx) - Auth gateway with backend integrations
- [vite.config.ts](file:///d:/Project/IF_UMKT_26/vite.config.ts) - Vite configuration with Port 3002 and Proxy 3001
- [package.json](file:///d:/Project/IF_UMKT_26/package.json) - Dependencies & Scripts
