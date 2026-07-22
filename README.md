# INFOTIK 26 - Pusat Informasi Mahasiswa Teknik Informatika Angkatan 2026

![INFOTIK 26](https://img.shields.io/badge/UMKT-Teknik%20Informatika%202026-6366f1?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tailwind_CSS_v3-CDN-38bdf8?style=for-the-badge&logo=tailwindcss)
![JS](https://img.shields.io/badge/Alpine.js-v3-8bc34a?style=for-the-badge&logo=alpine.js)

**INFOTIK 26** adalah website Sistem Informasi Pusat Mahasiswa Baru Teknik Informatika Angkatan 2026 Universitas Muhammadiyah Kalimantan Timur (UMKT) yang berfungsi sebagai *One-Stop Information Hub* modern, clean, responsif, dan user-friendly.

---

## 🌟 Fitur-Fitur Utama

1. **Dashboard / Home**: Highlight pengumuman penting, stat cards angkatan, link akses cepat, dan petunjuk maba.
2. **Jadwal Kuliah Semester 1**:
   - Filter per hari (Senin, Selasa, Rabu, Sabtu).
   - Lokasi presisi ruang kelas (`GF-3.02`, `GF-3.04`, `GF-3.03`, `Lab GF-1.02`).
   - Ekspor otomatis ke **Google Calendar** & Download file `.ics` jadwal.
3. **Panduan Masta (Orientasi)**:
   - Timeline interaktif tahap orientasi (Universitas, FST, Prodi TI, IMM, & Malam Inagurasi).
   - Ketentuan dresscode (Putra & Putri), barang bawaan wajib, dan Do's & Don'ts.
   - *Disclaimer* jelas acuan info.
4. **Panduan Ujian BTQ**:
   - Peringatan syarat mutlak kelulusan Skripsi/Pendadaran.
   - Syarat kelulusan & konsekuensi matrikulasi.
   - Tips kelulusan nilai A & daftar 23 surah pendek hafalan Juz 30.
5. **Tips Akademik & Sosial**: Card kasual & relatable seputar strategi koding, manajemen waktu, IPK 3.50+, dan etika menghubungi dosen.
6. **Daftar Tugas (Task List)**: Sistem pencatatan tugas dengan indikator prioritas, sisa deadline, dan filter status (Belum, Dalam Proses, Selesai).
7. **Forum Diskusi Angkatan**: Thread tanya-jawab antar mahasiswa baru per kategori (Koding, Info Kost, Masta, Umum) dengan fitur upvote & balasan.
8. **Buletin Informasi**: Berita & pengumuman angkatan dengan pencarian kata kunci dan filter kategori.
9. **Verifikasi Grup WA**: Form upload Surat Keterangan Lolos Seleksi (PDF) dengan status pelacakan tiket verifikasi real-time (`Pending` ⏳ ➔ `Approved` ✅ ➔ Link Akses WhatsApp Official).
10. **Panel Admin (Simulasi)**:
    - Login password dummy: `admin2026` / `infotik26`.
    - Kelola & setujui/tolak pendaftar grup WA.
    - Publish tugas resmi angkatan.
    - Publish & hapus pengumuman buletin.

---

## 📁 Struktur Folder Project

```
IF_UMKT_26/
├── index.html              # Core SPA Layout & Interface (Sidebar, Bottom Nav, All Pages & Modals)
├── css/
│   └── styles.css          # Custom styling, fonts, glassmorphism effects, scrollbar
├── js/
│   ├── data.js             # Data master (Jadwal, Masta, BTQ, Tips, Task awal, Forum awal, Berita awal)
│   ├── storage.js          # LocalStorage CRUD Manager (WA submissions, Tasks, Forum, News, Theme)
│   ├── calendar.js         # Google Calendar template URL generator & .ics exporter helper
│   └── app.js              # Alpine.js application controller & state store
├── .gitignore              # Git ignore safety patterns
├── .graphifyignore         # Graphify safety patterns
└── README.md               # Dokumentasi lengkap proyek
```

---

## 🚀 Cara Menjalankan Project

Project ini dibuat dengan arsitektur **Zero-Build Step** berbasis Tailwind CSS v3 CDN & Alpine.js CDN, sehingga sangat ringan dan dapat langsung dijalankan tanpa perlu instalasi NPM heavy dependencies.

### Opsi 1: Menggunakan Web Server Sederhana (Disarankan)

Gunakan `npx serve`, Python HTTP server, atau Live Server VS Code di root folder project:

#### Menggunakan Node.js / NPX:
```bash
npx serve .
```
Lalu buka browser di `http://localhost:3000`.

#### Menggunakan Python 3:
```bash
python -m http.server 8000
```
Lalu buka browser di `http://localhost:8000`.

### Opsi 2: Membuka Langsung di Browser

Cukup klik ganda (double-click) file `index.html` atau drag & drop file `index.html` ke browser kesayangan Anda (Google Chrome, Edge, Firefox, Brave, Safari).

---

## 🔐 Kredensial Panel Admin (Dummy)

- **URL Portal**: Klik menu **Panel Admin** di Sidebar/Navigation.
- **Password Dummy**: `admin2026` atau `infotik26`

---

## 🎨 Palette Warna & Desain

- **Primary Colors**: Deep Indigo (`#4f46e5`), Purple (`#7c3aed`), & Slate Dark Mode (`#0f172a` / `#020617`).
- **Accent Colors**: Emerald Green (`#10b981`), Amber Gold (`#f59e0b`), Rose (`#f43f5e`).
- **Typography**: Plus Jakarta Sans / Inter.
- **Layout**: Desktop Sidebar Navigation & Mobile Bottom Navigation Bar.
