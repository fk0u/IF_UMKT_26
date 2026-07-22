/* Hallmark · component: BtqView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';

export const BtqView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-xl mx-auto py-12 text-center">
      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto shadow-hallmark-sm border border-amber-500/20">
        <BookOpen className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Panduan Ujian BTQ
        </h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
          ⏳ Coming Soon / Segera Hadir
        </span>
      </div>

      <div className="hm-card p-6 rounded-3xl space-y-4 text-left">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">Pelaksanaan Ujian Perdana</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Panduan materi tajwid, daftar lengkap surah pendek wajib, serta jadwal setoran hafalan ujian Baca Tulis Al-Qur'an (BTQ) sedang dipersiapkan oleh Lembaga Al-Islam & Kemuhammadiyahan (LAK) UMKT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
