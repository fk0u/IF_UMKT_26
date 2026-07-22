/* Hallmark · backend: api/index.ts · genre: full-stack-serverless · theme: Custom Indigo-Midnight */
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

// Global Security Headers Middleware (Startup/Enterprise Grade)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// Enterprise Hashing Helper
export function hashPassword(password: string): string {
  return crypto.createHmac('sha256', 'infotik26_backend_hash_salt').update(password).digest('hex');
}

// Symmetric Encryption Setup for WA Verification Tokens (Symmetrical AES-256-CBC)
const SECRET = process.env.VERIFICATION_SECRET_KEY || 'infotik26_default_secret_key_32_bytes_long_secret';
const ENCRYPTION_KEY = crypto.createHash('sha256').update(SECRET).digest();
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
  try {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    throw new Error('Dekripsi gagal. Token tidak valid atau dimanipulasi.');
  }
}

// In-Memory Database State
const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Rian Febrian',
    nim: '261110045',
    whatsapp: '081234567890',
    email: 'rian@example.com',
    password: hashPassword('password123'),
    role: 'user' as const,
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rian'
  },
  {
    id: 'usr-admin',
    name: 'Admin BAAK IF 2026',
    nim: '261110001',
    whatsapp: '089988776655',
    email: 'admin@example.com',
    password: hashPassword('admin2026password'), // Fallback default password
    role: 'admin' as const,
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=BAAK'
  }
];

const INITIAL_SCHEDULES = [
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

const INITIAL_TASKS = [
  { id: 'tsk-101', title: 'Instalasi VS Code & Compiler C++/Python', course: 'Dasar Pemrograman', deadline: '2026-08-05', priority: 'Tinggi' as const, status: 'Belum Dikerjakan', description: 'Install Visual Studio Code, extension C/C++, MinGW compiler, & Python 3.11.' },
  { id: 'tsk-102', title: 'Membuat Rangkuman Tabel Kebenaran Logika', course: 'Sistem Digital', deadline: '2026-08-10', priority: 'Sedang' as const, status: 'Dalam Proses', description: 'Tulis tangan rangkuman gerbang logika AND, OR, NOT, NAND, NOR di buku tebal.' },
  { id: 'tsk-103', title: 'Setoran Hafalan Surah Ad-Duha s/d Al-Qadr', course: 'Ujian BTQ / LAK', deadline: '2026-08-15', priority: 'Sangat Tinggi' as const, status: 'Belum Dikerjakan', description: 'Latihan hafalan mandiri sebelum tes perdana dengan mentor LAK UMKT.' }
];

const INITIAL_NEWS = [
  {
    id: 'news-1',
    title: 'Panduan Registrasi Kartu Rencana Studi (KRS) Semester 1',
    category: 'Pengumuman Resmi' as const,
    summary: 'Langkah-langkah pengisian KRS bagi mahasiswa angkatan 2026 melalui sistem portal akademik SIA UMKT.',
    content: 'Dihimbau kepada seluruh mahasiswa baru angkatan 2026 untuk menyelesaikan administrasi KRS online paling lambat 10 Agustus 2026. Pastikan memilih kelas sesuai jadwal TI-2026 agar tidak terjadi bentrok mata kuliah.',
    date: '20 Juli 2026',
    author: 'BAAK Teknik Informatika',
    pinned: true
  },
  {
    id: 'news-2',
    title: 'Pelaksanaan Masta (Masa Ta\'aruf) Angkatan 2026',
    category: 'Akademik & Masta' as const,
    summary: 'Jadwal, dresscode, dan tata tertib orientasi mahasiswa baru Teknik Informatika.',
    content: 'Masta 2026 akan dilaksanakan secara luring terpusat di Edutorium UMKT mulai tanggal 1-4 Agustus 2026. Atribut wajib berupa kemeja putih polos, celana hitam, almamater, dan name tag.',
    date: '18 Juli 2026',
    author: 'Panitia Masta 2026',
    pinned: false
  }
];

const INITIAL_FORUM = [
  {
    id: 'th-1',
    title: 'Rekomendasi Spesifikasi Laptop untuk Anak TI Semester 1?',
    category: 'Umum & Peralatan' as const,
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

const INITIAL_WA_SUBMISSIONS = [
  {
    id: 'tkt-001',
    name: 'Rian Febrian',
    nim: '261110045',
    whatsapp: '081234567890',
    fileName: 'bukti_kelulusan_rian.pdf',
    fileSize: '342 KB',
    status: 'Approved' as const,
    submittedAt: '21 Juli 2026 • 11:30'
  }
];

// Memory Stores
let dbUsers = [...INITIAL_USERS];
let dbTasks = [...INITIAL_TASKS];
let dbNews = [...INITIAL_NEWS];
let dbForum = [...INITIAL_FORUM];
let dbWASubmissions = [...INITIAL_WA_SUBMISSIONS];

// HEALTH ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AUTH ENDPOINTS
app.post('/api/auth/login', (req, res) => {
  const { emailOrNim, password } = req.body;
  const hashedPassword = hashPassword(password);
  const user = dbUsers.find(
    (u) => (u.email === emailOrNim || u.nim === emailOrNim) && u.password === hashedPassword
  );

  if (!user) {
    return res.status(401).json({ message: 'Email/NIM atau password salah.' });
  }
  res.json({ user });
});

app.post('/api/auth/register', (req, res) => {
  const { name, nim, whatsapp, email, password, role, adminCode } = req.body;

  // Validate 26 prefix for student
  if (role !== 'admin' && !nim.startsWith('26')) {
    return res.status(400).json({ message: 'Registrasi ditolak. NIM Anda harus diawali dengan angka 26.' });
  }

  // Validate Admin invite code
  if (role === 'admin') {
    const defaultInvite = 'admin2026';
    if (adminCode !== defaultInvite) {
      return res.status(400).json({ message: 'Kode undangan registrasi administrator salah/tidak valid!' });
    }
  }

  const exists = dbUsers.find((u) => u.email === email || u.nim === nim);
  if (exists) {
    return res.status(400).json({ message: 'Email atau NIM sudah terdaftar.' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    nim,
    whatsapp,
    email,
    password: hashPassword(password),
    role: (role === 'admin' ? 'admin' : 'user') as any,
    avatar: `https://api.dicebear.com/7.x/${role === 'admin' ? 'identicon' : 'bottts'}/svg?seed=${encodeURIComponent(name)}`
  };

  dbUsers.push(newUser);
  res.status(201).json({ user: newUser });
});

// USERS CRUD
app.get('/api/users', (req, res) => {
  res.json(dbUsers);
});

app.post('/api/users', (req, res) => {
  const { name, nim, whatsapp, email, password, role } = req.body;
  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    nim,
    whatsapp,
    email,
    password: hashPassword(password || '123456'),
    role: role || 'user',
    avatar: `https://api.dicebear.com/7.x/${role === 'admin' ? 'identicon' : 'bottts'}/svg?seed=${encodeURIComponent(name)}`
  };
  dbUsers.push(newUser);
  res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const idx = dbUsers.findIndex((u) => u.id === id);
  if (idx !== -1) {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }
    dbUsers[idx] = { ...dbUsers[idx], ...updates };
    return res.json(dbUsers[idx]);
  }
  res.status(404).json({ message: 'User tidak ditemukan.' });
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  dbUsers = dbUsers.filter((u) => u.id !== id);
  res.json({ success: true });
});

// SCHEDULES ENDPOINT
app.get('/api/schedules', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.json(INITIAL_SCHEDULES);
});

// NEWS CRUD
app.get('/api/news', (req, res) => {
  res.json(dbNews);
});

app.post('/api/news', (req, res) => {
  const { title, category, summary, content, pinned, author } = req.body;
  const item = {
    id: `news-${Date.now()}`,
    title,
    category,
    summary: summary || content.substring(0, 100) + '...',
    content,
    pinned: !!pinned,
    date: 'Hari ini',
    author: author || 'Admin BAAK'
  };
  dbNews.unshift(item);
  res.status(201).json(item);
});

app.put('/api/news/:id', (req, res) => {
  const { id } = req.params;
  const idx = dbNews.findIndex((n) => n.id === id);
  if (idx !== -1) {
    dbNews[idx] = { ...dbNews[idx], ...req.body };
    return res.json(dbNews[idx]);
  }
  res.status(404).json({ message: 'Berita tidak ditemukan.' });
});

app.delete('/api/news/:id', (req, res) => {
  const { id } = req.params;
  dbNews = dbNews.filter((n) => n.id !== id);
  res.json({ success: true });
});

// TASKS CRUD
app.get('/api/tasks', (req, res) => {
  res.json(dbTasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, course, deadline, priority, description } = req.body;
  const task = {
    id: `tsk-${Date.now()}`,
    title,
    course,
    deadline,
    priority,
    status: 'Belum Dikerjakan',
    description: description || ''
  };
  dbTasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const idx = dbTasks.findIndex((t) => t.id === id);
  if (idx !== -1) {
    dbTasks[idx] = { ...dbTasks[idx], ...req.body };
    return res.json(dbTasks[idx]);
  }
  res.status(404).json({ message: 'Tugas tidak ditemukan.' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  dbTasks = dbTasks.filter((t) => t.id !== id);
  res.json({ success: true });
});

// FORUM ENDPOINTS
app.get('/api/forum', (req, res) => {
  res.json(dbForum);
});

app.post('/api/forum', (req, res) => {
  const { title, category, content, author, nim } = req.body;
  const thread = {
    id: `th-${Date.now()}`,
    title,
    category,
    author: author || 'Maba TI 2026',
    nim: nim || '261110000',
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(author || 'Maba')}`,
    content,
    date: 'Hari ini',
    upvotes: 0,
    replies: []
  };
  dbForum.unshift(thread);
  res.status(201).json(thread);
});

app.post('/api/forum/:id/upvote', (req, res) => {
  const { id } = req.params;
  const idx = dbForum.findIndex((t) => t.id === id);
  if (idx !== -1) {
    dbForum[idx].upvotes += 1;
    return res.json(dbForum[idx]);
  }
  res.status(404).json({ message: 'Thread tidak ditemukan.' });
});

app.post('/api/forum/:id/replies', (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  const idx = dbForum.findIndex((t) => t.id === id);
  if (idx !== -1) {
    const rep = {
      author: author || 'Maba TI 2026',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(author || 'Maba')}`,
      content,
      date: 'Hari ini'
    };
    dbForum[idx].replies.push(rep);
    return res.json(dbForum[idx]);
  }
  res.status(404).json({ message: 'Thread tidak ditemukan.' });
});

app.put('/api/forum/:id', (req, res) => {
  const { id } = req.params;
  const idx = dbForum.findIndex((t) => t.id === id);
  if (idx !== -1) {
    dbForum[idx] = { ...dbForum[idx], ...req.body };
    return res.json(dbForum[idx]);
  }
  res.status(404).json({ message: 'Thread tidak ditemukan.' });
});

app.delete('/api/forum/:id', (req, res) => {
  const { id } = req.params;
  dbForum = dbForum.filter((t) => t.id !== id);
  res.json({ success: true });
});

app.delete('/api/forum/:id/replies/:index', (req, res) => {
  const { id, index } = req.params;
  const idx = dbForum.findIndex((t) => t.id === id);
  if (idx !== -1) {
    const repIdx = parseInt(index);
    if (repIdx >= 0 && repIdx < dbForum[idx].replies.length) {
      dbForum[idx].replies.splice(repIdx, 1);
      return res.json(dbForum[idx]);
    }
  }
  res.status(404).json({ message: 'Balasan tidak ditemukan.' });
});

// WA SUBMISSIONS
app.get('/api/wa-submissions', (req, res) => {
  res.json(dbWASubmissions);
});

app.post('/api/wa-submissions', (req, res) => {
  const { name, nim, whatsapp, fileName, fileSize, ocrSuccess } = req.body;

  const isAngkatan2026 = nim.startsWith('26');
  const isApproved = !!ocrSuccess && isAngkatan2026;

  const ticket: any = {
    id: `tkt-${Date.now().toString().substring(8)}`,
    name,
    nim,
    whatsapp,
    fileName,
    fileSize: fileSize || '120 KB',
    status: (isApproved ? 'Approved' : 'Rejected') as any,
    rejectionReason: isApproved ? undefined : (!isAngkatan2026 ? 'NIM bukan angkatan 2026.' : 'Hasil scan OCR tidak cocok dengan data input Anda.'),
    submittedAt: new Date().toLocaleString('id-ID')
  };

  // Generate secure verification token
  const ticketData = {
    id: ticket.id,
    name: ticket.name,
    nim: ticket.nim,
    whatsapp: ticket.whatsapp,
    status: ticket.status,
    submittedAt: ticket.submittedAt
  };
  ticket.verificationToken = encrypt(JSON.stringify(ticketData));

  dbWASubmissions.push(ticket);
  res.status(201).json(ticket);
});

app.post('/api/wa-submissions/verify-token', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token tidak boleh kosong.' });
  }
  try {
    const decryptedJson = decrypt(token);
    const data = JSON.parse(decryptedJson);
    res.json({ valid: true, data });
  } catch (error) {
    res.status(400).json({ valid: false, message: 'Token tidak valid atau telah dimanipulasi.' });
  }
});

app.put('/api/wa-submissions/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;
  const idx = dbWASubmissions.findIndex((s) => s.id === id);
  if (idx !== -1) {
    dbWASubmissions[idx].status = status;
    if (rejectionReason !== undefined) {
      dbWASubmissions[idx].rejectionReason = rejectionReason;
    }
    
    // Regenerate secure token on status update
    const ticketData = {
      id: dbWASubmissions[idx].id,
      name: dbWASubmissions[idx].name,
      nim: dbWASubmissions[idx].nim,
      whatsapp: dbWASubmissions[idx].whatsapp,
      status: dbWASubmissions[idx].status,
      submittedAt: dbWASubmissions[idx].submittedAt
    };
    dbWASubmissions[idx].verificationToken = encrypt(JSON.stringify(ticketData));

    return res.json(dbWASubmissions[idx]);
  }
  res.status(404).json({ message: 'Tiket pendaftaran tidak ditemukan.' });
});

app.delete('/api/wa-submissions/:id', (req, res) => {
  const { id } = req.params;
  dbWASubmissions = dbWASubmissions.filter((s) => s.id !== id);
  res.json({ success: true });
});

// Serve port listening only when running locally (not in serverless production)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`[Full-Stack Server] running on http://localhost:${PORT}`);
  });
}

export default app;
