/**
 * Alpine.js Main Application Store & Logic for INFOTIK 26
 */

document.addEventListener('alpine:init', () => {
  Alpine.data('infotikApp', () => ({
    // Navigation & View State
    currentTab: 'dashboard', // dashboard | jadwal | masta | btq | tips | tugas | forum | buletin | wagroup | admin
    darkMode: localStorage.getItem('infotik_theme') === 'dark' || (!('infotik_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
    searchQuery: '',

    // Notifications & Toast System
    toast: {
      show: false,
      title: '',
      message: '',
      type: 'info' // info | success | warning | danger
    },

    // Data References
    schedules: window.INFOTIK_DATA.schedules,
    mastaData: window.INFOTIK_DATA.mastaGuide,
    btqData: window.INFOTIK_DATA.btqGuide,
    tipsData: window.INFOTIK_DATA.academicTips,

    // Dynamic Reactive States from LocalStorage
    tasks: [],
    taskFilter: 'Semua',
    newsList: [],
    newsCategoryFilter: 'Semua',
    forumList: [],
    forumCategoryFilter: 'Semua',
    waSubmissions: [],
    waSubmission: null,

    // Day filter for Jadwal Kuliah
    selectedDay: 'Semua',

    // Form inputs
    waForm: {
      name: '',
      nim: '',
      file: null,
      fileName: '',
      fileSize: '',
      isUploading: false
    },

    newTaskForm: {
      title: '',
      course: 'Dasar Pemrograman',
      deadline: '',
      priority: 'Sedang',
      description: ''
    },

    newNewsForm: {
      title: '',
      category: 'Pengumuman Resmi',
      summary: '',
      content: '',
      pinned: false
    },

    newThreadForm: {
      author: '',
      nim: '',
      title: '',
      category: 'Umum & Peralatan',
      content: ''
    },

    replyInputs: {},

    // Admin State
    adminLoggedIn: false,
    adminPasswordInput: '',
    adminTab: 'wa', // wa | tasks | news

    // Initialization
    init() {
      // Apply initial theme
      this.applyTheme();

      // Load LocalStorage data
      this.refreshData();

      // Set default deadline date for new task form to 7 days from today
      const d = new Date();
      d.setDate(d.getDate() + 7);
      this.newTaskForm.deadline = d.toISOString().split('T')[0];

      // Refresh icons on tab change
      this.$watch('currentTab', () => {
        this.$nextTick(() => {
          if (window.lucide) window.lucide.createIcons();
        });
      });

      this.$nextTick(() => {
        if (window.lucide) window.lucide.createIcons();
      });
    },

    // Refresh data from storage manager
    refreshData() {
      this.tasks = window.INFOTIK_STORAGE.getTasks();
      this.newsList = window.INFOTIK_STORAGE.getNews();
      this.forumList = window.INFOTIK_STORAGE.getForum();
      this.waSubmissions = window.INFOTIK_STORAGE.getWASubmissions();
      this.waSubmission = window.INFOTIK_STORAGE.getMyWASubmission();
    },

    // Theme Management
    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('infotik_theme', this.darkMode ? 'dark' : 'light');
      this.applyTheme();
    },

    applyTheme() {
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    // Toast Helper
    showToast(title, message, type = 'info') {
      this.toast = { show: true, title, message, type };
      setTimeout(() => {
        this.toast.show = false;
      }, 4000);
    },

    // Navigation Helper
    setTab(tabName) {
      this.currentTab = tabName;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Schedule Filter & Actions
    get filteredSchedules() {
      if (this.selectedDay === 'Semua') return this.schedules;
      return this.schedules.filter(s => s.day === this.selectedDay);
    },

    openGoogleCalendar(item) {
      const url = window.INFOTIK_CALENDAR.generateGoogleCalendarUrl(item);
      window.open(url, '_blank');
      this.showToast('Google Calendar', `Membuka Google Calendar untuk ${item.course}`, 'success');
    },

    downloadIcs(item) {
      window.INFOTIK_CALENDAR.downloadIcsFile(item);
      this.showToast('Ekspor Calendar', `File .ics untuk ${item.course} berhasil di-download!`, 'success');
    },

    // Tasks Actions
    get filteredTasks() {
      if (this.taskFilter === 'Semua') return this.tasks;
      return this.tasks.filter(t => t.status === this.taskFilter);
    },

    updateTaskStatus(taskId, newStatus) {
      this.tasks = window.INFOTIK_STORAGE.updateTaskStatus(taskId, newStatus);
      this.showToast('Task Status', `Status tugas berhasil diperbarui ke "${newStatus}"!`, 'success');
    },

    createTask() {
      if (!this.newTaskForm.title || !this.newTaskForm.course) {
        this.showToast('Error', 'Judul tugas dan Mata Kuliah wajib diisi!', 'warning');
        return;
      }
      this.tasks = window.INFOTIK_STORAGE.addTask(this.newTaskForm);
      this.showToast('Tugas Baru', `Tugas "${this.newTaskForm.title}" berhasil ditambahkan!`, 'success');
      this.newTaskForm = {
        title: '',
        course: 'Dasar Pemrograman',
        deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        priority: 'Sedang',
        description: ''
      };
    },

    deleteTask(taskId) {
      this.tasks = window.INFOTIK_STORAGE.deleteTask(taskId);
      this.showToast('Hapus Tugas', 'Tugas berhasil dihapus.', 'info');
    },

    // Forum Actions
    get filteredForum() {
      if (this.forumCategoryFilter === 'Semua') return this.forumList;
      return this.forumList.filter(f => f.category === this.forumCategoryFilter);
    },

    createThread() {
      if (!this.newThreadForm.title || !this.newThreadForm.content) {
        this.showToast('Peringatan', 'Judul dan isi pertanyaan forum wajib diisi!', 'warning');
        return;
      }
      this.forumList = window.INFOTIK_STORAGE.addThread(this.newThreadForm);
      this.showToast('Forum Diskusi', 'Diskusi baru berhasil diterbitkan!', 'success');
      this.newThreadForm = { author: '', nim: '', title: '', category: 'Umum & Peralatan', content: '' };
    },

    upvoteThread(threadId) {
      this.forumList = window.INFOTIK_STORAGE.upvoteThread(threadId);
      this.showToast('Upvote', 'Terima kasih atas apresiasi diskusi ini!', 'info');
    },

    submitReply(threadId) {
      const text = this.replyInputs[threadId];
      if (!text || text.trim() === '') return;
      this.forumList = window.INFOTIK_STORAGE.addReply(threadId, text, 'Maba TI 2026');
      this.replyInputs[threadId] = '';
      this.showToast('Balasan Forum', 'Balasan kamu berhasil diposting!', 'success');
    },

    // News Actions
    get filteredNews() {
      let result = this.newsList;
      if (this.newsCategoryFilter !== 'Semua') {
        result = result.filter(n => n.category === this.newsCategoryFilter);
      }
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q));
      }
      return result;
    },

    // WA Group Verification Form Handler
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.type !== 'application/pdf') {
        this.showToast('File Tidak Valid', 'Format file harus berupa PDF (Surat Keterangan Lolos Seleksi SIM-PMB)!', 'danger');
        return;
      }

      this.waForm.file = file;
      this.waForm.fileName = file.name;
      this.waForm.fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
      this.showToast('File Terpilih', `File ${file.name} berhasil diunggah secara lokal.`, 'info');
    },

    submitWAVerification() {
      if (!this.waForm.name || !this.waForm.nim) {
        this.showToast('Form Incomplete', 'Nama Lengkap dan NIM wajib diisi!', 'warning');
        return;
      }

      if (!this.waForm.fileName) {
        this.showToast('File Missing', 'Wajib mengunggah Surat Keterangan Lolos Seleksi (PDF)!', 'warning');
        return;
      }

      this.waForm.isUploading = true;

      setTimeout(() => {
        this.waSubmission = window.INFOTIK_STORAGE.submitWAGroupVerification({
          name: this.waForm.name,
          nim: this.waForm.nim,
          fileName: this.waForm.fileName,
          fileSize: this.waForm.fileSize
        });
        this.waSubmissions = window.INFOTIK_STORAGE.getWASubmissions();
        this.waForm.isUploading = false;
        this.showToast('Pendaftaran Berhasil', 'Data pendaftaran verifikasi WhatsApp kamu telah terikirim!', 'success');
      }, 1200);
    },

    // Admin Panel Handlers
    loginAdmin() {
      if (this.adminPasswordInput === 'admin2026' || this.adminPasswordInput === 'infotik26') {
        this.adminLoggedIn = true;
        this.adminPasswordInput = '';
        this.showToast('Login Admin', 'Selamat datang di Panel Admin Angkatan 2026!', 'success');
      } else {
        this.showToast('Password Salah', 'Password admin dummy tidak valid! (Gunakan: admin2026)', 'danger');
      }
    },

    logoutAdmin() {
      this.adminLoggedIn = false;
      this.showToast('Logout Admin', 'Anda telah keluar dari Panel Admin.', 'info');
    },

    updateWAStatusByAdmin(ticketId, newStatus) {
      this.waSubmissions = window.INFOTIK_STORAGE.updateWASubmissionStatus(ticketId, newStatus);
      this.waSubmission = window.INFOTIK_STORAGE.getMyWASubmission();
      this.showToast('Status Pendaftaran', `Status pendaftaran ${ticketId} berhasil diubah ke ${newStatus}!`, 'success');
    },

    addNewsByAdmin() {
      if (!this.newNewsForm.title || !this.newNewsForm.summary || !this.newNewsForm.content) {
        this.showToast('Peringatan', 'Judul, Ringkasan, dan Isi Pengumuman wajib diisi!', 'warning');
        return;
      }
      this.newsList = window.INFOTIK_STORAGE.addNews(this.newNewsForm);
      this.showToast('Pengumuman Baru', 'Pengumuman berhasil dipublikasikan!', 'success');
      this.newNewsForm = { title: '', category: 'Pengumuman Resmi', summary: '', content: '', pinned: false };
    },

    deleteNewsByAdmin(newsId) {
      this.newsList = window.INFOTIK_STORAGE.deleteNews(newsId);
      this.showToast('Hapus Pengumuman', 'Pengumuman berhasil dihapus.', 'info');
    }
  }));
});
