import React from 'react';
import { LayoutDashboard, Calendar, Compass, CheckSquare, MessageCircle } from 'lucide-react';
import { TabType } from '../../types';

interface MobileBottomNavProps {
  currentTab: TabType;
  onSetTab: (tab: TabType) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onSetTab }) => {
  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'jadwal', label: 'Jadwal', icon: Calendar },
    { id: 'masta', label: 'Masta', icon: Compass },
    { id: 'tugas', label: 'Tugas', icon: CheckSquare },
    { id: 'wagroup', label: 'Grup WA', icon: MessageCircle, isEmerald: true },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 hm-nav-glass border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        const activeColor = item.isEmerald ? 'text-emerald-500 font-bold' : 'text-brand-500 font-bold';
        const inactiveColor = 'text-slate-400 hover:text-slate-600 dark:hover:text-white';

        return (
          <button
            key={item.id}
            onClick={() => onSetTab(item.id as TabType)}
            className={`flex flex-col items-center space-y-1 ${isActive ? activeColor : inactiveColor}`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
