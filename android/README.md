# INFOTIK 26 - Android Jetpack Compose Client App

Aplikasi native pendamping Android untuk platform **INFOTIK 26** yang dibangun menggunakan **Kotlin** dan **Jetpack Compose (Material 3)**.

## Fitur Utama
1. **Otentikasi**: Login & simpan sesi dengan validasi awalan NIM angkatan 2026 (`26`).
2. **Berita Resmi**: List buletin berita terintegrasi dengan filter kategori dan detail editor.
3. **Jadwal Kuliah**: Kalender kuliah semester 1 lengkap dengan horizontal day picker.
4. **Tugas & Checklist**: Daftar tugas perkuliahan interaktif dengan strikethrough dan indikator prioritas.
5. **Forum & Moderasi**: Forum diskusi real-time lengkap dengan panel ubah/hapus utas & komentar khusus Admin.

## Petunjuk Penggunaan (Android Studio)
1. Buka aplikasi **Android Studio**.
2. Pilih **Open** dan arahkan ke direktori `/android` pada proyek ini.
3. Android Studio secara otomatis akan mendeteksi Gradle Wrapper dan mengunduh dependensi Gradle yang dibutuhkan.
4. Jalankan simulator Android (AVD) atau hubungkan ponsel fisik Anda dengan USB debugging aktif.
5. Tekan tombol **Run (Play)** di bagian toolbar atas untuk memasang aplikasi ke perangkat.
   - Catatan: Emulator Android secara otomatis merutekan permintaan `http://10.0.2.2:3001/` ke port `3001` komputer host Anda (tempat backend Express berjalan). Jika ingin mengganti endpoint ke server produksi Vercel, ubah variabel `BASE_URL` di `RetrofitInstance.kt`.
