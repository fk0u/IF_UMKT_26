/* Hallmark · component: DashboardView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
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
  ArrowRight,
  Terminal
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
      {/* Workbench Hero Section */}
      <div className="relative rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-hallmark-md overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-mono-tag font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 flex items-center space-x-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>INFOTIK 2026</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">• FST UMKT Samarinda</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Pusat Informasi Resmi Mahasiswa Teknik Informatika 2026
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            One-stop hub yang menghimpun seluruh jadwal perkuliahan, panduan orientasi Masta, ujian BTQ, tugas kuliah, dan verifikasi grup WhatsApp angkatan secara terpusat.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onSetTab('jadwal')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold shadow-md flex items-center space-x-2 transition"
            >
              <Calendar className="w-4 h-4 text-brand-600" />
              <span>Lihat Jadwal Kuliah</span>
            </button>
            <button
              onClick={() => onSetTab('wagroup')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center space-x-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Verifikasi Grup WA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Asymmetric Stats & Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hm-card p-4 rounded-2xl flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <Users className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Mahasiswa Baru</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-mono-tag">180+ Maba</h3>
          </div>
        </div>

        <div className="hm-card p-4 rounded-2xl flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <BookOpen className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Beban Semester 1</p>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-mono-tag">20 SKS</h3>
          </div>
        </div>

        <div className="hm-card p-4 rounded-2xl flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <Compass className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Orientasi Masta</p>
            <h3 className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono-tag">Agustus '26</h3>
          </div>
        </div>

        <div className="hm-card p-4 rounded-2xl flex items-center space-x-3.5">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shrink-0">
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Syarat BTQ</p>
            <h3 className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-mono-tag">23 Surah</h3>
          </div>
        </div>
      </div>

      {/* Bento-Grid Feature Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Pinned News */}
          <div className="hm-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Pin className="w-4 h-4 text-brand-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pengumuman Resmi Paling Penting</h3>
              </div>
              <button
                onClick={() => onSetTab('buletin')}
                className="text-xs text-brand-500 hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Lihat Semua Buletin</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {pinnedNews.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                    {news.category}
                  </span>
                  <span className="text-slate-400 font-mono-tag text-[11px]">{news.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{news.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{news.summary}</p>
              </div>
            ))}
          </div>

          {/* Quick Access Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => onSetTab('jadwal')}
              className="hm-card hm-card-hover p-5 rounded-2xl cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Jadwal Kuliah Semester 1</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cek jadwal & lokasi kelas GF-3.02, GF-3.04, & Lab Komputer</p>
            </div>

            <div
              onClick={() => onSetTab('masta')}
              className="hm-card hm-card-hover p-5 rounded-2xl cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-purple-500">
                  <Compass className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Panduan Orientasi Masta</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ketentuan dresscode, perlengkapan, & tahapan orientasi</p>
            </div>

            <div
              onClick={() => onSetTab('btq')}
              className="hm-card hm-card-hover p-5 rounded-2xl cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition" />
              </div>
              <h4 className="font-bold text-sm mt-4 text-slate-900 dark:text-white">Panduan Ujian BTQ</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Syarat wajib kelulusan skripsi & 23 surah hafalan Juz 30</p>
            </div>

            <div
              onClick={() => onSetTab('tugas')}
              className="hm-card hm-card-hover p-5 rounded-2xl cursor-pointer transition group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500">
                  <CheckSquare className="w-5 h-5" />
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
          {/* WA Verification Status Banner */}
          <div className="hm-card p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-hallmark-sm">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Grup WA Resmi 2026</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Verifikasi SIM-PMB PDF</p>
              </div>
            </div>

            {!waSubmission ? (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Grup WhatsApp resmi diproteksi dengan verifikasi Surat Lolos Seleksi agar terbebas dari akun spam/penipuan.
                </p>
                <button
                  onClick={() => onSetTab('wagroup')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition"
                >
                  Form Verifikasi Sekarang
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono-tag font-semibold text-slate-500 text-[11px]">Tiket: {waSubmission.id}</span>
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
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">Nama: {waSubmission.name}</p>

                {waSubmission.status === 'Approved' && (
                  <a
                    href={waSubmission.waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center w-full py-2 mt-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-md"
                  >
                    Masuk WhatsApp Official 🚀
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Active Tasks Widget */}
          <div className="hm-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs flex items-center space-x-2 text-slate-900 dark:text-white">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>Tugas Mendatang</span>
              </h3>
              <button onClick={() => onSetTab('tugas')} className="text-xs text-brand-500 hover:underline font-semibold">
                Kelola
              </button>
            </div>

            <div className="space-y-2">
              {activeTasks.length > 0 ? (
                activeTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <h5 className="font-bold text-xs truncate text-slate-900 dark:text-white">{t.title}</h5>
                      <p className="text-[11px] font-mono-tag text-slate-500 dark:text-slate-400">{`${t.course} • ${t.deadline}`}</p>
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
                <p className="text-xs text-slate-400 italic text-center py-4">Belum ada tugas aktif. 🎉</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
