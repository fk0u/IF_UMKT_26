/* Hallmark · component: NewsDetailView · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React from 'react';
import { ArrowLeft, Calendar, User, Pin } from 'lucide-react';
import { useNews } from '../../hooks/useNews';

interface NewsDetailViewProps {
  newsId: string;
  onBack: () => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({ newsId, onBack }) => {
  const { newsQuery } = useNews();
  const article = (newsQuery.data || []).find((n) => n.id === newsId);

  if (!article) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-xs text-slate-400">Pengumuman buletin tidak ditemukan.</p>
        <button onClick={onBack} className="text-brand-500 text-xs font-bold hover:underline">
          Kembali ke Buletin
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back button */}
      <button onClick={onBack} className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Buletin</span>
      </button>

      {/* Main Editorial Article */}
      <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
              {article.category}
            </span>
            {article.pinned && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 flex items-center space-x-1">
                <Pin className="w-3 h-3" />
                <span>Disematkan</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {article.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-4">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-mono-tag">{article.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>{article.author}</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap space-y-4">
          {article.content}
        </div>
      </div>
    </div>
  );
};
