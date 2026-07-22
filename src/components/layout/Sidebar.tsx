import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Compass,
  BookOpen,
  Sparkles,
  CheckSquare,
  MessagesSquare,
  Newspaper,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { TabType } from '../../types';

interface SidebarProps {
  currentTab: TabType;
  onSetTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSetTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jadwal', label: 'Jadwal Kuliah', icon: Calendar },
    { id: 'masta', label: 'Panduan Masta', icon: Compass },
    { id: 'btq', label: 'Ujian BTQ', icon: BookOpen },
    { id: 'tips', label: 'Tips Akademik', icon: Sparkles },
    { id: 'tugas', label: 'Daftar Tugas', icon: CheckSquare },
    { id: 'forum', label: 'Forum Diskusi', icon: MessagesSquare },
    { id: 'buletin', label: 'Buletin Info', icon: Newspaper },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 h-screen z-30 p-5">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg glow-purple font-extrabold text-xl">
          TI
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-400">
            INFOTIK 26
          </h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
            FST UMKT 2026
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 my-6 space-y-1.5 overflow-y-auto no-scrollbar pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSetTab(item.id as TabType)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 pb-2">
          <p className="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">Khusus Angkatan</p>
        </div>

        <button
          onClick={() => onSetTab('wagroup')}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
            currentTab === 'wagroup'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
              : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Gabung Grup WA</span>
        </button>

        <button
          onClick={() => onSetTab('admin')}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mt-2 ${
            currentTab === 'admin'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Panel Admin</span>
        </button>
      </nav>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400">
        <p className="font-medium text-slate-600 dark:text-slate-300">TanStack Advanced Hub</p>
        <p className="mt-0.5 text-[11px]">Informatika 2026 UMKT</p>
      </div>
    </aside>
  );
};
