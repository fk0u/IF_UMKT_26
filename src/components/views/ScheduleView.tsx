/* Hallmark · component: ScheduleView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  SortingState
} from '@tanstack/react-table';
import { CalendarPlus, Download, ArrowUpDown, Clock, MapPin, Award } from 'lucide-react';
import { useSchedules } from '../../hooks/useSchedules';
import { ScheduleItem } from '../../types';
import { calendarService } from '../../services/calendar';

interface ScheduleViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ onShowToast }) => {
  const { data: schedules = [], isLoading } = useSchedules();
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'dayCode', desc: false }]);

  const filteredData = useMemo(() => {
    if (selectedDay === 'Semua') return schedules;
    return schedules.filter((s) => s.day === selectedDay);
  }, [schedules, selectedDay]);

  const columns = useMemo<ColumnDef<ScheduleItem>[]>(
    () => [
      {
        accessorKey: 'day',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center space-x-1 font-bold text-xs hover:text-brand-500 transition"
          >
            <span>Hari</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono-tag font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'course',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center space-x-1 font-bold text-xs hover:text-brand-500 transition"
          >
            <span>Mata Kuliah</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => {
          const item = info.row.original;
          return (
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.course}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.lecturer}</p>
            </div>
          );
        },
      },
      {
        accessorKey: 'time',
        header: 'Waktu (WITA)',
        cell: (info) => (
          <div className="flex items-center text-xs font-mono-tag font-medium text-slate-700 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-brand-500 mr-1.5 shrink-0" />
            <span>{info.getValue() as string}</span>
          </div>
        ),
      },
      {
        accessorKey: 'room',
        header: 'Ruangan',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center text-xs text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-500 mr-1.5 shrink-0" />
              <span>
                <strong className="font-bold font-mono-tag text-slate-900 dark:text-white">{item.room}</strong> ({item.building})
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'sks',
        header: 'SKS',
        cell: (info) => (
          <div className="flex items-center text-xs font-mono-tag font-bold text-slate-700 dark:text-slate-300">
            <Award className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" />
            <span>{info.getValue() as number} SKS</span>
          </div>
        ),
      },
      {
        id: 'actions',
        header: 'Ekspor',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const url = calendarService.generateGoogleCalendarUrl(item);
                  window.open(url, '_blank');
                  onShowToast('Google Calendar', `Membuka Google Calendar untuk ${item.course}`, 'success');
                }}
                className="py-1.5 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs flex items-center space-x-1 transition"
                title="Tambah ke Google Calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-brand-500" />
                <span>Google Cal</span>
              </button>
              <button
                onClick={() => {
                  calendarService.downloadIcsFile(item);
                  onShowToast('Ekspor Calendar', `File .ics untuk ${item.course} berhasil di-download!`, 'success');
                }}
                className="py-1.5 px-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Download file .ics untuk Apple/Outlook"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        },
      },
    ],
    [onShowToast]
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Jadwal Kuliah Semester 1 (TanStack Table)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data jadwal presisi kelas GF-3.02, GF-3.04, & Lab Komputer GF-1.02 UMKT.
          </p>
        </div>

        {/* Day Filter Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl overflow-x-auto no-scrollbar border border-slate-300/40 dark:border-slate-800/60">
          {['Semua', 'Senin', 'Selasa', 'Rabu', 'Sabtu'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-1.5 rounded-lg text-xs transition ${
                selectedDay === day
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 hm-card rounded-3xl">
          <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-500 mt-3 font-medium">Memuat data jadwal...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block hm-card rounded-3xl overflow-hidden shadow-hallmark-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-200">
                      {headerGroup.headers.map((header) => (
                        <th key={header.id} className="px-5 py-3.5">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-5 py-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Fallback Cards */}
          <div className="grid grid-cols-1 sm:hidden gap-4">
            {filteredData.map((item) => (
              <div key={item.id} className="hm-card p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-mono-tag">
                    {item.day}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 font-mono-tag">{item.sks} SKS</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.course}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.lecturer}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono-tag">
                  <p>⏰ {item.time}</p>
                  <p>📍 Ruang {item.room} ({item.building})</p>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => {
                      const url = calendarService.generateGoogleCalendarUrl(item);
                      window.open(url, '_blank');
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-900 dark:text-white flex items-center justify-center space-x-1"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-brand-500" />
                    <span>Google Cal</span>
                  </button>
                  <button
                    onClick={() => calendarService.downloadIcsFile(item)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
