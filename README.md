# INFOTIK 26 - Pusat Informasi Mahasiswa Teknik Informatika 2026

Website **Sistem Informasi Pusat Mahasiswa Teknik Informatika Angkatan 2026** (INFOTIK 26) dirancang khusus sebagai "one-stop hub" resmi bagi mahasiswa baru untuk mempercepat adaptasi akademik, meminimalisir pertanyaan berulang di grup WhatsApp angkatan, dan menyajikan informasi secara terpusat, modern, dan bebas dari AI slop.

Aplikasi ini dibangun menggunakan arsitektur modern **React + TypeScript + Vite** dengan manajemen state server berbasis **TanStack Query** dan rendering data tabular berkinerja tinggi menggunakan **TanStack Table**.

---

## 🎨 Desain Visual (Hallmark Standard)
Seluruh antarmuka dikembangkan dengan standar estetika tinggi (**Anti-AI-Slop**):
- **Typography**: Menggunakan font *Plus Jakarta Sans* untuk tampilan utama, *Inter* untuk tulisan konten, dan *JetBrains Mono* (`font-mono-tag`) untuk data teknis seperti NIM, nomor ruangan, jam kuliah, dan nomor tiket.
- **Card Layout**: Mengganti template standard card yang monoton dengan border hairline asimetris (`hm-card`).
- **Gradients**: Meniadakan gradient warna mencolok (ungu-biru), digantikan dengan layout *Midnight Dark Theme* solid (`#070a10`) yang elegan dan bersih.

---

## 🛠️ Fitur-Fitur Utama

### 1. Sistem Autentikasi Akun (Login & Register)
- Seluruh konten diproteksi oleh gerbang login aman.
- Saat mendaftar akun baru:
  - Input form: Nama Lengkap, NIM, WhatsApp, Email, dan Password.
  - **Validasi NIM**: Sistem secara real-time menolak pendaftaran jika awalan NIM bukan `26` (Mahasiswa Angkatan 2026), kecuali mendaftar sebagai pengurus angkatan menggunakan kode undangan admin khusus.

### 2. Verifikasi Grup WhatsApp Resmi (OCR PDF & Waitlist)
- **Simulasi OCR PDF**: Saat mahasiswa mengunggah Surat Keterangan Kelulusan SIM-PMB format PDF, sistem akan menjalankan scanner laser OCR selama 2 detik untuk memeriksa validitas dokumen:
  - Kecocokan Nama Lengkap dan NIM.
  - Validitas Program Studi (harus "Teknik Informatika").
  - Tanggal terbit surat (harus tahun 2026).
- **Hasil Verifikasi**:
  - **Approved**: Jika semua data cocok, tautan resmi grup WhatsApp angkatan akan ditampilkan langsung.
  - **Rejected**: Jika terdapat data yang tidak sesuai atau NIM di luar awalan `26`, proses otomatisasi ditolak dengan alasan penolakan yang rinci.
- **Sistem Antrean Waitlist**: Bagi pengguna yang ditolak secara otomatis oleh mesin OCR, disediakan tombol **"Daftar Antrean Waitlist Manual"** untuk mendaftarkan nama, NIM, dan **Nomor WhatsApp** mereka ke antrean peninjauan manual oleh pengurus angkatan.

### 3. Dashboard Admin Pengurus Angkatan
Diakses khusus oleh akun berhak akses `admin` (kredensial di bawah). Menampilkan kontrol panel manajemen:
- **Metrik Statistik**: Total Akun Terdaftar, Verifikasi Pending, Antrean Waitlist, dan Pendaftar yang Disetujui.
- **Pusat Verifikasi**: Tabel responsif TanStack Table untuk meninjau detail pengunggahan berkas, nomor WhatsApp mahasiswa, dan tombol persetujuan manual (Approve, Waitlist, Reject dengan pop-up input alasan penolakan kustom).
- **Direktori Mahasiswa**: Direktori akun terdaftar beserta opsi kenaikan/penurunan peran (Role User/Admin).
- **Pengumuman & Catatan Tugas**: Formulir penerbitan buletin resmi dan daftar tugas kuliah angkatan.

### 4. Coming Soon Modules
Halaman-halaman berikut diset ke status "Coming Soon" menunggu kalender akademik resmi BAAK:
- **Jadwal Kuliah Semester 1**: Informasi jadwal kelas, SKS, dosen pengampu, dan nomor ruangan kuliah.
- **Panduan Ujian BTQ**: Syarat kelulusan Baca Tulis Al-Qur'an (BTQ) LAK UMKT.
- **Daftar Tugas Kuliah**: Catatan tugas resmi angkatan.

### 5. Komunitas & Informasi Tambahan
- **Forum Diskusi**: Tempat bertanya seputar koding, info kost, dan masta. Pengguna langsung memposting menggunakan sesi login aktif secara otomatis.
- **Buletin Berita**: Pengumuman penting tersemat (pinned) dari pengurus angkatan.
- **Tips Survive Maba**: Tips akademik & sosial asimetris.

---

## 📂 Struktur Folder Proyek

```bash
IF_UMKT_26/
├── .agents/                    # Konfigurasi agen AI & session briefing
├── graphify-out/               # Basis data grafik pengetahuan kode (AST)
├── src/
│   ├── components/
│   │   ├── layout/             # Sidebar, Header, Toast, MobileBottomNav
│   │   └── views/              # Halaman Tampilan (Dashboard, Masta, Admin, dsb.)
│   ├── context/
│   │   └── AuthContext.tsx     # Session manajemen autentikasi & registrasi
│   ├── hooks/                  # TanStack Query Hooks (useTasks, useForum, etc.)
│   ├── services/
│   │   └── mockApi.ts          # Simulasi database lokal & mesin pemindai OCR
│   ├── types/
│   │   └── index.ts            # Type definitions TypeScript
│   ├── App.tsx                 # Router view & gerbang autentikasi
│   ├── index.css               # Hallmark CSS tokens & critique stamp
│   └── main.tsx                # Entry point React
├── tailwind.config.js          # Konfigurasi palette warna & typography
├── vite.config.ts              # Konfigurasi bundler Vite
└── README.md                   # Dokumentasi lengkap proyek
```

---

## 🚀 Panduan Instalasi & Pengembangan

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 18+) di komputer Anda.

### Langkah-Langkah Menjalankan Proyek:

1. **Clone & Masuk ke Folder Proyek**:
   ```bash
   cd IF_UMKT_26
   ```

2. **Instalasi Dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan Vite Development Server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan secara lokal di browser Anda (biasanya pada `http://localhost:5173` atau port yang ditentukan terminal).

4. **Kompilasi Versi Produksi (Production Build)**:
   ```bash
   npm run build
   ```

---

## 🔑 Kredensial Uji Coba & Setelan Keamanan (Testing Accounts)

Untuk alasan keamanan repositori publik, seluruh konfigurasi data sensitif seperti password admin, kode undangan registrasi admin, dan tautan WhatsApp dipindahkan ke berkas `.env` di lingkungan lokal (diabaikan oleh Git).

Silakan salin berkas `.env.example` menjadi `.env` sebelum menjalankan aplikasi:
```bash
cp .env.example .env
```

Gunakan kredensial pengujian berikut (sesuai setelan default pada berkas `.env.example`):

| Akun Peran | NIM / Email | Password / Kode Undangan | Kegunaan Uji Coba |
| :--- | :--- | :--- | :--- |
| **Admin Angkatan** | `admin@example.com` | `******` (Lihat berkas `.env`) | Masuk ke Panel Admin kontrol untuk menyetujui waitlist / verifikasi WA. |
| **Mahasiswa Baru** | Mendaftar baru dengan NIM diawali `26...` | Kustom | Menguji pendaftaran akun valid, simulasi OCR, dan pendaftaran Waitlist. |
| **NIM Tidak Valid** | Mendaftar baru dengan NIM diawali `25...` / `24...` | Kustom | Menguji penolakan otomatisasi sistem registrasi angkatan 2026. |
