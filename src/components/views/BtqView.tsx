/* Hallmark · component: BtqView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { BookOpen, AlertCircle, CheckCircle2, AlertTriangle, Sparkles, Check, ChevronRight } from 'lucide-react';
import { INITIAL_BTQ } from '../../services/mockApi';

export const BtqView: React.FC = () => {
  const btqData = INITIAL_BTQ;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Sistem Panduan & Persiapan Ujian BTQ
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Informasi kurikulum tajwid, target hafalan Juz 30, dan tips kelulusan sertifikasi Baca Tulis Al-Qur'an wajib yudisium.
        </p>
      </div>

      {/* Prominent Warning Alert */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start space-x-3 text-xs leading-relaxed">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold block mb-0.5">Pengumuman Kelulusan Wajib</span>
          <span>{btqData.alertMessage}</span>
        </div>
      </div>

      {/* Bento Grid: Passing Criteria & Consequences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Criteria */}
        <div className="hm-card p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-base flex items-center space-x-2.5 text-slate-900 dark:text-white">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Kriteria Kelulusan Utama</span>
          </h3>
          <ul className="space-y-3.5">
            {btqData.passingCriteria.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: Consequences */}
        <div className="hm-card p-6 rounded-3xl space-y-4 border-rose-500/20 bg-rose-500/5 dark:bg-rose-950/10">
          <h3 className="font-bold text-base flex items-center space-x-2.5 text-rose-600 dark:text-rose-450">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
            <span>Konsekuensi Keterlambatan</span>
          </h3>
          <ul className="space-y-3.5">
            {btqData.consequences.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  ✕
                </div>
                <span className="text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Surah List (Juz 30 Grid) */}
      <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="space-y-1">
          <h3 className="font-bold text-base flex items-center space-x-2.5 text-slate-900 dark:text-white">
            <BookOpen className="w-5 h-5 text-brand-500" />
            <span>Target Hafalan Juz 30 (23 Surah Pendek)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Surah-surah wajib di bawah ini akan diujikan hafalannya secara lisan oleh tim asisten LAK UMKT.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {btqData.surahList.map((surah, idx) => (
            <div
              key={surah}
              className="p-3 rounded-2xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between group hover:border-brand-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-150 cursor-default"
            >
              <div className="flex items-center space-x-2.5 truncate">
                <span className="text-[10px] font-mono-tag font-bold text-slate-400 bg-slate-200/60 dark:bg-slate-800/80 px-1.5 py-0.5 rounded-lg group-hover:bg-brand-500/20 group-hover:text-brand-500 transition-colors">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-white">
                  {surah}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-350 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-base flex items-center space-x-2.5 text-slate-900 dark:text-white">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Tips & Trik Hafalan Grade A</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {btqData.tipsForGradeA.map((tip) => (
            <div key={tip.title} className="hm-card hm-card-hover p-6 rounded-3xl space-y-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 text-amber-400 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition duration-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <span className="w-1.5 h-4 bg-brand-500 rounded-full inline-block" />
                <span>{tip.title}</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pr-6">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
