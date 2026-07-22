/* Hallmark · component: Header · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { Search, Clock, Sun, Moon, Terminal } from 'lucide-react';
import { TabType, WASubmission } from '../../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  currentTab: TabType;
  onSetTab: (tab: TabType) => void;
  waSubmission?: WASubmission | null;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  currentTab,
  onSetTab,
  waSubmission
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 dark:border-slate-800/80 hm-nav-glass px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Mobile Logo */}
      <div className="flex items-center space-x-2.5 lg:hidden">
        <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm shadow">
          <Terminal className="w-4 h-4" />
        </div>
        <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
          INFOTIK <span className="text-brand-500 font-mono-tag font-bold text-xs">26</span>
        </span>
      </div>

      {/* Global Search Bar */}
      <div className="hidden sm:flex items-center max-w-md w-full relative">
        <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            if (currentTab !== 'buletin') onSetTab('buletin');
          }}
          placeholder="Cari pengumuman, matkul, atau info angkatan..."
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-all"
        />
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-3">
        {/* Live Date Chip */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <Clock className="w-3.5 h-3.5 text-brand-500" />
          <span className="font-mono-tag text-[11px]">{currentDate}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800/60 transition-colors"
          title="Beralih Mode Gelap/Terang"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        {/* User WA Status Chip */}
        <button
          onClick={() => onSetTab('wagroup')}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 hover:border-emerald-500/50 transition"
        >
          <div
            className={`w-2 h-2 rounded-full ${
              waSubmission
                ? waSubmission.status === 'Approved'
                  ? 'bg-emerald-500 shadow-glow-emerald'
                  : waSubmission.status === 'Rejected'
                  ? 'bg-rose-500'
                  : 'bg-amber-500 animate-pulse'
                : 'bg-slate-400'
            }`}
          />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {waSubmission
              ? waSubmission.status === 'Approved'
                ? 'Terverifikasi'
                : `WA: ${waSubmission.status}`
              : 'Verifikasi WA'}
          </span>
        </button>
      </div>
    </header>
  );
};
