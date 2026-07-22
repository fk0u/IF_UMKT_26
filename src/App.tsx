/* Hallmark · component: App · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState, useEffect } from 'react';
import { TabType, WASubmission } from './types';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Toast } from './components/layout/Toast';

import { DashboardView } from './components/views/DashboardView';
import { ScheduleView } from './components/views/ScheduleView';
import { MastaView } from './components/views/MastaView';
import { BtqView } from './components/views/BtqView';
import { TipsView } from './components/views/TipsView';
import { TasksView } from './components/views/TasksView';
import { ForumView } from './components/views/ForumView';
import { NewsView } from './components/views/NewsView';
import { WAVerifyView } from './components/views/WAVerifyView';
import { AdminView } from './components/views/AdminView';

import { useNews } from './hooks/useNews';
import { useTasks } from './hooks/useTasks';
import { useWAVerify } from './hooks/useWAVerify';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LogIn, UserPlus, Shield, Terminal } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, login, signup } = useAuth();
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('infotik_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Login/Signup Form States
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authError, setAuthError] = useState('');
  const [loginForm, setLoginForm] = useState({ emailOrNim: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    nim: '',
    whatsapp: '',
    email: '',
    password: '',
    adminCode: '' // Optional invitation code for admin signup
  });

  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'danger';
  }>({
    show: false,
    title: '',
    message: '',
    type: 'info',
  });

  const { newsQuery } = useNews();
  const { tasksQuery } = useTasks();
  const { submissionsQuery } = useWAVerify();

  const [userSubmission, setUserSubmission] = useState<WASubmission | null>(null);

  // Sync user submission state
  useEffect(() => {
    if (!currentUser) return;
    const savedSub = localStorage.getItem('infotik_my_wa_submission');
    if (savedSub) {
      try {
        const parsed: WASubmission = JSON.parse(savedSub);
        if (parsed.nim === currentUser.nim) {
          setUserSubmission(parsed);
        } else {
          setUserSubmission(null);
        }
      } catch (e) {
        setUserSubmission(null);
      }
    } else {
      // Look up in global submissions list
      const found = (submissionsQuery.data || []).find((s) => s.nim === currentUser.nim);
      if (found) {
        setUserSubmission(found);
      } else {
        setUserSubmission(null);
      }
    }
  }, [submissionsQuery.data, currentUser]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('infotik_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('infotik_theme', 'light');
    }
  }, [darkMode]);

  const showToast = (
    title: string,
    message: string,
    type: 'info' | 'success' | 'warning' | 'danger' = 'info'
  ) => {
    setToast({ show: true, title, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleSetTab = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Action Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      await login(loginForm.emailOrNim, loginForm.password);
      showToast('Masuk Sukses', 'Sesi login berhasil diaktifkan.', 'success');
    } catch (err: any) {
      setAuthError(err.message || 'Gagal login.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      // NIM check for 2026 angkatan
      if (!signupForm.nim.startsWith('26') && signupForm.adminCode !== 'admin2026') {
        setAuthError('NIM bukan Mahasiswa Angkatan 2026! Pendaftaran dibatasi khusus angkatan 2026.');
        return;
      }

      await signup({
        name: signupForm.name,
        nim: signupForm.nim,
        whatsapp: signupForm.whatsapp,
        email: signupForm.email,
        password: signupForm.password,
        role: signupForm.adminCode === 'admin2026' ? 'admin' : 'user'
      });

      showToast('Pendaftaran Berhasil', 'Akun mahasiswa baru terdaftar.', 'success');
    } catch (err: any) {
      setAuthError(err.message || 'Gagal registrasi.');
    }
  };

  // Auth Gate Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 transition-colors duration-300">
        <Toast
          show={toast.show}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />

        <div className="w-full max-w-md space-y-6">
          {/* Logo Brand */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mx-auto shadow-hallmark-md">
              <Terminal className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              INFOTIK <span className="text-brand-500 font-mono-tag font-bold text-sm">2026</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pusat Informasi Mahasiswa Teknik Informatika UMKT
            </p>
          </div>

          <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-hallmark-lg bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl">
            {/* Form Mode Tabs */}
            <div className="flex items-center p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl border border-slate-350 dark:border-slate-800">
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  authMode === 'login' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
              <button
                onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                  authMode === 'signup' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Daftar Akun</span>
              </button>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs font-medium">
                {authError}
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Email atau NIM</label>
                  <input
                    type="text"
                    value={loginForm.emailOrNim}
                    onChange={(e) => setLoginForm({ ...loginForm, emailOrNim: e.target.value })}
                    placeholder="Masukkan Email atau NIM Anda"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs transition shadow-md"
                >
                  Masuk ke Dashboard
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Nama Lengkap</label>
                  <input
                    type="text"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    placeholder="Nama lengkap sesuai berkas PMB"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">NIM Mahasiswa</label>
                    <input
                      type="text"
                      value={signupForm.nim}
                      onChange={(e) => setSignupForm({ ...signupForm, nim: e.target.value })}
                      placeholder="Contoh: 261110001"
                      className="w-full px-4 py-2.5 text-xs font-mono-tag rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">WhatsApp</label>
                    <input
                      type="text"
                      value={signupForm.whatsapp}
                      onChange={(e) => setSignupForm({ ...signupForm, whatsapp: e.target.value })}
                      placeholder="0812xxxxxxxx"
                      className="w-full px-4 py-2.5 text-xs font-mono-tag rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Email Akun</label>
                  <input
                    type="email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    placeholder="maba@student.umkt.ac.id"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Password</label>
                  <input
                    type="password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    placeholder="Minimal 6 karakter"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border focus:border-brand-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-slate-500" />
                    <span>Kode Undangan Admin (Opsional):</span>
                  </label>
                  <input
                    type="password"
                    value={signupForm.adminCode}
                    onChange={(e) => setSignupForm({ ...signupForm, adminCode: e.target.value })}
                    placeholder="Masukkan jika Anda pengurus angkatan"
                    className="w-full px-4 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-transparent focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs transition shadow-md"
                >
                  Registrasi Akun Baru
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Main Layout
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Toast
        show={toast.show}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      <div className="flex flex-1">
        <Sidebar currentTab={currentTab} onSetTab={handleSetTab} />

        <main className="flex-1 min-w-0 flex flex-col pb-24 lg:pb-10">
          <Header
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode(!darkMode)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentTab={currentTab}
            onSetTab={handleSetTab}
            waSubmission={userSubmission}
          />

          <div className="px-4 lg:px-8 py-6 max-w-7xl w-full mx-auto space-y-8">
            {currentTab === 'dashboard' && (
              <DashboardView
                onSetTab={handleSetTab}
                waSubmission={userSubmission}
                newsList={newsQuery.data || []}
                tasksList={tasksQuery.data || []}
              />
            )}

            {currentTab === 'jadwal' && <ScheduleView />}
            {currentTab === 'masta' && <MastaView />}
            {currentTab === 'btq' && <BtqView />}
            {currentTab === 'tips' && <TipsView />}
            {currentTab === 'tugas' && <TasksView onShowToast={showToast} />}
            {currentTab === 'forum' && <ForumView onShowToast={showToast} />}
            {currentTab === 'buletin' && <NewsView searchQuery={searchQuery} />}
            {currentTab === 'wagroup' && (
              <WAVerifyView onShowToast={showToast} userSubmission={userSubmission} />
            )}
            {currentTab === 'admin' && <AdminView onShowToast={showToast} />}
          </div>

          <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-6 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              INFOTIK 26 &copy; 2026 Teknik Informatika UMKT (TanStack Query & Table Edition).
            </p>
            <p className="text-[11px] text-slate-400">
              Dibuat dengan ❤️ oleh Mahasiswa Teknik Informatika Angkatan 2026 UMKT.
            </p>
          </footer>
        </main>
      </div>

      <MobileBottomNav currentTab={currentTab} onSetTab={handleSetTab} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};
