import { ScheduleItem, TaskItem, NewsItem, ForumThread, WASubmission, MastaData, BTQData, AcademicTip } from '../types';

const INITIAL_SCHEDULES: ScheduleItem[] = [
  { id: 'sch-1', day: 'Senin', dayCode: 1, time: '07:30 - 09:10 WITA', startTime: '07:30', endTime: '09:10', course: 'Pancasila', lecturer: 'Drs. H. Ahmad Dahlan, M.Pd.', room: 'GF-3.02', building: 'Gedung Utama Lt. 3', sks: 2, badge: 'Teori', color: 'from-blue-600 to-indigo-600' },
  { id: 'sch-2', day: 'Senin', dayCode: 1, time: '09:15 - 10:55 WITA', startTime: '09:15', endTime: '10:55', course: 'Kemanusiaan dan Keimanan', lecturer: 'Dr. Muhammad Nur, M.Ag.', room: 'GF-3.02', building: 'Gedung Utama Lt. 3', sks: 2, badge: 'Teori', color: 'from-purple-600 to-pink-600' },
  { id: 'sch-3', day: 'Senin', dayCode: 1, time: '11:00 - 12:40 WITA', startTime: '11:00', endTime: '12:40', course: 'Aplikasi Komputer', lecturer: 'Budi Santoso, S.Kom., M.Kom.', room: 'GF-3.02', building: 'Gedung Utama Lt. 3', sks: 2, badge: 'Teori & Praktik', color: 'from-indigo-600 to-violet-600' },
  { id: 'sch-4', day: 'Senin', dayCode: 1, time: '13:30 - 15:10 WITA', startTime: '13:30', endTime: '15:10', course: 'Bahasa Inggris', lecturer: 'Siti Rahmah, M.Pd.', room: 'GF-3.02', building: 'Gedung Utama Lt. 3', sks: 2, badge: 'Teori', color: 'from-teal-600 to-emerald-600' },
  { id: 'sch-5', day: 'Selasa', dayCode: 2, time: '08:00 - 10:30 WITA', startTime: '08:00', endTime: '10:30', course: 'Dasar Pemrograman', lecturer: 'Rizal Wijaya, S.T., M.T.', room: 'GF-3.04', building: 'Gedung Utama Lt. 3', sks: 3, badge: 'Inti TI', color: 'from-indigo-600 to-blue-600' },
  { id: 'sch-6', day: 'Rabu', dayCode: 3, time: '07:30 - 10:00 WITA', startTime: '07:30', endTime: '10:00', course: 'Sistem Digital & Arsitektur Komputer', lecturer: 'Ir. Hendra Gunawan, M.T.', room: 'GF-3.03', building: 'Gedung Utama Lt. 3', sks: 3, badge: 'Inti TI', color: 'from-amber-600 to-orange-600' },
  { id: 'sch-7', day: 'Rabu', dayCode: 3, time: '10:15 - 12:00 WITA', startTime: '10:15', endTime: '12:00', course: 'Aljabar Linear', lecturer: 'Dewi Lestari, S.Si., M.Sc.', room: 'GF-3.03', building: 'Gedung Utama Lt. 3', sks: 2, badge: 'Matematika TI', color: 'from-cyan-600 to-blue-600' },
  { id: 'sch-8', day: 'Rabu', dayCode: 3, time: '13:30 - 16:00 WITA', startTime: '13:30', endTime: '16:00', course: 'Matematika Diskrit', lecturer: 'Dr. Agus Setiawan, M.Si.', room: 'GF-3.03', building: 'Gedung Utama Lt. 3', sks: 3, badge: 'Matematika TI', color: 'from-rose-600 to-pink-600' },
  { id: 'sch-9', day: 'Sabtu', dayCode: 6, time: '08:00 - 11:30 WITA', startTime: '08:00', endTime: '11:30', course: 'Praktikum Dasar Pemrograman', lecturer: 'Tim Asisten Laboratorium Komputer', room: 'Lab GF-1.02', building: 'Gedung Lab Komputer Lt. 1', sks: 1, badge: 'Praktikum Wajib', color: 'from-violet-600 to-purple-600' }
];

const INITIAL_TASKS: TaskItem[] = [
  { id: 'tsk-101', title: 'Instalasi VS Code & Compiler C++/Python', course: 'Dasar Pemrograman', deadline: '2026-08-05', priority: 'Tinggi', status: 'Belum Dikerjakan', description: 'Install Visual Studio Code, extension C/C++, MinGW compiler, & Python 3.11.' },
  { id: 'tsk-102', title: 'Membuat Rangkuman Tabel Kebenaran Logika', course: 'Sistem Digital', deadline: '2026-08-10', priority: 'Sedang', status: 'Dalam Proses', description: 'Tulis tangan rangkuman gerbang logika AND, OR, NOT, NAND, NOR di buku tebal.' },
  { id: 'tsk-103', title: 'Setoran Hafalan Surah Ad-Duha s/d Al-Qadr', course: 'Ujian BTQ / LAK', deadline: '2026-08-15', priority: 'Sangat Tinggi', status: 'Belum Dikerjakan', description: 'Latihan hafalan mandiri sebelum tes perdana dengan mentor LAK UMKT.' }
];

const INITIAL_NEWS: NewsItem[] = [
  { id: 'news-1', title: 'Pengumuman Resmi Pendaftaran & Verifikasi Grup WA Angkatan 2026', date: '22 Juli 2026', category: 'Pengumuman Resmi', author: 'Panitia Angkatan 2026', pinned: true, summary: 'Mahasiswa baru TI 2026 diwajibkan verifikasi identitas melalui Surat Lolos Seleksi (SIM-PMB PDF) untuk link resmi WA group.', content: 'Guna menghindari penyusupan akun spam/bot dan menjaga keamanan data mahasiswa baru Teknik Informatika UMKT 2026, seluruh maba wajib melampirkan Surat Keterangan Lolos Seleksi (SIM-PMB) format PDF. Admin akan melakukan pengecekan maksimal 1x24 jam.' },
  { id: 'news-2', title: 'Jadwal Pengambilan Jas Almamater & Nametag Masta 2026', date: '20 Juli 2026', category: 'Akademik & Masta', author: 'BAAK UMKT', pinned: false, summary: 'Pengambilan Jas Almamater dilaksanakan di GOR Kampus Utama mulai 1 - 5 Agustus 2026.', content: 'Syarat pengambilan: Membawa Bukti Pembayaran UKT Semester 1 dan Cetak Kartu Registrasi Ulang.' },
  { id: 'news-3', title: 'Pembagian Kelompok Praktikum Dasar Pemrograman 2026', date: '18 Juli 2026', category: 'Laboratorium', author: 'Lab Komputer TI', pinned: false, summary: 'Daftar nama dan kelompok Praktikum Proglan hari Sabtu di Lab GF-1.02 telah di-publish.', content: 'Silakan cek file PDF pembagian sesi praktikum di papan pengumuman Lab Komputer GF-1.02.' }
];

const INITIAL_FORUM: ForumThread[] = [
  {
    id: 'frm-1',
    author: 'Rian Febrian',
    nim: '261110045',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rian',
    title: 'Rekomendasi Spesifikasi Laptop untuk Anak TI Semester 1?',
    category: 'Umum & Peralatan',
    content: 'Halo teman-teman 2026! Mau tanya nih, laptop RAM 8GB SSD 256GB sudah cukup belum untuk koding C++ dan Python di Semester 1 ini?',
    date: '21 Juli 2026 • 14:20 WITA',
    upvotes: 14,
    replies: [
      { author: 'Farhan Azhar', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Farhan', date: '21 Juli 2026 • 15:00 WITA', content: 'Sangat cukup bang untuk semester 1-2 C++ & Python.' },
      { author: 'Siti Aisyah', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Siti', date: '21 Juli 2026 • 15:45 WITA', content: 'Setuju! Yang paling penting SSD-nya minimal 256GB.' }
    ]
  }
];

export const INITIAL_MASTA: MastaData = {
  disclaimer: 'Informasi panduan Masta di bawah ini disusun berdasarkan acuan pelaksanaan tahun sebelumnya (2025). Detail resmi Masta 2026 akan di-update mengikuti instruksi resmi Panitia Masta UMKT 2026.',
  stages: [
    { title: 'Masta Universitas & Fakultas (FST)', duration: 'Hari 1 - 2', description: 'Pengenalan kampus UMKT, rektorat, tata tertib akademik, dan pimpinan Fakultas Sains dan Teknologi (FST).', highlights: ['Sidang Terbuka Senat', 'Kuliah Umum Kebangsaan', 'Tour Kampus & Lab FST'] },
    { title: 'Masta Prodi Teknik Informatika', duration: 'Hari 3', description: 'Perkenalan dengan Ketua Prodi, Dosen Pembimbing Akademik (DPA), HMTI, kurikulum 2026, & etika koding.', highlights: ['Meet & Greet Dosen TI', 'Demo Karya Kakak Tingkat', 'Sharing Session HMTI'] },
    { title: 'Masta IMM (Ikatan Mahasiswa Muhammadiyah)', duration: 'Hari 4', description: 'Pengenalan nilai-nilai keislaman, ke-Muhammadiyahan, & organisasi mahasiswa.', highlights: ['Orasi Keilmuan', 'Game Kelompok', 'Pendaftaran PKIMM'] },
    { title: 'Malam Inagurasi & Puncak Masta', duration: 'Hari 5 (Penutupan)', description: 'Puncak selebrasi penerimaan mahasiswa baru angkatan 2026 dengan panggung seni & foto bersama angkatan.', highlights: ['Pentas Seni Maba', 'Inagurasi Angkatan 2026', 'Foto Bersama Angkatan'] }
  ],
  dressCode: [
    { type: 'Putra', items: ['Kemeja lengan panjang putih polos berkerah', 'Celana kain hitam polos (bukan jeans)', 'Dasi hitam polos & sabuk hitam', 'Sepatu pantofel/olahraga dominan hitam & kaus kaki putih'] },
    { type: 'Putri', items: ['Kemeja lengan panjang putih polos (menutup pinggul)', 'Rok kain hitam A-Line (tidak menerawang)', 'Jilbab segi empat polos putih (syar\'i)', 'Sepatu tertutup warna hitam & kaus kaki putih'] }
  ],
  equipments: [
    'Al-Qur\'an terjemahan ukuran sedang',
    'Buku catatan bergaris & alat tulis',
    'Nametag ID Card Masta 2026',
    'Air minum botol ulang pakai (tumbler min. 600ml)',
    'Bekal makanan sehat & obat pribadi',
    'Perlengkapan ibadah pribadi'
  ],
  dosAndDonts: {
    dos: ['Hadir tepat waktu 15 menit sebelum acara', 'Menjaga kerapian, kebersihan, & kesopanan', 'Menyapa dosen & panitia (3S: Senyum, Salam, Sapa)'],
    donts: ['Dilarang membawa rokok/vape & bahan terlarang', 'Dilarang memakai perhiasan mencolok/mahal', 'Dilarang mengaktifkan nada dering HP saat materi']
  }
};

export const INITIAL_BTQ: BTQData = {
  alertMessage: 'PERHATIAN MAHASISWA BARU: Kelulusan Ujian BTQ merupakan SYARAT WAJIB untuk mendaftar Sidang Skripsi/Pendadaran dan Yudisium di UMKT!',
  passingCriteria: [
    'Mampu membaca Al-Qur\'an dengan tartil sesuai kaidah ilmu Tajwid.',
    'Lulus hafalan minimal 23 Surah Pendek (Juz 30: Ad-Duha s/d An-Nas).',
    'Mampu menulis ayat Al-Qur\'an dasar & huruf hijaiyah berharakat.',
    'Nilai kelulusan minimal: B (Skor 75.00).'
  ],
  surahList: [
    'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-\'Alaq', 'Al-Qadr',
    'Al-Bayyinah', 'Az-Zalzalah', 'Al-\'Adiyat', 'Al-Qari\'ah', 'At-Takathur',
    'Al-\'Asr', 'Al-Humazah', 'Al-Fil', 'Quraysh', 'Al-Ma\'un',
    'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas',
    'Al-Falaq', 'An-Nas', 'Al-Fatihah'
  ],
  consequences: [
    'Mahasiswa yang TIDAK LULUS wajib mengikuti Matrikulasi BTQ selama 1 semester.',
    'Tidak bisa mengambil mata kuliah Skripsi apabila sertifikat BTQ belum terbit.',
    'Penundaan kelulusan/yudisium hingga syarat BTQ terpenuhi.'
  ],
  tipsForGradeA: [
    { title: '1. Cicil Hafalan 1 Surah Per Hari', desc: 'Alokasikan waktu 15 menit setelah sholat Shubuh untuk menghafal 1 surah pendek.' },
    { title: '2. Kuasai Hukum Tajwid Dasar', desc: 'Fokus pada Nun Mati/Tanwin (Izhhar, Ikhfa, Idgham, Iqlab) & Mad Far\'i.' },
    { title: '3. Gunakan Murottal & Setoran Teman', desc: 'Dengarkan Syeikh Al-Husary untuk menyempurnakan Makhraj huruf.' },
    { title: '4. Ikuti Bimbingan BTQ LAK UMKT', desc: 'Manfaatkan fasilitas mentoring gratis yang disediakan oleh LAK UMKT.' }
  ]
};

export const INITIAL_TIPS: AcademicTip[] = [
  { id: 'tip-1', title: '💻 Trik Survive Mata Kuliah Dasar Pemrograman', category: 'Koding & Studi', icon: 'code-2', tagColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300', content: 'Koding itu keterampilan motorik! Begitu dosen jelaskan variabel atau loop di C++/Python, langsung ketik di laptop. Kalau ketemu error, copas pesan error ke Google/ChatGPT dan pelajari titik koma (;).' },
  { id: 'tip-2', title: '🎯 Targetkan IPK Semester 1 Minimal 3.50', category: 'Akademik', icon: 'award', tagColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', content: 'Semester 1 waktu paling mudah menabung IPK tinggi. Jika IPK 3.80, kamu punya tabungan nilai aman saat masuk matkul berat di semester 3-4.' },
  { id: 'tip-3', title: '🤝 Cari "Circle" Belajar yang Saling Support', category: 'Sosial', icon: 'users', tagColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300', content: 'Bentuk circle belajar 3-5 orang yang punya ambisi lulus tepat waktu. Saat ada tugas koding, kalian bisa saling bantu debugging.' },
  { id: 'tip-4', title: '📧 Etika Chat & Berkomunikasi dengan Dosen TI', category: 'Etika Kampus', icon: 'message-square', tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300', content: 'Rumus 5S: 1. Salam, 2. Sebutkan Nama & NIM & Kelas, 3. Utarakan Tujuan dengan sopan & singkat, 4. Terima Kasih, 5. Kirim jam kerja (08.00-16.00 WITA).' },
  { id: 'tip-5', title: '⏰ Manajemen Waktu: Rule 2 Jam Setelah Kuliah', category: 'Produktifitas', icon: 'clock', tagColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300', content: 'Biasakan luangkan 2 jam di malam hari untuk me-review materi hari itu atau mencicil tugas. Koding butuh ketenangan logika, bukan Sistem Kebut Semalam (SKS).' }
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Simulated REST API Service backed by LocalStorage
export const mockApi = {
  // Schedules Query
  async getSchedules(): Promise<ScheduleItem[]> {
    await delay(150);
    return INITIAL_SCHEDULES;
  },

  // Tasks Queries & Mutations
  async getTasks(): Promise<TaskItem[]> {
    await delay(200);
    const data = localStorage.getItem('infotik_tasks');
    return data ? JSON.parse(data) : INITIAL_TASKS;
  },

  async createTask(newTask: Omit<TaskItem, 'id' | 'status'>): Promise<TaskItem> {
    await delay(300);
    const tasks = await this.getTasks();
    const item: TaskItem = {
      id: 'tsk-' + Date.now(),
      status: 'Belum Dikerjakan',
      ...newTask
    };
    tasks.unshift(item);
    localStorage.setItem('infotik_tasks', JSON.stringify(tasks));
    return item;
  },

  async updateTaskStatus(taskId: string, status: TaskItem['status']): Promise<TaskItem[]> {
    await delay(200);
    const tasks = await this.getTasks();
    const updated = tasks.map(t => t.id === taskId ? { ...t, status } : t);
    localStorage.setItem('infotik_tasks', JSON.stringify(updated));
    return updated;
  },

  async deleteTask(taskId: string): Promise<TaskItem[]> {
    await delay(200);
    const tasks = await this.getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    localStorage.setItem('infotik_tasks', JSON.stringify(filtered));
    return filtered;
  },

  // News Queries & Mutations
  async getNews(): Promise<NewsItem[]> {
    await delay(200);
    const data = localStorage.getItem('infotik_news');
    return data ? JSON.parse(data) : INITIAL_NEWS;
  },

  async createNews(newNews: Omit<NewsItem, 'id' | 'date' | 'author'>): Promise<NewsItem> {
    await delay(300);
    const list = await this.getNews();
    const item: NewsItem = {
      id: 'news-' + Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: 'Admin Angkatan 2026',
      ...newNews
    };
    list.unshift(item);
    localStorage.setItem('infotik_news', JSON.stringify(list));
    return item;
  },

  async deleteNews(newsId: string): Promise<NewsItem[]> {
    await delay(200);
    const list = await this.getNews();
    const filtered = list.filter(n => n.id !== newsId);
    localStorage.setItem('infotik_news', JSON.stringify(filtered));
    return filtered;
  },

  // Forum Queries & Mutations
  async getForum(): Promise<ForumThread[]> {
    await delay(200);
    const data = localStorage.getItem('infotik_forum');
    return data ? JSON.parse(data) : INITIAL_FORUM;
  },

  async createThread(newThread: { author: string; title: string; category: string; content: string }): Promise<ForumThread> {
    await delay(300);
    const forum = await this.getForum();
    const thread: ForumThread = {
      id: 'frm-' + Date.now(),
      author: newThread.author || 'Maba TI 2026',
      nim: '261110' + Math.floor(100 + Math.random() * 900),
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(newThread.author || 'Maba'),
      title: newThread.title,
      category: newThread.category,
      content: newThread.content,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ' • Baru saja',
      upvotes: 1,
      replies: []
    };
    forum.unshift(thread);
    localStorage.setItem('infotik_forum', JSON.stringify(forum));
    return thread;
  },

  async upvoteThread(threadId: string): Promise<ForumThread[]> {
    await delay(150);
    const forum = await this.getForum();
    const updated = forum.map(f => f.id === threadId ? { ...f, upvotes: f.upvotes + 1 } : f);
    localStorage.setItem('infotik_forum', JSON.stringify(updated));
    return updated;
  },

  async addReply(threadId: string, content: string, author: string): Promise<ForumThread[]> {
    await delay(200);
    const forum = await this.getForum();
    const updated = forum.map(f => {
      if (f.id === threadId) {
        return {
          ...f,
          replies: [
            ...f.replies,
            {
              author: author || 'Maba TI 2026',
              avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(author || 'Maba'),
              date: 'Hari ini • Baru saja',
              content
            }
          ]
        };
      }
      return f;
    });
    localStorage.setItem('infotik_forum', JSON.stringify(updated));
    return updated;
  },

  // WA Verification Queries & Mutations
  async getWASubmissions(): Promise<WASubmission[]> {
    await delay(200);
    const data = localStorage.getItem('infotik_wa_submissions');
    return data ? JSON.parse(data) : [];
  },

  async submitWAGroupVerification(formData: { name: string; nim: string; fileName: string; fileSize: string }): Promise<WASubmission> {
    await delay(400);
    const submissions = await this.getWASubmissions();
    const ticketId = 'WA26-' + Math.floor(100000 + Math.random() * 900000);
    const submission: WASubmission = {
      id: ticketId,
      name: formData.name,
      nim: formData.nim,
      fileName: formData.fileName || 'Surat_Lolos_Seleksi_SIMPMB.pdf',
      fileSize: formData.fileSize || '1.2 MB',
      submittedAt: new Date().toLocaleString('id-ID'),
      status: 'Pending',
      waLink: 'https://chat.whatsapp.com/INFOTIK2026UMKTOFFICIALHUB'
    };

    const filtered = submissions.filter(s => s.nim !== formData.nim);
    filtered.unshift(submission);

    localStorage.setItem('infotik_wa_submissions', JSON.stringify(filtered));
    localStorage.setItem('infotik_my_wa_submission', JSON.stringify(submission));
    return submission;
  },

  async updateWASubmissionStatus(ticketId: string, status: WASubmission['status']): Promise<WASubmission[]> {
    await delay(200);
    const submissions = await this.getWASubmissions();
    const updated = submissions.map(s => s.id === ticketId ? { ...s, status } : s);
    localStorage.setItem('infotik_wa_submissions', JSON.stringify(updated));

    const mySub = localStorage.getItem('infotik_my_wa_submission');
    if (mySub) {
      const parsed: WASubmission = JSON.parse(mySub);
      if (parsed.id === ticketId) {
        parsed.status = status;
        localStorage.setItem('infotik_my_wa_submission', JSON.stringify(parsed));
      }
    }
    return updated;
  }
};
