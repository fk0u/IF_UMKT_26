import React from 'react';
import { Bell, X } from 'lucide-react';

interface ToastProps {
  show: boolean;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'danger';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ show, title, message, type = 'info', onClose }) => {
  if (!show) return null;

  const borderColors = {
    info: 'border-indigo-500/50 text-indigo-900 dark:text-indigo-200',
    success: 'border-emerald-500/50 text-emerald-900 dark:text-emerald-200',
    warning: 'border-amber-500/50 text-amber-900 dark:text-amber-200',
    danger: 'border-rose-500/50 text-rose-900 dark:text-rose-200',
  };

  return (
    <div className={`fixed top-5 right-5 z-50 max-w-sm w-full shadow-2xl rounded-xl glass-card p-4 border flex items-start space-x-3 transition-all duration-300 ${borderColors[type]}`}>
      <div className="p-2 rounded-lg bg-indigo-500/10 shrink-0">
        <Bell className="w-5 h-5 text-indigo-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{message}</p>
      </div>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
