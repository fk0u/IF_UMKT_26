import React from 'react';
import {
  Users,
  BookOpen,
  Compass,
  Award,
  Pin,
  ChevronRight,
  Calendar,
  CheckSquare,
  MessageCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TabType, WASubmission, TaskItem, NewsItem } from '../../types';

interface DashboardViewProps {
  onSetTab: (tab: TabType) => void;
  waSubmission?: WASubmission | null;
  newsList: NewsItem[];
  tasksList: TaskItem[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSetTab,
  waSubmission,
  newsList,
  tasksList,
}) => {
  const pinnedNews = newsList.filter((n) => n.pinned).slice(0, 2);
  const activeTasks = tasksList.filter((t) => t.status !== 'Selesai').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-900 to-purple-950 text-white p-6 sm:p-8 shadow-2xl border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            🚀 Welcome Maba Teknik Informatika 2026!
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Pusat Informasi Resmi Angkatan 2026 UMKT
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            Platform <span className="font-semibold text-white">One-Stop Hub (TanStack Edition)</span> yang dirancang khusus untuk mempermudah informasi akademik, jadwal kuliah, orientasi Masta, ujian BTQ, dan diskusi tanpa perlu bertanya berulang di WhatsApp.
          </p>
          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onSetTab('jadwal')}
              className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-lg shadow-brand-500/30 flex items-center space-x-2 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Lihat Jadwal Kuliah</span>
            </button>
            <button
              onClick={() => onSetTab('wagroup')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Verifikasi Grup WA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Maba TI</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">180+ Maba</h3>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Beban Semester 1</p>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">20 SKS</h3>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Status Masta</p>
            <h3 className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">Agustus 2026</h3>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Syarat BTQ</p>
            <h3 className="text-xl font-extrabold text-amber-600 dark:text-amber-400">23 Surah</h3>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pinned Announcements */}
          <div className="glass-card p-6 rounded-2xl border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Pin className="w-5 h-5 text-brand-500" />
                <h3 className="font-bold text-base">Pengumuman Penting Angkatan</h3>
              </div>
              <button
                onClick={() => onSetTab('buletin')}
                className="text-xs text-brand-500 hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Semua Berita</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pinnedNews.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-xl bg-indigo-50/50 dark:bg-slate-800/50 border border-indigo-100 dark:border-slate-700/60 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                    {news.category}
                  </span>
                  <span className="text-slate-400">{news.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{news.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{news.summary}</p>
              </div>
            ))}
          </div>

          {/* Quick Access Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => onSetTab('jadwal')}
              className="glass-card p-5 rounded-2xl border hover:border-brand-500/50 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-brand-500 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Jadwal Kuliah Sem 1</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cek ruangan GF-3.02, GF-3.04, & Lab Komputer GF-1.02</p>
            </div>

            <div
              onClick={() => onSetTab('masta')}
              className="glass-card p-5 rounded-2xl border hover:border-purple-500/50 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Panduan Orientasi Masta</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Rincian dresscode, barang bawaan, & alur kegiatan</p>
            </div>

            <div
              onClick={() => onSetTab('btq')}
              className="glass-card p-5 rounded-2xl border hover:border-amber-500/50 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Panduan Ujian BTQ</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Syarat wajib kelulusan & 23 surah hafalan Juz 30</p>
            </div>

            <div
              onClick={() => onSetTab('tugas')}
              className="glass-card p-5 rounded-2xl border hover:border-emerald-500/50 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Daftar Tugas Maba</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pantau deadline tugas koding & praktikum</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* WA Verification Banner */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Grup WA Resmi 2026</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verifikasi SIM-PMB PDF untuk bergabung</p>
              </div>
            </div>

            {!waSubmission ? (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Grup WA resmi diproteksi dengan verifikasi Surat Lolos Seleksi agar bebas dari bot/penipuan.
                </p>
                <button
                  onClick={() => onSetTab('wagroup')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition"
                >
                  Form Verifikasi Sekarang
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Tiket: {waSubmission.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      waSubmission.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                        : waSubmission.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                    }`}
                  >
                    {waSubmission.status}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">Nama: {waSubmission.name}</p>

                {waSubmission.status === 'Approved' && (
                  <a
                    href={waSubmission.waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center w-full py-2 mt-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow"
                  >
                    Masuk Grup WhatsApp Official 🚀
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Active Tasks Widget */}
          <div className="glass-card p-6 rounded-2xl border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Tugas Mendatang</span>
              </h3>
              <button onClick={() => onSetTab('tugas')} className="text-xs text-brand-500 hover:underline font-semibold">
                Kelola
              </button>
            </div>

            <div className="space-y-2.5">
              {activeTasks.length > 0 ? (
                activeTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <h5 className="font-bold text-xs truncate text-slate-900 dark:text-white">{t.title}</h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{`${t.course} • ${t.deadline}`}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        t.priority === 'Tinggi' || t.priority === 'Sangat Tinggi'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                          : t.priority === 'Sedang'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-4">Belum ada tugas yang aktif saat ini. 🎉</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
