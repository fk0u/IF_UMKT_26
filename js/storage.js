/**
 * LocalStorage Manager for INFOTIK 26
 */

window.INFOTIK_STORAGE = {
  KEYS: {
    THEME: 'infotik_theme',
    TASKS: 'infotik_tasks',
    NEWS: 'infotik_news',
    FORUM: 'infotik_forum',
    WA_SUBMISSIONS: 'infotik_wa_submissions',
    USER_SUBMISSION: 'infotik_my_wa_submission'
  },

  // Initialize storage if empty
  init() {
    if (!localStorage.getItem(this.KEYS.TASKS)) {
      localStorage.setItem(this.KEYS.TASKS, JSON.stringify(window.INFOTIK_DATA.initialTasks));
    }
    if (!localStorage.getItem(this.KEYS.NEWS)) {
      localStorage.setItem(this.KEYS.NEWS, JSON.stringify(window.INFOTIK_DATA.initialNews));
    }
    if (!localStorage.getItem(this.KEYS.FORUM)) {
      localStorage.setItem(this.KEYS.FORUM, JSON.stringify(window.INFOTIK_DATA.initialForum));
    }
    if (!localStorage.getItem(this.KEYS.WA_SUBMISSIONS)) {
      localStorage.setItem(this.KEYS.WA_SUBMISSIONS, JSON.stringify([]));
    }
  },

  // Tasks Methods
  getTasks() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.TASKS)) || window.INFOTIK_DATA.initialTasks;
    } catch (e) {
      return window.INFOTIK_DATA.initialTasks;
    }
  },

  saveTasks(tasks) {
    localStorage.setItem(this.KEYS.TASKS, JSON.stringify(tasks));
  },

  addTask(task) {
    const tasks = this.getTasks();
    const newTask = {
      id: 'tsk-' + Date.now(),
      title: task.title,
      course: task.course,
      deadline: task.deadline,
      priority: task.priority || 'Sedang',
      status: 'Belum Dikerjakan',
      description: task.description || ''
    };
    tasks.unshift(newTask);
    this.saveTasks(tasks);
    return tasks;
  },

  updateTaskStatus(taskId, newStatus) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index].status = newStatus;
      this.saveTasks(tasks);
    }
    return tasks;
  },

  deleteTask(taskId) {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    this.saveTasks(tasks);
    return tasks;
  },

  // News Methods
  getNews() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.NEWS)) || window.INFOTIK_DATA.initialNews;
    } catch (e) {
      return window.INFOTIK_DATA.initialNews;
    }
  },

  saveNews(newsList) {
    localStorage.setItem(this.KEYS.NEWS, JSON.stringify(newsList));
  },

  addNews(newsItem) {
    const newsList = this.getNews();
    const newItem = {
      id: 'news-' + Date.now(),
      title: newsItem.title,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: newsItem.category || 'Pengumuman Resmi',
      author: 'Admin Angkatan 2026',
      pinned: newsItem.pinned || false,
      summary: newsItem.summary,
      content: newsItem.content
    };
    newsList.unshift(newItem);
    this.saveNews(newsList);
    return newsList;
  },

  deleteNews(newsId) {
    let newsList = this.getNews();
    newsList = newsList.filter(n => n.id !== newsId);
    this.saveNews(newsList);
    return newsList;
  },

  // Forum Methods
  getForum() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.FORUM)) || window.INFOTIK_DATA.initialForum;
    } catch (e) {
      return window.INFOTIK_DATA.initialForum;
    }
  },

  saveForum(forumList) {
    localStorage.setItem(this.KEYS.FORUM, JSON.stringify(forumList));
  },

  addThread(thread) {
    const forumList = this.getForum();
    const newThread = {
      id: 'frm-' + Date.now(),
      author: thread.author || 'Mahasiswa TI 2026',
      nim: thread.nim || '261110' + Math.floor(100 + Math.random() * 900),
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(thread.author || 'Maba'),
      title: thread.title,
      category: thread.category || 'Umum',
      content: thread.content,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + ' • Baru Saja',
      upvotes: 1,
      replies: []
    };
    forumList.unshift(newThread);
    this.saveForum(forumList);
    return forumList;
  },

  addReply(threadId, replyText, authorName) {
    const forumList = this.getForum();
    const thread = forumList.find(f => f.id === threadId);
    if (thread) {
      thread.replies.push({
        author: authorName || 'Mahasiswa TI 2026',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(authorName || 'Maba'),
        date: 'Hari ini • Baru saja',
        content: replyText
      });
      this.saveForum(forumList);
    }
    return forumList;
  },

  upvoteThread(threadId) {
    const forumList = this.getForum();
    const thread = forumList.find(f => f.id === threadId);
    if (thread) {
      thread.upvotes += 1;
      this.saveForum(forumList);
    }
    return forumList;
  },

  // WA Group Verification Submissions Methods
  getWASubmissions() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.WA_SUBMISSIONS)) || [];
    } catch (e) {
      return [];
    }
  },

  saveWASubmissions(submissions) {
    localStorage.setItem(this.KEYS.WA_SUBMISSIONS, JSON.stringify(submissions));
  },

  getMyWASubmission() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.USER_SUBMISSION));
    } catch (e) {
      return null;
    }
  },

  submitWAGroupVerification(formData) {
    const submissions = this.getWASubmissions();
    const ticketId = 'WA26-' + Math.floor(100000 + Math.random() * 900000);
    const submission = {
      id: ticketId,
      name: formData.name,
      nim: formData.nim,
      fileName: formData.fileName || 'Surat_Lolos_Seleksi_SIMPMB.pdf',
      fileSize: formData.fileSize || '1.2 MB',
      submittedAt: new Date().toLocaleString('id-ID'),
      status: 'Pending', // Pending | Approved | Rejected
      waLink: 'https://chat.whatsapp.com/INFOTIK2026UMKTOFFICIALHUB'
    };

    // Remove old submission for this NIM if exists
    const filtered = submissions.filter(s => s.nim !== formData.nim);
    filtered.unshift(submission);

    this.saveWASubmissions(filtered);
    localStorage.setItem(this.KEYS.USER_SUBMISSION, JSON.stringify(submission));
    return submission;
  },

  updateWASubmissionStatus(ticketId, newStatus) {
    const submissions = this.getWASubmissions();
    const sub = submissions.find(s => s.id === ticketId);
    if (sub) {
      sub.status = newStatus;
      this.saveWASubmissions(submissions);

      // Check if this is current user's submission
      const mySub = this.getMyWASubmission();
      if (mySub && mySub.id === ticketId) {
        mySub.status = newStatus;
        localStorage.setItem(this.KEYS.USER_SUBMISSION, JSON.stringify(mySub));
      }
    }
    return submissions;
  }
};
