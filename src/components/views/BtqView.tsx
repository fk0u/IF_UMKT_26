/* Hallmark · component: BtqView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { ShieldAlert, CheckCircle2, AlertOctagon, BookMarked, Award, CheckSquare, XCircle } from 'lucide-react';
import { INITIAL_BTQ } from '../../services/mockApi';

export const BtqView: React.FC = () => {
  const btqData = INITIAL_BTQ;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Panduan Standar & Ujian BTQ</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Syarat wajib kelulusan Baca Tulis Al-Qur'an Lembaga Al-Islam & Kemuhammadiyahan UMKT.
        </p>
      </div>

      {/* Alert Box */}
      <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-rose-600 text-white font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base">SYARAT MUTLAK KELULUSAN SKRIPSI / TA</h3>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed opacity-90">{btqData.alertMessage}</p>
      </div>

      {/* Requirements & Consequences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hm-card p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-base flex items-center space-x-2 text-slate-900 dark:text-white">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Syarat Kelulusan BTQ</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {btqData.passingCriteria.map((req) => (
              <li key={req} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-medium">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hm-card p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-base flex items-center space-x-2 text-rose-600 dark:text-rose-400">
            <AlertOctagon className="w-5 h-5" />
            <span>Konsekuensi Jika Belum Lulus</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            {btqData.consequences.map((csq) => (
              <li key={csq} className="flex items-start space-x-2.5 p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="font-medium">{csq}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Surahs Checklist & Tips Grade A */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="hm-card p-6 rounded-3xl space-y-4 lg:col-span-1">
          <h3 className="font-bold text-base flex items-center space-x-2 text-slate-900 dark:text-white">
            <BookMarked className="w-5 h-5 text-amber-500" />
            <span>Daftar 23 Surah Pendek (Juz 30)</span>
          </h3>
          <div className="max-h-96 overflow-y-auto no-scrollbar space-y-1.5 pr-1">
            {btqData.surahList.map((surah, i) => (
              <div key={surah} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-xs font-mono-tag">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{`${i + 1}. Q.S. ${surah}`}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                  Wajib
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hm-card p-6 rounded-3xl space-y-4 lg:col-span-2">
          <h3 className="font-bold text-base flex items-center space-x-2 text-slate-900 dark:text-white">
            <Award className="w-5 h-5 text-brand-500" />
            <span>Tips Trik Mendapatkan Nilai A pada Ujian BTQ</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {btqData.tipsForGradeA.map((tip) => (
              <div key={tip.title} className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/60 border border-indigo-100 dark:border-slate-800/60 space-y-2">
                <h4 className="font-bold text-xs text-brand-600 dark:text-brand-400">{tip.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
