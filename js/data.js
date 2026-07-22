/**
 * Seed data for INFOTIK 26 - Pusat Informasi Mahasiswa Teknik Informatika 2026
 */

window.INFOTIK_DATA = {
  // Jadwal Kuliah Semester 1
  schedules: [
    {
      id: 'sch-1',
      day: 'Senin',
      dayCode: 1,
      time: '07:30 - 09:10 WITA',
      startTime: '07:30',
      endTime: '09:10',
      course: 'Pancasila',
      lecturer: 'Drs. H. Ahmad Dahlan, M.Pd.',
      room: 'GF-3.02',
      building: 'Gedung Utama Lt. 3',
      sks: 2,
      badge: 'Teori',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 'sch-2',
      day: 'Senin',
      dayCode: 1,
      time: '09:15 - 10:55 WITA',
      startTime: '09:15',
      endTime: '10:55',
      course: 'Kemanusiaan dan Keimanan',
      lecturer: 'Dr. Muhammad Nur, M.Ag.',
      room: 'GF-3.02',
      building: 'Gedung Utama Lt. 3',
      sks: 2,
      badge: 'Teori',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'sch-3',
      day: 'Senin',
      dayCode: 1,
      time: '11:00 - 12:40 WITA',
      startTime: '11:00',
      endTime: '12:40',
      course: 'Aplikasi Komputer',
      lecturer: 'Budi Santoso, S.Kom., M.Kom.',
      room: 'GF-3.02',
      building: 'Gedung Utama Lt. 3',
      sks: 2,
      badge: 'Teori & Praktik',
      color: 'from-indigo-600 to-violet-600'
    },
    {
      id: 'sch-4',
      day: 'Senin',
      dayCode: 1,
      time: '13:30 - 15:10 WITA',
      startTime: '13:30',
      endTime: '15:10',
      course: 'Bahasa Inggris',
      lecturer: 'Siti Rahmah, M.Pd.',
      room: 'GF-3.02',
      building: 'Gedung Utama Lt. 3',
      sks: 2,
      badge: 'Teori',
      color: 'from-teal-600 to-emerald-600'
    },
    {
      id: 'sch-5',
      day: 'Selasa',
      dayCode: 2,
      time: '08:00 - 10:30 WITA',
      startTime: '08:00',
      endTime: '10:30',
      course: 'Dasar Pemrograman',
      lecturer: 'Rizal Wijaya, S.T., M.T.',
      room: 'GF-3.04',
      building: 'Gedung Utama Lt. 3',
      sks: 3,
      badge: 'Inti TI',
      color: 'from-indigo-600 to-blue-600'
    },
    {
      id: 'sch-6',
      day: 'Rabu',
      dayCode: 3,
      time: '07:30 - 10:00 WITA',
      startTime: '07:30',
      endTime: '10:00',
      course: 'Sistem Digital dan Arsitektur Komputer',
      lecturer: 'Ir. Hendra Gunawan, M.T.',
      room: 'GF-3.03',
      building: 'Gedung Utama Lt. 3',
      sks: 3,
      badge: 'Inti TI',
      color: 'from-amber-600 to-orange-600'
    },
    {
      id: 'sch-7',
      day: 'Rabu',
      dayCode: 3,
      time: '10:15 - 12:00 WITA',
      startTime: '10:15',
      endTime: '12:00',
      course: 'Aljabar Linear',
      lecturer: 'Dewi Lestari, S.Si., M.Sc.',
      room: 'GF-3.03',
      building: 'Gedung Utama Lt. 3',
      sks: 2,
      badge: 'Matematika TI',
      color: 'from-cyan-600 to-blue-600'
    },
    {
      id: 'sch-8',
      day: 'Rabu',
      dayCode: 3,
      time: '13:30 - 16:00 WITA',
      startTime: '13:30',
      endTime: '16:00',
      course: 'Matematika Diskrit',
      lecturer: 'Dr. Agus Setiawan, M.Si.',
      room: 'GF-3.03',
      building: 'Gedung Utama Lt. 3',
      sks: 3,
      badge: 'Matematika TI',
      color: 'from-rose-600 to-pink-600'
    },
    {
      id: 'sch-9',
      day: 'Sabtu',
      dayCode: 6,
      time: '08:00 - 11:30 WITA',
      startTime: '08:00',
      endTime: '11:30',
      course: 'Praktikum Dasar Pemrograman',
      lecturer: 'Tim Asisten Laboratorium Komputer',
      room: 'Lab GF-1.02',
      building: 'Gedung Laboratorium Komputer Lt. 1',
      sks: 1,
      badge: 'Praktikum Wajib',
      color: 'from-violet-600 to-purple-600'
    }
  ],

  // Panduan Masta (Orientasi)
  mastaGuide: {
    disclaimer: 'Informasi panduan Masta di bawah ini disusun berdasarkan acuan pelaksanaan tahun sebelumnya (2025) untuk memberikan gambaran awal. Detail dan jadwal resmi Masta 2026 akan di-update mengikuti arahan resmi Panitia Masta UMKT 2026.',
    stages: [
      {
        title: 'Masta Universitas & Fakultas (FST)',
        duration: 'Hari 1 - 2',
        description: 'Pengenalan kampus UMKT, rektorat, tata tertib akademik, pimpinan Fakultas Sains dan Teknologi (FST), dan organisasi kemahasiswaan tingkat universitas.',
        highlights: ['Sidang Terbuka Senat', 'Kuliah Umum Kebangsaan', 'Tour Kampus & Lab FST']
      },
      {
        title: 'Masta Prodi Teknik Informatika',
        duration: 'Hari 3',
        description: 'Masa perkenalan dengan Ketua Prodi, Dosen Pembimbing Akademik (DPA), Himpunan Mahasiswa Teknik Informatika (HMTI), kurikulum 2026, serta pengenalan budaya koding & etika akademik.',
        highlights: ['Meet & Greet Dosen TI', 'Demo Karya Kakak Tingkat', 'Sharing Session HMTI']
      },
      {
        title: 'Masta IMM (Ikatan Mahasiswa Muhammadiyah)',
        duration: 'Hari 4',
        description: 'Pengenalan nilai-nilai keislaman, ke-Muhammadiyahan, kaderisasi anggotanya, serta peran mahasiswa sebagai agen perubahan bangsa.',
        highlights: ['Orasi Keilmuan', 'Game Kelompok', 'Pendaftaran PKIMM']
      },
      {
        title: 'Malam Inagurasi & Puncak Masta',
        duration: 'Hari 5 (Penutupan)',
        description: 'Puncak selebrasi penerimaan mahasiswa baru angkatan 2026 dengan panggung seni, inagurasi angkatan, pembacaan komitmen angkatan 2026, dan selebrasi bersama.',
        highlights: ['Pentas Seni Maba', 'Inagurasi Angkatan 2026', 'Foto Bersama Angkatan']
      }
    ],
    dressCode: [
      {
        type: 'Putra',
        items: [
          'Kemeja lengan panjang warna putih polos (berkerah, tidak ketat)',
          'Celana bahan kain warna hitam polos (bukan jeans/chino ketat)',
          'Dasi hitam polos & sabuk hitam',
          'Sepatu pantofel atau sepatu olahraga didominasi warna hitam & kaus kaki putih',
          'Rambut rapi (maksimal 2cm di atas kerah baju)'
        ]
      },
      {
        type: 'Putri',
        items: [
          'Kemeja lengan panjang warna putih polos (panjang menutup pinggul)',
          'Rok kain warna hitam polos berpotongan A-Line (tidak menerawang & tidak bercelah)',
          'Jilbab segi empat polos warna putih (syar\'i)',
          'Sepatu tertutup warna hitam & kaus kaki putih',
          'Make-up natural & tidak memakai perhiasan berlebihan'
        ]
      }
    ],
    equipments: [
      'Al-Qur\'an terjemahan ukuran sedang',
      'Buku catatan bergaris & alat tulis (pulpen hitam, pensil, penghapus)',
      'Nametag ID Card Masta 2026 (sesuai template panitia)',
      'Air minum botol ulang pakai (tumbler min. 600ml)',
      'Bekal makanan sehat (sesuai ketentuan penugasan panitia)',
      'Obat-obatan pribadi yang dibutuhkan',
      'Perlengkapan ibadah pribadi (Sajadah & Mukena bagi putri)'
    ],
    dosAndDonts: {
      dos: [
        'Hadir tepat waktu 15 menit sebelum acara dimulai',
        'Menjaga kerapian, kebersihan, dan kesopanan bertutur kata',
        'Menyapa dosen dan panitia dengan 3S (Senyum, Salam, Sapa)',
        'Memarkir kendaraan di area khusus Maba FST'
      ],
      donts: [
        'Dilarang membawa rokok/vape, senjata tajam, dan bahan terlarang',
        'Dilarang memakai aksesoris mencolok / perhiasan mahal',
        'Dilarang meninggalkan area acara tanpa izin tertulis panitia',
        'Dilarang mengaktifkan nada dering HP saat materi berlangsung'
      ]
    }
  },

  // Panduan Ujian BTQ (Baca Tulis Al-Qur'an)
  btqGuide: {
    alertMessage: 'PERHATIAN MAHASISWA BARU: Kelulusan Ujian BTQ merupakan SYARAT WAJIB untuk mendaftar Sidang Skripsi/Pendadaran dan Yudisium di UMKT. Pastikan Anda mempersiapkan sejak Semester 1!',
    passingCriteria: [
      'Mampu membaca Al-Qur\'an dengan tartil sesuai kaidah ilmu Tajwid.',
      'Lulus hafalan minimal 23 Surah Pendek (Juz 30: dari Surah Ad-Duha sampai Surah An-Nas).',
      'Mampu menulis ayat Al-Qur\'an dasar & huruf hijaiyah berharakat dengan benar.',
      'Nilai kelulusan minimal: B (Skor 75.00).'
    ],
    surahList: [
      'Ad-Duha', 'Ash-Sharh (Al-Inshirah)', 'At-Tin', 'Al-\'Alaq', 'Al-Qadr',
      'Al-Bayyinah', 'Az-Zalzalah', 'Al-\'Adiyat', 'Al-Qari\'ah', 'At-Takathur',
      'Al-\'Asr', 'Al-Humazah', 'Al-Fil', 'Quraysh', 'Al-Ma\'un',
      'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad (Al-Lahab)', 'Al-Ikhlas',
      'Al-Falaq', 'An-Nas', 'Al-Fatihah'
    ],
    consequences: [
      'Mahasiswa yang TIDAK LULUS pada tes awal wajib mengikuti Matrikulasi / Remidi BTQ selama 1 semester.',
      'Tidak bisa mengambil mata kuliah Skripsi apabila sertifikat BTQ belum terbit.',
      'Penundaan kelulusan/yudisium hingga syarat BTQ terpenuhi.'
    ],
    tipsForGradeA: [
      {
        title: '1. Cicil Hafalan 1 Surah Per Hari',
        desc: 'Jangan menunda hafalan jelang ujian! Alokasikan waktu 15 menit setelah sholat Shubuh untuk menghafal 1 surah pendek.'
      },
      {
        title: '2. Kuasai Hukum Tajwid Dasar',
        desc: 'Fokus pada Hukum Nun Mati/Tanwin (Izhhar, Ikhfa, Idgham, Iqlab), Hukum Mad (Mad Thabi\'i & Mad Far\'i), serta Qalqalah.'
      },
      {
        title: '3. Gunakan Aplikasi Murottal & Setoran Teman',
        desc: 'Dengarkan bacaan Syeikh Mahmud Khalil Al-Husary atau Mishary Rashid untuk menyempurnakan Makhraj huruf, lalu simulasikan setoran dengan teman angkatan.'
      },
      {
        title: '4. Ikuti Bimbingan BTQ Lembaga Al-Islam & Kemuhammadiyahan (LAK)',
        desc: 'Manfaatkan fasilitas mentoring gratis yang disediakan oleh LAK UMKT sebelum tanggal ujian resmi dibuka.'
      }
    ]
  },

  // Tips Akademik & Sosial Maba
  academicTips: [
    {
      id: 'tip-1',
      title: '💻 Trik Survive Mata Kuliah Dasar Pemrograman',
      category: 'Koding & Studi',
      icon: 'code-2',
      tagColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300',
      content: 'Jangan cuma baca slide dosen! Koding itu keterampilan motorik. Begitu dosen jelaskan variabel atau loop di C++/Python, langsung ketik sendiri di laptop. Kalau ketemu error message, JANGAN PANIK. Copas pesan error ke Google/ChatGPT, pelajari letak titik koma (;) atau salah ketik syntax-nya.'
    },
    {
      id: 'tip-2',
      title: '🎯 Targetkan IPK Semester 1 Minimal 3.50',
      category: 'Akademik',
      icon: 'award',
      tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
      content: 'Semester 1 adalah waktu PALING GAMPANG untuk menabung IPK tinggi karena matkulnya masih dasar. Jika IPK Semester 1 kamu 3.80, kamu punya tabungan nilai aman untuk matkul berat di semester 3-4 seperti Algoritma & Struktur Data.'
    },
    {
      id: 'tip-3',
      title: '🤝 Cari "Circle" Belajar yang Saling Support',
      category: 'Sosial',
      icon: 'users',
      tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
      content: 'Bertemanlah dengan semua orang, tapi bentuklah circle belajar 3-5 orang yang punya ambisi lulus tepat waktu. Saat ada tugas praktikum atau projek koding, kalian bisa saling bantu debugging dan rembuk ide tanpa saling copas melanggar etika.'
    },
    {
      id: 'tip-4',
      title: '📧 Etika Chat & Berkomunikasi dengan Dosen TI',
      category: 'Etika Kampus',
      icon: 'message-square',
      tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      content: 'Ingat rumus 5S saat WhatsApp dosen: 1. Salam, 2. Sebutkan Nama & NIM & Kelas, 3. Utarakan Tujuan dengan sopan dan singkat, 4. Ucapkan Terima Kasih, 5. Kirim di jam kerja (08:00 - 16:00 WITA). Contoh: "Selamat pagi Bapak Rizal, saya Fajar NIM 26111001..."'
    },
    {
      id: 'tip-5',
      title: '⏰ Manajemen Waktu: Rule 2 Jam Setelah Kuliah',
      category: 'Produktifitas',
      icon: 'clock',
      tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
      content: 'Biasakan luangkan 2 jam di malam hari untuk me-review materi hari itu atau mencicil tugas yang baru diberikan. Jangan pakai sistem Kebut Semalam (SKS) untuk projek pemrograman, karena koding butuh ketenangan logika!'
    }
  ],

  // Initial Tasks List
  initialTasks: [
    {
      id: 'tsk-101',
      title: 'Instalasi VS Code & Compiler C++/Python',
      course: 'Dasar Pemrograman',
      deadline: '2026-08-05',
      priority: 'Tinggi',
      status: 'Belum Dikerjakan',
      description: 'Install Visual Studio Code, extension C/C++, MinGW / GCC compiler, dan Python 3.11 di laptop masing-masing.'
    },
    {
      id: 'tsk-102',
      title: 'Membuat Rangkuman Materi Logika Dasar & Gerbang Logika',
      course: 'Sistem Digital',
      deadline: '2026-08-10',
      priority: 'Sedang',
      status: 'Dalam Proses',
      description: 'Tulis tangan rangkuman tabel kebenaran AND, OR, NOT, NAND, NOR di buku catatan khusus Sistem Digital.'
    },
    {
      id: 'tsk-103',
      title: 'Setoran Hafalan Surah Ad-Duha s/d Al-Qadr',
      course: 'Ujian BTQ / LAK',
      deadline: '2026-08-15',
      priority: 'Sangat Tinggi',
      status: 'Belum Dikerjakan',
      description: 'Latihan hafalan mandiri sebelum jadwal setoran perdana dengan pembimbing LAK UMKT.'
    }
  ],

  // Initial Announcements / News
  initialNews: [
    {
      id: 'news-1',
      title: 'Pengumuman Resmi Pendaftaran & Verifikasi Grup WA Angkatan 2026',
      date: '22 Juli 2026',
      category: 'Pengumuman Resmi',
      author: 'Panitia Angkatan 2026',
      pinned: true,
      summary: 'Mahasiswa baru Teknik Informatika 2026 diwajibkan melakukan verifikasi identitas melalui menu WA Group untuk mendapatkan link resmi grup WhatsApp angkatan.',
      content: 'Guna menghindari penyusupan akun spam/bot dan menjaga keamanan data mahasiswa baru Teknik Informatika UMKT 2026, seluruh maba wajib melampirkan Surat Keterangan Lolos Seleksi (SIM-PMB) format PDF. Admin akan melakukan pengecekan maksimal 1x24 jam.'
    },
    {
      id: 'news-2',
      title: 'Jadwal Pengambilan Jas Almamater & Nametag Masta 2026',
      date: '20 Juli 2026',
      category: 'Akademik & Masta',
      author: 'BAAK UMKT',
      pinned: false,
      summary: 'Pengambilan Jas Almamater dilaksanakan di Gedung Olahraga (GOR) Kampus Utama mulai tanggal 1 - 5 Agustus 2026.',
      content: 'Syarat pengambilan: Membawa Bukti Pembayaran UKT Semester 1 dan Cetak Kartu Registrasi Ulang. Waktu pelayanan: 08.30 - 15.00 WITA.'
    },
    {
      id: 'news-3',
      title: 'Pembagian Kelompok Praktikum Dasar Pemrograman 2026',
      date: '18 Juli 2026',
      category: 'Laboratorium',
      author: 'Lab Komputer TI',
      pinned: false,
      summary: 'Daftar nama dan kelompok Praktikum Proglan hari Sabtu di Lab GF-1.02 telah di-publish.',
      content: 'Silakan cek file PDF pembagian sesi praktikum di grup angkatan atau papan pengumuman Lab Komputer GF-1.02. Praktikan wajib memakai kemeja rapi dan sepatu tertutup.'
    }
  ],

  // Initial Forum Threads
  initialForum: [
    {
      id: 'frm-1',
      author: 'Rian Febrian',
      nim: '261110045',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rian',
      title: 'Rekomendasi Spesifikasi Laptop untuk Anak TI Semester 1?',
      category: 'Umum & Peralatan',
      content: 'Halo teman-teman 2026! Mau tanya nih, laptop dengan RAM 8GB SSD 256GB kira-kira sudah cukup belum ya untuk koding C++ dan Python di Semester 1 ini? Atau wajib upgrade ke 16GB?',
      date: '21 Juli 2026 • 14:20 WITA',
      upvotes: 12,
      replies: [
        {
          author: 'Farhan Azhar',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Farhan',
          date: '21 Juli 2026 • 15:00 WITA',
          content: 'Untuk semester 1-2 C++ & Python sangat cukup bang RAM 8GB. Nanti pas masuk semester 3 (Web Dev / Mobile / Docker) baru disarankan upgrade ke 16GB.'
        },
        {
          author: 'Siti Aisyah',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Siti',
          date: '21 Juli 2026 • 15:45 WITA',
          content: 'Setuju! Yang paling penting SSD-nya minimal 256GB biar VS Code dan boot OS cepat.'
        }
      ]
    },
    {
      id: 'frm-2',
      author: 'Dika Prasetyo',
      nim: '261110112',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Dika',
      title: 'Ada yang mau bareng sewa kost daerah dekat Kampus UMKT?',
      category: 'Info Kost',
      content: 'Info dong buat kawan-kawan dari luar kota Samarinda. Ada yang lagi cari teman roomate kost cowok di sekitaran Juanda / Kampus UMKT? Budgets 600rb-800rb/bulan.',
      date: '20 Juli 2026 • 19:10 WITA',
      upvotes: 8,
      replies: [
        {
          author: 'Bagas Wahyu',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Bagas',
          date: '20 Juli 2026 • 20:00 WITA',
          content: 'Boleh tuh bro, gue juga dari Balikpapan belum dapat kost. PM di WA ya nanti pas grup WA udah terverifikasi!'
        }
      ]
    }
  ]
};
