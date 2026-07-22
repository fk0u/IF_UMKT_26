import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { TaskItem } from '../../types';

interface TasksViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onShowToast }) => {
  const { tasksQuery, createTaskMutation, updateTaskStatusMutation, deleteTaskMutation } = useTasks();
  const tasks = tasksQuery.data || [];
  const [taskFilter, setTaskFilter] = useState<string>('Semua');

  const [form, setForm] = useState({
    title: '',
    course: 'Dasar Pemrograman',
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    priority: 'Sedang' as TaskItem['priority'],
    description: ''
  });

  const filteredTasks = tasks.filter((t) => {
    if (taskFilter === 'Semua') return true;
    return t.status === taskFilter;
  });

  const handleCreate = () => {
    if (!form.title || !form.course) {
      onShowToast('Peringatan', 'Judul tugas dan Mata Kuliah wajib diisi!', 'warning');
      return;
    }

    createTaskMutation.mutate(form, {
      onSuccess: () => {
        onShowToast('Tugas Baru', `Tugas "${form.title}" berhasil disimpan!`, 'success');
        setForm({
          title: '',
          course: 'Dasar Pemrograman',
          deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
          priority: 'Sedang',
          description: ''
        });
      }
    });
  };

  const handleStatusChange = (taskId: string, newStatus: TaskItem['status']) => {
    updateTaskStatusMutation.mutate(
      { taskId, status: newStatus },
      {
        onSuccess: () => {
          onShowToast('Status Tugas', `Status tugas diperbarui ke "${newStatus}"!`, 'success');
        }
      }
    );
  };

  const handleDelete = (taskId: string) => {
    deleteTaskMutation.mutate(taskId, {
      onSuccess: () => {
        onShowToast('Hapus Tugas', 'Tugas telah dihapus.', 'info');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Daftar Tugas (TanStack Query)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data tugas disinkronkan secara fleksibel menggunakan <strong className="text-brand-500">TanStack Query Mutations</strong>.
          </p>
        </div>

        {/* Task Status Filters */}
        <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
          {['Semua', 'Belum Dikerjakan', 'Dalam Proses', 'Selesai'].map((f) => (
            <button
              key={f}
              onClick={() => setTaskFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs transition whitespace-nowrap ${
                taskFilter === f
                  ? 'bg-brand-600 text-white font-bold shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Add Task Form */}
      <div className="glass-card p-6 rounded-3xl border space-y-4">
        <h3 className="font-bold text-sm flex items-center space-x-2">
          <PlusCircle className="w-4 h-4 text-brand-500" />
          <span>Tambah Catatan Tugas Mandiri</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Nama tugas (contoh: Latihan Loops C++)"
            className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none"
          />

          <select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none"
          >
            <option value="Dasar Pemrograman">Dasar Pemrograman</option>
            <option value="Sistem Digital">Sistem Digital & Arskom</option>
            <option value="Aljabar Linear">Aljabar Linear</option>
            <option value="Matematika Diskrit">Matematika Diskrit</option>
            <option value="Aplikasi Komputer">Aplikasi Komputer</option>
            <option value="Ujian BTQ / LAK">Ujian BTQ / LAK</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 pt-1">
          <button
            onClick={handleCreate}
            disabled={createTaskMutation.isPending}
            className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition disabled:opacity-50"
          >
            {createTaskMutation.isPending ? 'Menyimpan...' : 'Simpan Tugas'}
          </button>
        </div>
      </div>

      {/* Tasks List */}
      {tasksQuery.isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500 font-medium">Memuat data tugas via TanStack Query...</div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((t) => (
            <div
              key={t.id}
              className="glass-card p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-brand-500/40"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                    {t.course}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.priority === 'Tinggi' || t.priority === 'Sangat Tinggi'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                        : t.priority === 'Sedang'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                    }`}
                  >
                    Prioritas: {t.priority}
                  </span>
                </div>
                <h4 className={`font-bold text-sm text-slate-900 dark:text-white ${t.status === 'Selesai' ? 'line-through opacity-60' : ''}`}>
                  {t.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.description || `Deadline: ${t.deadline}`}</p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e.target.value as TaskItem['status'])}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <option value="Belum Dikerjakan">Belum Dikerjakan ⏳</option>
                  <option value="Dalam Proses">Dalam Proses 🚀</option>
                  <option value="Selesai">Selesai ✅</option>
                </select>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 transition"
                  title="Hapus Tugas"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredTasks.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-6">Tidak ada tugas dengan status "{taskFilter}".</p>
          )}
        </div>
      )}
    </div>
  );
};
