import React from 'react';
import { Search, Clock, Sun, Moon } from 'lucide-react';
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
    <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 glass-nav px-4 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Mobile Logo */}
      <div className="flex items-center space-x-2 lg:hidden">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow">
          TI
        </div>
        <span className="font-extrabold text-base tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-purple-500">
          INFOTIK 26
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
          placeholder="Cari pengumuman, matkul, atau info..."
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
        />
      </div>

      {/* Actions Right */}
      <div className="flex items-center space-x-3">
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 font-medium">
          <Clock className="w-3.5 h-3.5 text-brand-500" />
          <span>{currentDate}</span>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          title="Beralih Mode Gelap/Terang"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>

        <button
          onClick={() => onSetTab('wagroup')}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition"
        >
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              waSubmission
                ? waSubmission.status === 'Approved'
                  ? 'bg-emerald-500'
                  : waSubmission.status === 'Rejected'
                  ? 'bg-rose-500'
                  : 'bg-amber-500 animate-pulse'
                : 'bg-slate-400'
            }`}
          />
          <span className="text-xs font-semibold">
            {waSubmission
              ? waSubmission.status === 'Approved'
                ? 'Terverifikasi'
                : `Status WA: ${waSubmission.status}`
              : 'Verifikasi WA'}
          </span>
        </button>
      </div>
    </header>
  );
};
