/* Hallmark · component: AdminView · macrostructure: Workbench-Bento Hybrid · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table';
import { Lock, ShieldCheck, Check, X, Plus, Trash2, ArrowUpDown } from 'lucide-react';
import { useWAVerify } from '../../hooks/useWAVerify';
import { useTasks } from '../../hooks/useTasks';
import { useNews } from '../../hooks/useNews';
import { WASubmission, TaskItem } from '../../types';

interface AdminViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onShowToast }) => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [adminTab, setAdminTab] = useState<'wa' | 'tasks' | 'news'>('wa');

  const { submissionsQuery, updateWAStatusMutation } = useWAVerify();
  const { createTaskMutation } = useTasks();
  const { newsQuery, createNewsMutation, deleteNewsMutation } = useNews();

  const submissions = submissionsQuery.data || [];
  const newsList = newsQuery.data || [];

  const [newTask, setNewTask] = useState({
    title: '',
    course: 'Dasar Pemrograman',
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    priority: 'Sedang' as TaskItem['priority'],
    description: ''
  });

  const [newNews, setNewNews] = useState({
    title: '',
    category: 'Pengumuman Resmi' as 'Pengumuman Resmi' | 'Akademik & Masta' | 'Laboratorium',
    summary: '',
    content: '',
    pinned: false
  });

  const handleLogin = () => {
    if (passwordInput === 'admin2026' || passwordInput === 'infotik26') {
      setAdminLoggedIn(true);
      setPasswordInput('');
      onShowToast('Login Admin', 'Selamat datang di Panel Admin Angkatan 2026!', 'success');
    } else {
      onShowToast('Password Salah', 'Password admin dummy tidak valid! (Gunakan: admin2026)', 'danger');
    }
  };

  const handleStatusChange = (ticketId: string, status: WASubmission['status']) => {
    updateWAStatusMutation.mutate(
      { ticketId, status },
      {
        onSuccess: () => {
          onShowToast('Status Pendaftaran', `Status ${ticketId} diubah ke ${status}!`, 'success');
        }
      }
    );
  };

  // TanStack Table Column Definitions for WA Submissions
  const columns = useMemo<ColumnDef<WASubmission>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center space-x-1 font-bold text-xs hover:text-purple-500 transition"
          >
            <span>Nama Lengkap</span>
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        ),
        cell: (info) => (
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">{info.getValue() as string}</h4>
            <p className="text-[11px] text-slate-400 font-mono-tag">Tiket: {info.row.original.id}</p>
          </div>
        ),
      },
      {
        accessorKey: 'nim',
        header: 'NIM',
        cell: (info) => <span className="font-mono-tag text-xs font-semibold text-slate-700 dark:text-slate-300">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'fileName',
        header: 'Berkas SIM-PMB',
        cell: (info) => (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono-tag">{info.getValue() as string} ({info.row.original.fileSize})</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const st = info.getValue() as string;
          return (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                st === 'Approved'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                  : st === 'Rejected'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
              }`}
            >
              {st}
            </span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Aksi Admin',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStatusChange(item.id, 'Approved')}
                className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleStatusChange(item.id, 'Rejected')}
                className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition flex items-center space-x-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (!adminLoggedIn) {
    return (
      <div className="max-w-md mx-auto hm-card p-8 rounded-3xl space-y-5 text-center shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Masuk Panel Admin</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Masukkan password dummy (<code className="font-mono-tag text-brand-500 font-bold">admin2026</code>)
          </p>
        </div>

        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="Password admin..."
          className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-purple-500 focus:outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
        >
          Login Admin
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-purple-500" />
          <span className="font-bold text-xs text-purple-900 dark:text-purple-200">
            Mode Admin Aktif • Pengurus Angkatan 2026 (TanStack Table Active)
          </span>
        </div>
        <button
          onClick={() => {
            setAdminLoggedIn(false);
            onShowToast('Logout Admin', 'Anda telah keluar dari Panel Admin.', 'info');
          }}
          className="px-3 py-1 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition"
        >
          Logout Admin
        </button>
      </div>

      {/* Admin Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setAdminTab('wa')}
          className={`px-4 py-2 rounded-xl text-xs transition ${
            adminTab === 'wa' ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {`Verifikasi WA (${submissions.length})`}
        </button>
        <button
          onClick={() => setAdminTab('tasks')}
          className={`px-4 py-2 rounded-xl text-xs transition ${
            adminTab === 'tasks' ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Kelola Tugas
        </button>
        <button
          onClick={() => setAdminTab('news')}
          className={`px-4 py-2 rounded-xl text-xs transition ${
            adminTab === 'news' ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Kelola Pengumuman
        </button>
      </div>

      {/* Tab 1: WA Verification Requests Table */}
      {adminTab === 'wa' && (
        <div className="hm-card rounded-3xl border overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
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

          {submissions.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-8">Belum ada data pendaftar verifikasi WA yang masuk.</p>
          )}
        </div>
      )}

      {/* Tab 2: Admin Task Manager */}
      {adminTab === 'tasks' && (
        <div className="hm-card p-6 rounded-3xl border space-y-4">
          <h3 className="font-bold text-sm">Input Tugas Resmi Angkatan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Judul Tugas Resmi"
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
            />
            <input
              type="text"
              value={newTask.course}
              onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
              placeholder="Mata Kuliah"
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
            />
            <input
              type="date"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskItem['priority'] })}
              className="px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
            >
              <option value="Rendah">Prioritas Rendah</option>
              <option value="Sedang">Prioritas Sedang</option>
              <option value="Tinggi">Prioritas Tinggi</option>
              <option value="Sangat Tinggi">Prioritas Sangat Tinggi</option>
            </select>
          </div>

          <button
            onClick={() => {
              if (!newTask.title) return;
              createTaskMutation.mutate(newTask, {
                onSuccess: () => {
                  onShowToast('Tugas Baru', 'Tugas berhasil dipublikasikan!', 'success');
                  setNewTask({ title: '', course: 'Dasar Pemrograman', deadline: '', priority: 'Sedang', description: '' });
                }
              });
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 transition flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Tugas ke Seluruh Mahasiswa</span>
          </button>
        </div>
      )}

      {/* Tab 3: Admin News Manager */}
      {adminTab === 'news' && (
        <div className="space-y-4">
          <div className="hm-card p-6 rounded-3xl border space-y-4">
            <h3 className="font-bold text-sm">Publish Pengumuman / Buletin Baru</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                placeholder="Judul Pengumuman"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
              />
              <input
                type="text"
                value={newNews.summary}
                onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                placeholder="Ringkasan Singkat (Highlight)"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
              />
              <textarea
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                rows={3}
                placeholder="Isi Pengumuman Lengkap..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent"
              ></textarea>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={newNews.pinned}
                    onChange={(e) => setNewNews({ ...newNews, pinned: e.target.checked })}
                    className="rounded text-purple-600"
                  />
                  <span>Disematkan di Dashboard (Pinned)</span>
                </label>
                <button
                  onClick={() => {
                    if (!newNews.title || !newNews.summary) return;
                    createNewsMutation.mutate(newNews, {
                      onSuccess: () => {
                        onShowToast('Pengumuman Baru', 'Pengumuman berhasil dipublikasikan!', 'success');
                        setNewNews({ title: '', category: 'Pengumuman Resmi', summary: '', content: '', pinned: false });
                      }
                    });
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 transition"
                >
                  Publish Pengumuman
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {newsList.map((n) => (
              <div key={n.id} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="font-bold truncate max-w-md">{n.title}</span>
                <button
                  onClick={() => {
                    deleteNewsMutation.mutate(n.id, {
                      onSuccess: () => onShowToast('Hapus News', 'Pengumuman telah dihapus.', 'info')
                    });
                  }}
                  className="text-rose-500 hover:underline font-bold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
