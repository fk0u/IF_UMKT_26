/* Hallmark · component: Sidebar · genre: modern-minimal · theme: Custom Indigo-Midnight */
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
  ShieldCheck,
  Terminal
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
    <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-surface-900/80 backdrop-blur-xl sticky top-0 h-screen z-30 p-5">
      {/* Brand Header */}
      <div className="flex items-center space-x-3 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-base shadow-hallmark-md">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
            INFOTIK <span className="text-brand-500 font-mono-tag text-xs font-bold">2026</span>
          </h1>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            FST UMKT • One-Stop Hub
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 my-5 space-y-1 overflow-y-auto no-scrollbar pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSetTab(item.id as TabType)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-150 ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-hallmark-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400 dark:text-brand-600' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 pb-2">
          <p className="px-3 text-[10px] font-mono-tag font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Khusus Angkatan
          </p>
        </div>

        <button
          onClick={() => onSetTab('wagroup')}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
            currentTab === 'wagroup'
              ? 'bg-emerald-600 text-white shadow-hallmark-sm'
              : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Gabung Grup WA</span>
        </button>

        <button
          onClick={() => onSetTab('admin')}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 mt-2 ${
            currentTab === 'admin'
              ? 'bg-purple-600 text-white shadow-hallmark-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Panel Admin</span>
        </button>
      </nav>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-700 dark:text-slate-300">Teknik Informatika '26</p>
        <p className="text-[10px] text-slate-400">UMKT Samarinda</p>
      </div>
    </aside>
  );
};
