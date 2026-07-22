/* Hallmark · component: TipsView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { Sparkles } from 'lucide-react';
import { INITIAL_TIPS } from '../../services/mockApi';

export const TipsView: React.FC = () => {
  const tipsData = INITIAL_TIPS;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Tips Survive Maba (Akademik & Sosial)</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Panduan kasual & relatable untuk sukses kuliah di Teknik Informatika UMKT.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tipsData.map((tip) => (
          <div key={tip.id} className="hm-card hm-card-hover p-6 rounded-3xl flex flex-col justify-between transition group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${tip.tagColor}`}>{tip.category}</span>
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">{tip.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
