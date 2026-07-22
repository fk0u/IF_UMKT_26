/* Hallmark · component: MastaView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { AlertTriangle, Milestone, Shirt, Briefcase, Check, ChevronRight } from 'lucide-react';
import { INITIAL_MASTA } from '../../services/mockApi';

export const MastaView: React.FC = () => {
  const mastaData = INITIAL_MASTA;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Panduan Masa Ta'aruf (MASTA 2026)</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Panduan lengkap kegiatan orientasi mahasiswa baru Teknik Informatika UMKT.</p>
      </div>

      {/* Prominent Disclaimer Box */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm">PENTING - Disclaimer Informasi Masta</h4>
          <p className="text-xs leading-relaxed opacity-90">{mastaData.disclaimer}</p>
        </div>
      </div>

      {/* Masta Timeline Stages */}
      <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="font-bold text-base flex items-center space-x-2 text-slate-900 dark:text-white">
          <Milestone className="w-5 h-5 text-brand-500" />
          <span>Alur & Tahapan Kegiatan Masta</span>
        </h3>

        <div className="relative border-l-2 border-brand-500/30 ml-4 space-y-8 pl-6 sm:pl-8">
          {mastaData.stages.map((stage, idx) => (
            <div key={stage.title} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center text-xs font-mono-tag font-bold shadow-sm">
                {idx + 1}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{stage.title}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                    {stage.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{stage.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {stage.highlights.map((hl) => (
                    <span
                      key={hl}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center space-x-1"
                    >
                      <Check className="w-3 h-3 text-emerald-500 mr-1" />
                      <span>{hl}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dresscode & Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hm-card p-6 rounded-3xl space-y-4">
          <h3 className="font-bold text-base flex items-center space-x-2 text-slate-900 dark:text-white">
            <Shirt className="w-5 h-5 text-purple-500" />
            <span>Ketentuan Dresscode Pakaian</span>
          </h3>

          <div className="space-y-4">
            {mastaData.dressCode.map((dc) => (
              <div key={dc.type} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-brand-500">{`Peserta ${dc.type}`}</h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {dc.items.map((item) => (
                    <li key={item} className="flex items-start space-x-2">
                      <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hm-card p-6 rounded-3xl space-y-6">
          <div>
            <h3 className="font-bold text-base flex items-center space-x-2 text-slate-900 dark:text-white mb-3">
              <Briefcase className="w-5 h-5 text-emerald-500" />
              <span>Barang Bawaan Wajib</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {mastaData.equipments.map((eq) => (
                <li key={eq} className="flex items-center space-x-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{eq}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
            <div>
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">DO'S (Wajib)</h4>
              <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                {mastaData.dosAndDonts.dos.map((d) => (
                  <li key={d} className="flex items-start space-x-1">
                    <span className="text-emerald-500">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-2">DON'TS (Dilarang)</h4>
              <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                {mastaData.dosAndDonts.donts.map((d) => (
                  <li key={d} className="flex items-start space-x-1">
                    <span className="text-rose-500">✕</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
