/* Hallmark · component: NewsView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState } from 'react';
import { Pin } from 'lucide-react';
import { useNews } from '../../hooks/useNews';

interface NewsViewProps {
  searchQuery: string;
}

export const NewsView: React.FC<NewsViewProps> = ({ searchQuery }) => {
  const { newsQuery } = useNews();
  const newsList = newsQuery.data || [];
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  const filteredNews = newsList.filter((n) => {
    let matchCat = true;
    if (categoryFilter !== 'Semua') matchCat = n.category === categoryFilter;

    let matchSearch = true;
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      matchSearch = n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q);
    }

    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Buletin Pengumuman Resmi</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pengumuman, berita kampus, dan kabar terbaru seputar mahasiswa Teknik Informatika 2026.
          </p>
        </div>

        <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl overflow-x-auto no-scrollbar border border-slate-300/40 dark:border-slate-800/60">
          {['Semua', 'Pengumuman Resmi', 'Akademik & Masta', 'Laboratorium'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs transition whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {newsQuery.isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500">Memuat berita buletin...</div>
      ) : (
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <div key={news.id} className="hm-card p-6 rounded-3xl space-y-3 hover:border-brand-500/40 transition">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                    {news.category}
                  </span>
                  {news.pinned && (
                    <span className="px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 flex items-center space-x-1">
                      <Pin className="w-3 h-3" />
                      <span>Disematkan</span>
                    </span>
                  )}
                </div>
                <span className="text-slate-400 font-mono-tag">{news.date}</span>
              </div>

              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white leading-snug">{news.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{news.content}</p>

              <div className="pt-2 text-[11px] text-slate-400 font-medium">
                Diterbitkan oleh: <span className="text-slate-600 dark:text-slate-300">{news.author}</span>
              </div>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-6">Tidak ada berita yang cocok dengan kriteria pencarian.</p>
          )}
        </div>
      )}
    </div>
  );
};
