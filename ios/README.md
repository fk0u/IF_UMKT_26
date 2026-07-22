# INFOTIK 26 - iOS SwiftUI Client App

Aplikasi native pendamping iOS untuk platform **INFOTIK 26** yang dibangun menggunakan **Swift & SwiftUI**.

## Fitur Utama
1. **Otentikasi**: Login & simpan sesi dengan validasi awalan NIM angkatan 2026 (`26`).
2. **Berita Resmi**: List buletin berita terintegrasi dengan filter kategori dan detail editor.
3. **Jadwal Kuliah**: Kalender kuliah semester 1 lengkap dengan horizontal day picker.
4. **Tugas & Checklist**: Daftar tugas perkuliahan interaktif dengan strikethrough dan indikator prioritas.
5. **Forum & Moderasi**: Forum diskusi real-time lengkap dengan panel ubah/hapus utas & komentar khusus Admin.

## Petunjuk Penggunaan (Xcode)
1. Buka aplikasi **Xcode** pada komputer macOS Anda.
2. Pilih **File > Open** lalu arahkan ke direktori `/ios` pada proyek ini.
3. Buat berkas proyek Xcode baru (Single App template) bernama `Infotik26` di dalam folder tersebut.
4. Impor berkas-berkas `.swift` yang ada:
   - `Infotik26App.swift`
   - `Models.swift`
   - `NetworkManager.swift`
   - `Views/` (LoginView, HomeView, NewsView, ScheduleView, TasksView, ProfileView, ForumView, ForumDetailView)
5. Untuk pengujian lokal, jalankan simulator iOS. Pastikan backend Express (`npm run dev:all`) aktif pada port `3001` di host machine Anda.
   - Catatan: Ubah `baseURLString` di `NetworkManager.swift` jika Anda ingin mengarahkan koneksi ke URL Vercel produksi.
