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

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('infotik_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  useEffect(() => {
    const savedSub = localStorage.getItem('infotik_my_wa_submission');
    if (savedSub) {
      try {
        setUserSubmission(JSON.parse(savedSub));
      } catch (e) {
        setUserSubmission(null);
      }
    }
  }, [submissionsQuery.data]);

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
