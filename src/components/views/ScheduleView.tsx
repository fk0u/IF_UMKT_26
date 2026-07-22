/* Hallmark · component: ScheduleView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { Calendar, Clock, Lock } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-xl mx-auto py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-brand-500 flex items-center justify-center mx-auto shadow-hallmark-sm border border-brand-500/20">
        <Calendar className="w-6 h-6" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Jadwal Kuliah Semester 1
        </h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
          ⏳ Coming Soon / Segera Hadir
        </span>
      </div>

      <div className="hm-card p-6 rounded-3xl space-y-4">
        <div className="flex items-center space-x-3 text-left">
          <Clock className="w-5 h-5 text-brand-500 shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Jadwal kuliah semester ganjil TA 2026/2027 sedang dalam tahap sinkronisasi dengan Biro Akademik Kemahasiswaan (BAAK) UMKT.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 text-left pt-2 border-t border-slate-200 dark:border-slate-800">
          <Lock className="w-5 h-5 text-slate-400 shrink-0" />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Halaman ini akan otomatis menampilkan jadwal kelas dan asisten praktikum setelah kalender akademik resmi dirilis.
          </p>
        </div>
      </div>
    </div>
  );
};
