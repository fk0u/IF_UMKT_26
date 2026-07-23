/* Hallmark · service: mockApi · pre-emit critique: P5 H5 E5 S5 R5 V5 · genre: full-stack-hybrid · theme: Custom Indigo-Midnight */
import { ScheduleItem, TaskItem, NewsItem, ForumThread, WASubmission, MastaData, BTQData, AcademicTip, UserAccount } from '../types';
import { secureStorage, encryptData } from '../utils/secureStorage';

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
  {
    id: 'news-1',
    title: 'Panduan Registrasi Kartu Rencana Studi (KRS) Semester 1',
    category: 'Pengumuman Resmi',
    summary: 'Langkah-langkah pengisian KRS bagi mahasiswa angkatan 2026 melalui sistem portal akademik SIA UMKT.',
    content: 'Dihimbau kepada seluruh mahasiswa baru angkatan 2026 untuk menyelesaikan administrasi KRS online paling lambat 10 Agustus 2026. Pastikan memilih kelas sesuai jadwal TI-2026 agar tidak terjadi bentrok mata kuliah.',
    date: '20 Juli 2026',
    author: 'BAAK Teknik Informatika',
    pinned: true
  },
  {
    id: 'news-2',
    title: 'Pelaksanaan Masta (Masa Ta\'aruf) Angkatan 2026',
    category: 'Akademik & Masta',
    summary: 'Jadwal, dresscode, dan tata tertib orientasi mahasiswa baru Teknik Informatika.',
    content: 'Masta 2026 akan dilaksanakan secara luring terpusat di Edutorium UMKT mulai tanggal 1-4 Agustus 2026. Atribut wajib berupa kemeja putih polos, celana hitam, almamater, dan name tag.',
    date: '18 Juli 2026',
    author: 'Panitia Masta 2026',
    pinned: false
  }
];

const INITIAL_FORUM: ForumThread[] = [
  {
    id: 'th-1',
    title: 'Rekomendasi Spesifikasi Laptop untuk Anak TI Semester 1?',
    category: 'Umum & Peralatan',
    author: 'Rian Febrian',
    nim: '261110045',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rian',
    content: 'Halo teman-teman 2026! Mau tanya nih, laptop RAM 8GB SSD 256GB sudah cukup belum untuk koding C++ dan Python di Semester 1 ini?',
    date: '21 Juli 2026',
    upvotes: 14,
    replies: [
      {
        author: 'Farhan Azhar',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Farhan',
        content: 'Sangat cukup bang untuk semester 1-2 C++ & Python.',
        date: '21 Juli 2026'
      },
      {
        author: 'Siti Aisyah',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Siti',
        content: 'Setuju! Yang paling penting SSD-nya minimal 256GB.',
        date: '21 Juli 2026'
      }
    ]
  }
];

export const INITIAL_MASTA: MastaData = {
  disclaimer: 'Informasi Masta ini bersifat dinamis mengikuti instruksi Panitia Pusat UMKT. Pastikan terus memantau grup koordinasi resmi.',
  stages: [
    { title: 'Pembukaan Masta Universitas', duration: 'Hari ke-1', description: 'Upacara pembukaan orientasi terpusat untuk seluruh mahasiswa baru UMKT.', highlights: ['Penyematan Almamater', 'Kuliah Umum Rektor'] },
    { title: 'Masta Kemuhammadiyahan', duration: 'Hari ke-2 & ke-3', description: 'Orientasi keislaman, kemuhammadiyahan, serta pengenalan organisasi ikatan mahasiswa.', highlights: ['Materi AIK', 'Sosialisasi IMM'] },
    { title: 'Orientasi Fakultas & Prodi', duration: 'Hari ke-4', description: 'Pengenalan lingkungan fakultas sains teknologi dan kurikulum prodi Teknik Informatika.', highlights: ['Kurikulum TI', 'Kunjungan Laboratorium'] }
  ],
  dressCode: [
    { type: 'Putra', items: ['Kemeja putih lengan panjang polos.', 'Celana kain warna hitam.', 'Sepatu tertutup dominan hitam.'] },
    { type: 'Putri', items: ['Kemeja putih lengan panjang polos.', 'Rok kain panjang warna hitam.', 'Kerudung kain warna hitam.', 'Sepatu tertutup hitam.'] }
  ],
  equipments: ['Kartu Masta Resmi', 'Buku Catatan & Pena', 'Almamater UMKT', 'Obat-obatan pribadi'],
  dosAndDonts: {
    dos: ['Hadir tepat waktu', 'Mengenakan atribut lengkap', 'Menjaga sopan santun'],
    donts: ['Membawa senjata tajam', 'Merokok di area kampus', 'Meninggalkan acara tanpa izin']
  }
};

export const INITIAL_BTQ: BTQData = {
  alertMessage: 'Ujian BTQ merupakan syarat kelulusan yudisium wajib bagi seluruh mahasiswa UMKT.',
  passingCriteria: [
    'Mampu membaca Al-Qur\'an secara tartil.',
    'Hafal Juz 30 (Surah Ad-Duha s/d An-Nas).',
    'Lolos ujian lisan ilmu tajwid dasar.'
  ],
  surahList: [
    'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-\'Alaq', 'Al-Qadr',
    'Al-Bayyinah', 'Az-Zalzalah', 'Al-\'Adiyat', 'Al-Qari\'ah', 'At-Takathur',
    'Al-\'Asr', 'Al-Humazah', 'Al-Fil', 'Quraysh', 'Al-Ma\'un',
    'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas',
    'Al-Falaq', 'An-Nas', 'Al-Fatihah'
  ],
  consequences: [
    'Wajib mengikuti kelas matrikulasi khusus jika belum lulus.',
    'Tidak diperbolehkan mengajukan ujian skripsi.'
  ],
  tipsForGradeA: [
    { title: 'Cicil Hafalan Harian', desc: 'Hafalkan minimal 1 surah pendek selepas sholat Shubuh.' },
    { title: 'Latihan Bersama Mentor', desc: 'Manfaatkan program asistensi LAK secara berkala.' }
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

// Full-Stack Dynamic Fetch Handler with LocalStorage fallbacks
const fetchOrFallback = async <T>(url: string, options?: RequestInit, fallback?: () => Promise<T>): Promise<T> => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return await res.json();
    }
    throw new Error(`API Error status ${res.status}`);
  } catch (err) {
    if (fallback) {
      console.warn(`[Full-Stack Hybrid] API failed (${url}). Falling back to localStorage.`, err);
      return await fallback();
    }
    throw err;
  }
};

function isAngkatan25OrOther(nim: string) {
  const prefix = nim.trim().substring(0, 2);
  return prefix !== '' && prefix !== '26' && !isNaN(Number(prefix));
}

// REST API Service backed by real Express API with transparent fallbacks
export const mockApi = {
  // Schedules Query
  async getSchedules(): Promise<ScheduleItem[]> {
    return fetchOrFallback<ScheduleItem[]>('/api/schedules', {}, async () => {
      await delay(150);
      return INITIAL_SCHEDULES;
    });
  },

  // Tasks Queries & Mutations
  async getTasks(): Promise<TaskItem[]> {
    return fetchOrFallback<TaskItem[]>('/api/tasks', {}, async () => {
      await delay(200);
      const data = secureStorage.getItem<TaskItem[]>('infotik_tasks');
      return data || INITIAL_TASKS;
    });
  },

  async createTask(newTask: Omit<TaskItem, 'id' | 'status'>): Promise<TaskItem> {
    return fetchOrFallback<TaskItem>('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }, async () => {
      await delay(300);
      const tasks = await this.getTasks();
      const item: TaskItem = {
        id: 'tsk-' + Date.now(),
        status: 'Belum Dikerjakan',
        ...newTask
      };
      tasks.unshift(item);
      secureStorage.setItem('infotik_tasks', tasks);
      return item;
    });
  },

  async updateTaskStatus(taskId: string, status: TaskItem['status']): Promise<TaskItem[]> {
    return fetchOrFallback<TaskItem[]>(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }, async () => {
      await delay(200);
      const tasks = await this.getTasks();
      const updated = tasks.map(t => t.id === taskId ? { ...t, status } : t);
      secureStorage.setItem('infotik_tasks', updated);
      return updated;
    });
  },

  async deleteTask(taskId: string): Promise<TaskItem[]> {
    return fetchOrFallback<TaskItem[]>(`/api/tasks/${taskId}`, {
      method: 'DELETE'
    }, async () => {
      await delay(200);
      const tasks = await this.getTasks();
      const filtered = tasks.filter(t => t.id !== taskId);
      secureStorage.setItem('infotik_tasks', filtered);
      return filtered;
    });
  },

  // News Queries & Mutations
  async getNews(): Promise<NewsItem[]> {
    return fetchOrFallback<NewsItem[]>('/api/news', {}, async () => {
      await delay(200);
      const data = secureStorage.getItem<NewsItem[]>('infotik_news');
      return data || INITIAL_NEWS;
    });
  },

  async createNews(newNews: Omit<NewsItem, 'id' | 'date' | 'author'>): Promise<NewsItem> {
    return fetchOrFallback<NewsItem>('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNews)
    }, async () => {
      await delay(300);
      const list = await this.getNews();
      const item: NewsItem = {
        id: 'news-' + Date.now(),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        author: 'Admin Angkatan 2026',
        ...newNews
      };
      list.unshift(item);
      secureStorage.setItem('infotik_news', list);
      return item;
    });
  },

  async deleteNews(newsId: string): Promise<NewsItem[]> {
    return fetchOrFallback<NewsItem[]>(`/api/news/${newsId}`, {
      method: 'DELETE'
    }, async () => {
      await delay(200);
      const list = await this.getNews();
      const filtered = list.filter(n => n.id !== newsId);
      secureStorage.setItem('infotik_news', filtered);
      return filtered;
    });
  },

  // Forum Queries & Mutations
  async getForum(): Promise<ForumThread[]> {
    return fetchOrFallback<ForumThread[]>('/api/forum', {}, async () => {
      await delay(200);
      const data = secureStorage.getItem<ForumThread[]>('infotik_forum');
      return data || INITIAL_FORUM;
    });
  },

  async createThread(newThread: { author: string; title: string; category: string; content: string }): Promise<ForumThread> {
    return fetchOrFallback<ForumThread>('/api/forum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newThread)
    }, async () => {
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
      secureStorage.setItem('infotik_forum', forum);
      return thread;
    });
  },

  async upvoteThread(threadId: string): Promise<ForumThread[]> {
    return fetchOrFallback<ForumThread[]>(`/api/forum/${threadId}/upvote`, {
      method: 'POST'
    }, async () => {
      await delay(150);
      const forum = await this.getForum();
      const updated = forum.map(f => f.id === threadId ? { ...f, upvotes: f.upvotes + 1 } : f);
      secureStorage.setItem('infotik_forum', updated);
      return updated;
    });
  },

  async addReply(threadId: string, content: string, author: string): Promise<ForumThread[]> {
    return fetchOrFallback<ForumThread[]>(`/api/forum/${threadId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content })
    }, async () => {
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
      secureStorage.setItem('infotik_forum', updated);
      return updated;
    });
  },

  // WA Verification Queries & Mutations
  async getWASubmissions(): Promise<WASubmission[]> {
    return fetchOrFallback<WASubmission[]>('/api/wa-submissions', {}, async () => {
      await delay(200);
      const data = secureStorage.getItem<WASubmission[]>('infotik_wa_submissions');
      return data || [];
    });
  },

  /**
   * Submit WA group verification with real OCR result.
   * ocrSuccess: boolean from real engine (not simulated fields)
   */
  async submitWAGroupVerification(formData: { 
    name: string; 
    nim: string; 
    whatsapp: string; 
    fileName: string; 
    fileSize: string;
    ocrSuccess: boolean;
    ocrChecks?: {
      nameMatches: boolean;
      nimMatches: boolean;
      prodiMatches: boolean;
      yearMatches: boolean;
    };
  }): Promise<WASubmission> {
    // Try real backend first
    const backendPayload = {
      name: formData.name,
      nim: formData.nim,
      whatsapp: formData.whatsapp,
      fileName: formData.fileName,
      fileSize: formData.fileSize,
      ocrSuccess: formData.ocrSuccess
    };
    return fetchOrFallback<WASubmission>('/api/wa-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendPayload)
    }, async () => {
      // localStorage fallback when backend is unavailable
      await delay(1000);
      const submissions = await this.getWASubmissions();
      const ticketId = 'WA26-' + Math.floor(100000 + Math.random() * 900000);

      const isAngkatan2026 = formData.nim.trim().startsWith('26');
      let status: WASubmission['status'] = 'Pending';
      let rejectionReason = '';

      if (!isAngkatan2026) {
        status = 'Rejected';
        const year = formData.nim.trim().substring(0, 2);
        rejectionReason = `NIM Terdeteksi Angkatan 20${year || 'XX'}. Hanya Mahasiswa Angkatan 2026 yang diperbolehkan bergabung grup WA Resmi.`;
      } else if (!formData.ocrSuccess) {
        status = 'Rejected';
        const checks = formData.ocrChecks;
        rejectionReason = 'Gagal Verifikasi OCR: Ketidakcocokan Dokumen. ';
        if (checks) {
          if (!checks.nameMatches) rejectionReason += 'Nama tidak cocok. ';
          if (!checks.nimMatches) rejectionReason += 'NIM tidak cocok. ';
          if (!checks.prodiMatches) rejectionReason += 'Prodi bukan Teknik Informatika. ';
          if (!checks.yearMatches) rejectionReason += 'Tahun surat bukan 2026. ';
        }
      } else {
        status = 'Approved';
      }

      const submission: WASubmission = {
        id: ticketId,
        name: formData.name,
        nim: formData.nim,
        whatsapp: formData.whatsapp,
        fileName: formData.fileName || 'Surat_Lolos_Seleksi_SIMPMB.pdf',
        fileSize: formData.fileSize || '1.2 MB',
        submittedAt: new Date().toLocaleString('id-ID'),
        status,
        rejectionReason,
        waLink: import.meta.env.VITE_WA_GROUP_LINK || 'https://chat.whatsapp.com/INFOTIK2026UMKTOFFICIALHUB'
      };

      const ticketData = {
        id: ticketId,
        name: formData.name,
        nim: formData.nim,
        whatsapp: formData.whatsapp,
        status,
        submittedAt: submission.submittedAt
      };
      submission.verificationToken = encryptData(ticketData);

      const filtered = submissions.filter(s => s.nim !== formData.nim);
      filtered.unshift(submission);
      secureStorage.setItem('infotik_wa_submissions', filtered);
      secureStorage.setItem('infotik_my_wa_submission', submission);
      return submission;
    });
  },

  /**
   * Verifies an encrypted token via the backend decryption endpoint.
   * Returns the decoded submission data if valid.
   */
  async verifyToken(token: string): Promise<{ valid: boolean; data?: any; message?: string }> {
    return fetchOrFallback<{ valid: boolean; data?: any; message?: string }>(
      '/api/wa-submissions/verify-token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      },
      async () => {
        // offline fallback: token cannot be decrypted without server key
        return { valid: false, message: 'Server tidak tersedia. Verifikasi token membutuhkan koneksi backend.' };
      }
    );
  },

  /**
   * Returns a pre-filled WhatsApp URL to notify the admin about a submission.
   * The message includes the encrypted token so the admin can verify it server-side.
   */
  buildAdminWANotifLink(submission: WASubmission): string {
    const adminNumber = import.meta.env.VITE_ADMIN_WA_NUMBER || '62811103542';
    const token = submission.verificationToken || '[token-tidak-tersedia]';
    const msg = [
      `*[INFOTIK-2026] Laporan Verifikasi WA*`,
      `────────────────────────`,
      `Tiket  : ${submission.id}`,
      `Nama   : ${submission.name}`,
      `NIM    : ${submission.nim}`,
      `WA     : ${submission.whatsapp}`,
      `Status : ${submission.status}`,
      `Waktu  : ${submission.submittedAt}`,
      `────────────────────────`,
      `Token Verifikasi (enkripsi):`,
      token,
      `────────────────────────`,
      `Verifikasi token via Panel Admin INFOTIK.`
    ].join('\n');
    return `https://wa.me/${adminNumber}?text=${encodeURIComponent(msg)}`;
  },

  async updateWASubmissionStatus(ticketId: string, status: WASubmission['status'], rejectionReason?: string): Promise<WASubmission[]> {
    return fetchOrFallback<WASubmission[]>(`/api/wa-submissions/${ticketId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, rejectionReason })
    }, async () => {
      await delay(200);
      const submissions = await this.getWASubmissions();
      const updated = submissions.map(s => {
        if (s.id === ticketId) {
          const nextSub = { ...s, status, rejectionReason: rejectionReason || s.rejectionReason };
          const ticketData = {
            id: nextSub.id,
            name: nextSub.name,
            nim: nextSub.nim,
            whatsapp: nextSub.whatsapp,
            status: nextSub.status,
            submittedAt: nextSub.submittedAt
          };
          nextSub.verificationToken = encryptData(ticketData);
          return nextSub;
        }
        return s;
      });
      secureStorage.setItem('infotik_wa_submissions', updated);

      const mySub = secureStorage.getItem<WASubmission>('infotik_my_wa_submission');
      if (mySub && mySub.id === ticketId) {
        mySub.status = status;
        if (rejectionReason) mySub.rejectionReason = rejectionReason;
        const ticketData = {
          id: mySub.id,
          name: mySub.name,
          nim: mySub.nim,
          whatsapp: mySub.whatsapp,
          status: mySub.status,
          submittedAt: mySub.submittedAt
        };
        mySub.verificationToken = encryptData(ticketData);
        secureStorage.setItem('infotik_my_wa_submission', mySub);
      }
      return updated;
    });
  },

  // User CRUD for Admin ERP
  async createUser(user: Omit<UserAccount, 'id' | 'avatar'>): Promise<UserAccount> {
    return fetchOrFallback<UserAccount>('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }, async () => {
      await delay(300);
      const data = secureStorage.getItem<UserAccount[]>('infotik_users');
      const list: UserAccount[] = data || [];
      const newUser: UserAccount = {
        ...user,
        id: 'usr-' + Date.now(),
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`
      };
      list.push(newUser);
      secureStorage.setItem('infotik_users', list);
      return newUser;
    });
  },

  async updateUser(userId: string, fields: Partial<UserAccount>): Promise<UserAccount[]> {
    return fetchOrFallback<UserAccount[]>(`/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }, async () => {
      await delay(200);
      const data = secureStorage.getItem<UserAccount[]>('infotik_users');
      const list: UserAccount[] = data || [];
      const updated = list.map(u => u.id === userId ? { ...u, ...fields } : u);
      secureStorage.setItem('infotik_users', updated);
      return updated;
    });
  },

  async deleteUser(userId: string): Promise<UserAccount[]> {
    return fetchOrFallback<UserAccount[]>(`/api/users/${userId}`, {
      method: 'DELETE'
    }, async () => {
      await delay(200);
      const data = secureStorage.getItem<UserAccount[]>('infotik_users');
      const list: UserAccount[] = data || [];
      const filtered = list.filter(u => u.id !== userId);
      secureStorage.setItem('infotik_users', filtered);
      return filtered;
    });
  },

  // Forum CRUD/Moderasi
  async updateThread(threadId: string, fields: Partial<ForumThread>): Promise<ForumThread[]> {
    return fetchOrFallback<ForumThread[]>(`/api/forum/${threadId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }, async () => {
      await delay(200);
      const list = await this.getForum();
      const updated = list.map(t => t.id === threadId ? { ...t, ...fields } : t);
      secureStorage.setItem('infotik_forum', updated);
      return updated;
    });
  },

  async deleteThread(threadId: string): Promise<ForumThread[]> {
    return fetchOrFallback<ForumThread[]>(`/api/forum/${threadId}`, {
      method: 'DELETE'
    }, async () => {
      await delay(200);
      const list = await this.getForum();
      const filtered = list.filter(t => t.id !== threadId);
      secureStorage.setItem('infotik_forum', filtered);
      return filtered;
    });
  },

  async deleteReply(threadId: string, replyIdx: number): Promise<ForumThread[]> {
    return fetchOrFallback<ForumThread[]>(`/api/forum/${threadId}/replies/${replyIdx}`, {
      method: 'DELETE'
    }, async () => {
      await delay(200);
      const list = await this.getForum();
      const updated = list.map(t => {
        if (t.id === threadId) {
          const reps = [...t.replies];
          reps.splice(replyIdx, 1);
          return { ...t, replies: reps };
        }
        return t;
      });
      secureStorage.setItem('infotik_forum', updated);
      return updated;
    });
  },

  // News CRUD update
  async updateNews(newsId: string, fields: Partial<NewsItem>): Promise<NewsItem[]> {
    return fetchOrFallback<NewsItem[]>(`/api/news/${newsId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }, async () => {
      await delay(200);
      const list = await this.getNews();
      const updated = list.map(n => n.id === newsId ? { ...n, ...fields } : n);
      secureStorage.setItem('infotik_news', updated);
      return updated;
    });
  },

  // Tasks CRUD update
  async updateTask(taskId: string, fields: Partial<TaskItem>): Promise<TaskItem[]> {
    return fetchOrFallback<TaskItem[]>(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    }, async () => {
      await delay(200);
      const list = await this.getTasks();
      const updated = list.map(t => t.id === taskId ? { ...t, ...fields } : t);
      secureStorage.setItem('infotik_tasks', updated);
      return updated;
    });
  },

  async deleteWASubmission(ticketId: string): Promise<WASubmission[]> {
    return fetchOrFallback<WASubmission[]>(`/api/wa-submissions/${ticketId}`, {
      method: 'DELETE'
    }, async () => {
      await delay(200);
      const list = await this.getWASubmissions();
      const filtered = list.filter(s => s.id !== ticketId);
      secureStorage.setItem('infotik_wa_submissions', filtered);
      return filtered;
    });
  }
};
