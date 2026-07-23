/* Hallmark · component: ScheduleView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { useSchedules } from '../../hooks/useSchedules';
import { ScheduleItem } from '../../types';

const DAYS = [
  { code: 0, label: 'Semua Hari' },
  { code: 1, label: 'Senin' },
  { code: 2, label: 'Selasa' },
  { code: 3, label: 'Rabu' },
  { code: 4, label: 'Kamis' },
  { code: 5, label: 'Jumat' },
  { code: 6, label: 'Sabtu' },
];

export const ScheduleView: React.FC = () => {
  const { data: schedules = [], isLoading, isError, refetch } = useSchedules();
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Keep time updated every 30 seconds to check active class
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const isClassActive = (dayCode: number, startTimeStr: string, endTimeStr: string) => {
    const currentDay = currentTime.getDay();
    if (currentDay !== dayCode) return false;

    const [startH, startM] = startTimeStr.split(':').map(Number);
    const [endH, endM] = endTimeStr.split(':').map(Number);

    const currentH = currentTime.getHours();
    const currentM = currentTime.getMinutes();

    const currentTotalMin = currentH * 60 + currentM;
    const startTotalMin = startH * 60 + startM;
    const endTotalMin = endH * 60 + endM;

    return currentTotalMin >= startTotalMin && currentTotalMin <= endTotalMin;
  };

  const filteredSchedules = selectedDay === 0
    ? schedules
    : schedules.filter(s => s.dayCode === selectedDay);

  const sortedSchedules = [...filteredSchedules].sort((a, b) => {
    if (a.dayCode !== b.dayCode) {
      return a.dayCode - b.dayCode;
    }
    return a.startTime.localeCompare(b.startTime);
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <RefreshCw className="w-8 h-8 text-brand-500 animate-spin" />
        <p className="text-xs text-slate-500 dark:text-slate-400">Memuat jadwal kuliah...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="hm-card p-8 rounded-3xl max-w-md mx-auto text-center space-y-4 border-rose-500/20">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Gagal Memuat Jadwal</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Terjadi kesalahan koneksi saat mengunduh data jadwal kuliah dari server.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 transition flex items-center justify-center space-x-1.5 mx-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Coba Lagi</span>
        </button>
      </div>
    );
  }

  const activeClasses = schedules.filter(s => isClassActive(s.dayCode, s.startTime, s.endTime));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Jadwal Kuliah Semester 1</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Daftar perkuliahan aktif Teknik Informatika Angkatan 2026 Universitas Muhammadiyah Kalimantan Timur.
          </p>
        </div>

        {/* Live Indicator Banner */}
        {activeClasses.length > 0 && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-300 flex items-center space-x-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold">
              {`${activeClasses.length} Kuliah Sedang Berlangsung`}
            </span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1.5 p-1 bg-slate-200/60 dark:bg-slate-900/60 rounded-2xl border border-slate-350 dark:border-slate-800/40 overflow-x-auto no-scrollbar">
        {DAYS.map((day) => (
          <button
            key={day.code}
            onClick={() => setSelectedDay(day.code)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
              selectedDay === day.code
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-hallmark-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* Grid Schedule Layout */}
      {sortedSchedules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSchedules.map((schedule) => {
            const isLive = isClassActive(schedule.dayCode, schedule.startTime, schedule.endTime);
            return (
              <div
                key={schedule.id}
                className={`hm-card p-6 rounded-3xl flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                  isLive
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-emerald-500/5'
                    : 'hm-card-hover'
                }`}
              >
                {/* Side Accent Line */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${schedule.color}`} />

                <div className="space-y-4 pl-2">
                  {/* Card Header Info */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono-tag font-bold tracking-wider uppercase text-slate-400">
                        {schedule.day}
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug group-hover:text-brand-500 transition-colors">
                        {schedule.course}
                      </h3>
                    </div>

                    {isLive ? (
                      <div className="flex items-center space-x-1 text-[9px] font-extrabold bg-emerald-500 text-white px-2 py-0.5 rounded-lg shrink-0">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </span>
                        <span>LIVE</span>
                      </div>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {schedule.badge}
                      </span>
                    )}
                  </div>

                  {/* Class Info Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2.5 text-slate-600 dark:text-slate-350">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-mono-tag">{schedule.time}</span>
                    </div>

                    <div className="flex items-center space-x-2.5 text-slate-600 dark:text-slate-350">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{schedule.lecturer}</span>
                    </div>

                    <div className="flex items-start space-x-2.5 text-slate-600 dark:text-slate-350">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">{schedule.room}</span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                          {schedule.building}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer SKS info */}
                <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-450 pl-2">
                  <div className="flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{`${schedule.sks} SKS`}</span>
                  </div>
                  <span className="text-[10px] font-mono-tag opacity-60">
                    {`ID: ${schedule.id}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="hm-card p-10 rounded-3xl text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-450 mx-auto" />
          <p className="text-xs text-slate-500 dark:text-slate-400">Tidak ada jadwal kuliah untuk hari {DAYS.find(d => d.code === selectedDay)?.label}.</p>
        </div>
      )}
    </div>
  );
};
