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
import { 
  ShieldCheck, Check, X, Plus, Trash2, ArrowUpDown, Users, 
  UserCheck, AlertCircle, Clock, Send, MessageSquare 
} from 'lucide-react';
import { useWAVerify } from '../../hooks/useWAVerify';
import { useTasks } from '../../hooks/useTasks';
import { useNews } from '../../hooks/useNews';
import { useAuth } from '../../context/AuthContext';
import { WASubmission, TaskItem, UserAccount } from '../../types';

interface AdminViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onShowToast }) => {
  const { currentUser, users, updateUserRole } = useAuth();
  const { submissionsQuery, updateWAStatusMutation } = useWAVerify();
  const { createTaskMutation } = useTasks();
  const { newsQuery, createNewsMutation, deleteNewsMutation } = useNews();

  const submissions = submissionsQuery.data || [];
  const newsList = newsQuery.data || [];

  const [adminTab, setAdminTab] = useState<'wa' | 'users' | 'news' | 'tasks'>('wa');

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

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      totalUsers: users.length,
      pendingWA: submissions.filter(s => s.status === 'Pending').length,
      waitlistWA: submissions.filter(s => s.status === 'Waitlist').length,
      approvedWA: submissions.filter(s => s.status === 'Approved').length,
    };
  }, [users, submissions]);

  const handleStatusChange = (ticketId: string, status: WASubmission['status'], rejectionReason?: string) => {
    updateWAStatusMutation.mutate(
      { ticketId, status, rejectionReason },
      {
        onSuccess: () => {
          onShowToast('Status Pendaftaran', `Status pendaftaran ${ticketId} berhasil diperbarui!`, 'success');
        }
      }
    );
  };

  // TanStack Table columns for WA Submissions
  const columns = useMemo<ColumnDef<WASubmission>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center space-x-1 font-bold text-xs hover:text-purple-500 transition"
          >
            <span>Mahasiswa</span>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        ),
        cell: (info) => (
          <div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white">{info.getValue() as string}</h4>
            <p className="text-[10px] text-slate-400 font-mono-tag">{info.row.original.id}</p>
          </div>
        ),
      },
      {
        accessorKey: 'nim',
        header: 'NIM',
        cell: (info) => <span className="font-mono-tag text-xs font-semibold text-slate-700 dark:text-slate-300">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'whatsapp',
        header: 'Nomor WhatsApp',
        cell: (info) => <span className="font-mono-tag text-xs text-slate-700 dark:text-slate-300">{info.getValue() as string}</span>,
      },
      {
        accessorKey: 'fileName',
        header: 'Dokumen SIM-PMB',
        cell: (info) => (
          <div>
            <p className="text-xs text-slate-700 dark:text-slate-300 truncate max-w-[150px]" title={info.getValue() as string}>
              {info.getValue() as string}
            </p>
            <p className="text-[10px] text-slate-400 font-mono-tag">{info.row.original.fileSize}</p>
          </div>
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
                  : st === 'Waitlist'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
              }`}
            >
              {st === 'Waitlist' ? '⏳ Waitlist' : st}
            </span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Tindakan Verifikasi',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStatusChange(item.id, 'Approved')}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-[10px] shadow-sm transition flex items-center space-x-1"
                title="Lolos Verifikasi WA"
              >
                <Check className="w-3 h-3" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleStatusChange(item.id, 'Waitlist')}
                className="px-2.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] shadow-sm transition flex items-center space-x-1"
                title="Masukkan ke Waitlist"
              >
                <Clock className="w-3 h-3" />
                <span>Waitlist</span>
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Masukkan alasan penolakan berkas:", item.rejectionReason || "Tanggal surat di dokumen tidak valid.");
                  if (reason !== null) {
                    handleStatusChange(item.id, 'Rejected', reason);
                  }
                }}
                className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] shadow-sm transition flex items-center space-x-1"
                title="Tolak Verifikasi"
              >
                <X className="w-3 h-3" />
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">Dashboard Pengurus Angkatan</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Pusat kendali admin untuk otorisasi akses grup WA, penayangan pengumuman, dan database mahasiswa.
        </p>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hm-card p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Pengguna</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono-tag">{stats.totalUsers}</p>
        </div>

        <div className="hm-card p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Pending WA</span>
            <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono-tag">{stats.pendingWA}</p>
        </div>

        <div className="hm-card p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Antrean Waitlist</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono-tag">{stats.waitlistWA}</p>
        </div>

        <div className="hm-card p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Disetujui</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono-tag">{stats.approvedWA}</p>
        </div>
      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl overflow-x-auto no-scrollbar border border-slate-350 dark:border-slate-800">
        <button
          onClick={() => setAdminTab('wa')}
          className={`px-4 py-2 rounded-lg text-xs transition font-bold whitespace-nowrap ${
            adminTab === 'wa' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Verifikasi Grup WA
        </button>
        <button
          onClick={() => setAdminTab('users')}
          className={`px-4 py-2 rounded-lg text-xs transition font-bold whitespace-nowrap ${
            adminTab === 'users' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Direktori Mahasiswa
        </button>
        <button
          onClick={() => setAdminTab('news')}
          className={`px-4 py-2 rounded-lg text-xs transition font-bold whitespace-nowrap ${
            adminTab === 'news' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Publish Buletin
        </button>
        <button
          onClick={() => setAdminTab('tasks')}
          className={`px-4 py-2 rounded-lg text-xs transition font-bold whitespace-nowrap ${
            adminTab === 'tasks' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Publish Tugas
        </button>
      </div>

      {/* Content 1: WA Verifications Table */}
      {adminTab === 'wa' && (
        <div className="hm-card rounded-3xl border overflow-hidden shadow-hallmark-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                {table.getHeaderGroups().map(hg => (
                  <tr key={hg.id} className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
                    {hg.headers.map(h => (
                      <th key={h.id} className="px-5 py-3.5">
                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-855 text-xs">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-850/40 transition">
                    {row.getVisibleCells().map(cell => (
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
            <p className="text-xs text-slate-400 italic text-center py-10">Belum ada berkas pendaftaran terunggah.</p>
          )}
        </div>
      )}

      {/* Content 2: Registered User Directory */}
      {adminTab === 'users' && (
        <div className="hm-card rounded-3xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200">
                  <th className="px-5 py-3.5">Akun Mahasiswa</th>
                  <th className="px-5 py-3.5">NIM</th>
                  <th className="px-5 py-3.5">Nomor WhatsApp</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150 dark:divide-slate-855 text-xs">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-850/40 transition">
                    <td className="px-5 py-4 flex items-center space-x-2.5">
                      <img src={u.avatar} alt="avatar" className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 p-0.5 border" />
                      <span className="font-bold text-slate-900 dark:text-white">{u.name}</span>
                    </td>
                    <td className="px-5 py-4 font-mono-tag">{u.nim}</td>
                    <td className="px-5 py-4 font-mono-tag">{u.whatsapp}</td>
                    <td className="px-5 py-4">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => {
                            const nextRole = u.role === 'admin' ? 'user' : 'admin';
                            updateUserRole(u.id, nextRole);
                            onShowToast('Ubah Peran', `Peran ${u.name} diubah menjadi ${nextRole}.`, 'info');
                          }}
                          className="text-brand-500 hover:underline font-bold text-xs"
                        >
                          Ubah Role
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 3: News Publisher */}
      {adminTab === 'news' && (
        <div className="space-y-4">
          <div className="hm-card p-6 rounded-3xl border space-y-4">
            <h3 className="font-bold text-sm">Terbitkan Buletin & Kabar Baru</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={newNews.title}
                onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                placeholder="Judul Pengumuman"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:border-brand-500 focus:outline-none"
              />
              <input
                type="text"
                value={newNews.summary}
                onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                placeholder="Ringkasan Singkat (Sub-judul)"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:border-brand-500 focus:outline-none"
              />
              <textarea
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                rows={3}
                placeholder="Isi Pengumuman Lengkap..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:border-brand-500 focus:outline-none"
              ></textarea>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={newNews.pinned}
                    onChange={(e) => setNewNews({ ...newNews, pinned: e.target.checked })}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Sematkan / Pin Berita</span>
                </label>
                <button
                  onClick={() => {
                    if (!newNews.title || !newNews.summary) return;
                    createNewsMutation.mutate(newNews, {
                      onSuccess: () => {
                        onShowToast('Buletin Terbit', 'Kabar info resmi angkatan berhasil diterbitkan!', 'success');
                        setNewNews({ title: '', category: 'Pengumuman Resmi', summary: '', content: '', pinned: false });
                      }
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-md"
                >
                  Publish Buletin
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {newsList.map(n => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <div className="truncate pr-4">
                  <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{n.date} • {n.category}</p>
                </div>
                <button
                  onClick={() => {
                    deleteNewsMutation.mutate(n.id, {
                      onSuccess: () => onShowToast('Hapus News', 'Pengumuman telah dihapus.', 'info')
                    });
                  }}
                  className="text-rose-500 hover:text-rose-600 font-bold flex items-center space-x-1 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content 4: Task Publisher */}
      {adminTab === 'tasks' && (
        <div className="hm-card p-6 rounded-3xl border space-y-4">
          <h3 className="font-bold text-sm">Input Catatan Tugas Resmi Angkatan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Nama Tugas</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Judul Tugas Resmi"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Mata Kuliah</label>
              <input
                type="text"
                value={newTask.course}
                onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                placeholder="Mata Kuliah"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Batas Waktu (Deadline)</label>
              <input
                type="date"
                value={newTask.deadline}
                onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500">Prioritas Tugas</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as TaskItem['priority'] })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
              >
                <option value="Rendah">Prioritas Rendah</option>
                <option value="Sedang">Prioritas Sedang</option>
                <option value="Tinggi">Prioritas Tinggi</option>
                <option value="Sangat Tinggi">Prioritas Sangat Tinggi</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              if (!newTask.title) return;
              createTaskMutation.mutate(newTask, {
                onSuccess: () => {
                  onShowToast('Tugas Baru', 'Catatan tugas resmi berhasil disinkronkan!', 'success');
                  setNewTask({ title: '', course: 'Dasar Pemrograman', deadline: '', priority: 'Sedang', description: '' });
                }
              });
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 transition flex items-center space-x-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Tugas ke Mahasiswa</span>
          </button>
        </div>
      )}
    </div>
  );
};
