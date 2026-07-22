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
  ShieldCheck, Check, X, Plus, Trash2, Edit, ArrowUpDown, Users, 
  UserCheck, AlertCircle, Clock, Send, MessageSquare, PlusCircle, Save
} from 'lucide-react';
import { useWAVerify } from '../../hooks/useWAVerify';
import { useTasks } from '../../hooks/useTasks';
import { useNews } from '../../hooks/useNews';
import { useForum } from '../../hooks/useForum';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../services/mockApi';
import { WASubmission, TaskItem, UserAccount, NewsItem, ForumThread } from '../../types';

interface AdminViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onShowToast }) => {
  const { currentUser, users, updateUserRole } = useAuth();
  const { submissionsQuery, updateWAStatusMutation } = useWAVerify();
  const { tasksQuery, createTaskMutation, deleteTaskMutation } = useTasks();
  const { newsQuery, createNewsMutation, deleteNewsMutation } = useNews();
  const { forumQuery } = useForum();

  const submissions = submissionsQuery.data || [];
  const newsList = newsQuery.data || [];
  const tasksList = tasksQuery.data || [];
  const forumList = forumQuery.data || [];

  const [adminTab, setAdminTab] = useState<'wa' | 'users' | 'news' | 'tasks' | 'forum'>('wa');

  // Edit Overlay States
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [editingThread, setEditingThread] = useState<ForumThread | null>(null);

  // Create Manual States
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    nim: '',
    whatsapp: '',
    email: '',
    password: '',
    role: 'user' as UserAccount['role']
  });

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

  // User Actions (ERP CRUD)
  const handleCreateUser = async () => {
    if (!newUserForm.name || !newUserForm.nim || !newUserForm.email || !newUserForm.password) {
      onShowToast('Form Kurang Lengkap', 'Seluruh kolom pendaftaran manual wajib diisi!', 'warning');
      return;
    }
    try {
      await mockApi.createUser(newUserForm);
      onShowToast('User Dibuat', `Mahasiswa "${newUserForm.name}" berhasil terdaftar!`, 'success');
      setIsCreatingUser(false);
      setNewUserForm({ name: '', nim: '', whatsapp: '', email: '', password: '', role: 'user' });
      // Reload page for state sync
      window.location.reload();
    } catch (e: any) {
      onShowToast('Error', e.message || 'Gagal membuat user.', 'danger');
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      await mockApi.updateUser(editingUser.id, editingUser);
      onShowToast('Update Sukses', `Profil ${editingUser.name} berhasil diperbarui!`, 'success');
      setEditingUser(null);
      window.location.reload();
    } catch (e) {
      onShowToast('Error', 'Gagal memperbarui user.', 'danger');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus akun mahasiswa ini?')) return;
    try {
      await mockApi.deleteUser(userId);
      onShowToast('Hapus Sukses', 'Akun mahasiswa berhasil dihapus.', 'info');
      window.location.reload();
    } catch (e) {
      onShowToast('Error', 'Gagal menghapus user.', 'danger');
    }
  };

  // News Actions (ERP CRUD)
  const handleUpdateNews = async () => {
    if (!editingNews) return;
    try {
      await mockApi.updateNews(editingNews.id, editingNews);
      onShowToast('Update Sukses', 'Berita berhasil diperbarui!', 'success');
      setEditingNews(null);
      newsQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal memperbarui berita.', 'danger');
    }
  };

  // Tasks Actions (ERP CRUD)
  const handleUpdateTask = async () => {
    if (!editingTask) return;
    try {
      await mockApi.updateTask(editingTask.id, editingTask);
      onShowToast('Update Sukses', 'Tugas berhasil diperbarui!', 'success');
      setEditingTask(null);
      tasksQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal memperbarui tugas.', 'danger');
    }
  };

  // Forum Mod Actions (ERP CRUD)
  const handleUpdateThread = async () => {
    if (!editingThread) return;
    try {
      await mockApi.updateThread(editingThread.id, editingThread);
      onShowToast('Mod Sukses', 'Isi diskusi berhasil dimoderasi/diedit!', 'success');
      setEditingThread(null);
      forumQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal memoderasi diskusi.', 'danger');
    }
  };

  const handleDeleteThread = async (threadId: string) => {
    if (!confirm('Hapus diskusi forum ini secara permanen?')) return;
    try {
      await mockApi.deleteThread(threadId);
      onShowToast('Hapus Sukses', 'Thread forum berhasil dihapus.', 'info');
      forumQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal menghapus diskusi.', 'danger');
    }
  };

  const handleDeleteReply = async (threadId: string, replyIdx: number) => {
    if (!confirm('Hapus komentar/balasan ini?')) return;
    try {
      await mockApi.deleteReply(threadId, replyIdx);
      onShowToast('Hapus Sukses', 'Balasan forum berhasil dihapus.', 'info');
      forumQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal menghapus balasan.', 'danger');
    }
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
            <p className="text-xs text-slate-700 dark:text-slate-300 truncate max-w-[120px]" title={info.getValue() as string}>
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
        header: 'Aksi',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStatusChange(item.id, 'Approved')}
                className="px-2 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange(item.id, 'Waitlist')}
                className="px-2 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] transition"
              >
                Waitlist
              </button>
              <button
                onClick={() => {
                  const reason = prompt("Masukkan alasan penolakan:", item.rejectionReason || "Kecocokan NIM/Nama gagal.");
                  if (reason !== null) handleStatusChange(item.id, 'Rejected', reason);
                }}
                className="px-2 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] transition"
              >
                Reject
              </button>
              <button
                onClick={async () => {
                  if (confirm('Hapus berkas verifikasi ini?')) {
                    await mockApi.deleteWASubmission(item.id);
                    onShowToast('Hapus Sukses', 'Berkas dihapus.', 'info');
                    submissionsQuery.refetch();
                  }
                }}
                className="p-1 rounded text-slate-400 hover:text-rose-500 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
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
      <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-purple-500 animate-pulse" />
          <span className="font-bold text-xs text-purple-900 dark:text-purple-200">
            Administrator Mode Aktif (ERP CRUD & Moderasi TanStack)
          </span>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="hm-card p-5 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Akun</span>
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
            <span className="text-xs font-bold">Approved WA</span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono-tag">{stats.approvedWA}</p>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl overflow-x-auto no-scrollbar border border-slate-350 dark:border-slate-800">
        {[
          { id: 'wa', label: 'Verifikasi WA' },
          { id: 'users', label: 'Kelola Mahasiswa' },
          { id: 'news', label: 'Kelola Buletin' },
          { id: 'tasks', label: 'Kelola Tugas' },
          { id: 'forum', label: 'Moderasi Forum' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              adminTab === tab.id ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MODAL / EDIT OVERLAYS */}
      {editingUser && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="hm-card p-6 rounded-3xl max-w-md w-full space-y-4 bg-white dark:bg-slate-900 shadow-glow-indigo">
            <h3 className="font-extrabold text-sm">Edit Profil Mahasiswa</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={editingUser.name}
                onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                placeholder="Nama Lengkap"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={editingUser.nim}
                onChange={e => setEditingUser({ ...editingUser, nim: e.target.value })}
                placeholder="NIM"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={editingUser.whatsapp}
                onChange={e => setEditingUser({ ...editingUser, whatsapp: e.target.value })}
                placeholder="Nomor WA"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={editingUser.email}
                onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded"
              />
              <select
                value={editingUser.role}
                onChange={e => setEditingUser({ ...editingUser, role: e.target.value as any })}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-950"
              >
                <option value="user">User (Mahasiswa)</option>
                <option value="admin">Admin (Pengurus)</option>
              </select>
            </div>
            <div className="flex space-x-2 pt-2">
              <button onClick={handleUpdateUser} className="flex-1 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1">
                <Save className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </button>
              <button onClick={() => setEditingUser(null)} className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {editingNews && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="hm-card p-6 rounded-3xl max-w-lg w-full space-y-4 bg-white dark:bg-slate-900">
            <h3 className="font-extrabold text-sm">Edit Artikel Buletin</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={editingNews.title}
                onChange={e => setEditingNews({ ...editingNews, title: e.target.value })}
                placeholder="Judul Berita"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={editingNews.summary}
                onChange={e => setEditingNews({ ...editingNews, summary: e.target.value })}
                placeholder="Ringkasan"
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                value={editingNews.content}
                onChange={e => setEditingNews({ ...editingNews, content: e.target.value })}
                placeholder="Konten Berita"
                rows={4}
                className="w-full px-3 py-2 border rounded"
              ></textarea>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingNews.pinned}
                  onChange={e => setEditingNews({ ...editingNews, pinned: e.target.checked })}
                />
                <span>Sematkan Berita (Pinned)</span>
              </label>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleUpdateNews} className="flex-1 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1">
                <Save className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </button>
              <button onClick={() => setEditingNews(null)} className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {editingTask && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="hm-card p-6 rounded-3xl max-w-md w-full space-y-4 bg-white dark:bg-slate-900">
            <h3 className="font-extrabold text-sm">Edit Tugas Perkuliahan</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={editingTask.title}
                onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                placeholder="Nama Tugas"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="text"
                value={editingTask.course}
                onChange={e => setEditingTask({ ...editingTask, course: e.target.value })}
                placeholder="Mata Kuliah"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="date"
                value={editingTask.deadline}
                onChange={e => setEditingTask({ ...editingTask, deadline: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
              <select
                value={editingTask.priority}
                onChange={e => setEditingTask({ ...editingTask, priority: e.target.value as any })}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-950"
              >
                <option value="Rendah">Prioritas Rendah</option>
                <option value="Sedang">Prioritas Sedang</option>
                <option value="Tinggi">Prioritas Tinggi</option>
                <option value="Sangat Tinggi">Prioritas Sangat Tinggi</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleUpdateTask} className="flex-1 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1">
                <Save className="w-3.5 h-3.5" />
                <span>Simpan</span>
              </button>
              <button onClick={() => setEditingTask(null)} className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {editingThread && (
        <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="hm-card p-6 rounded-3xl max-w-lg w-full space-y-4 bg-white dark:bg-slate-900">
            <h3 className="font-extrabold text-sm">Edit & Moderasi Thread Forum</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={editingThread.title}
                onChange={e => setEditingThread({ ...editingThread, title: e.target.value })}
                placeholder="Judul Thread"
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                value={editingThread.content}
                onChange={e => setEditingThread({ ...editingThread, content: e.target.value })}
                placeholder="Konten Thread"
                rows={4}
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleUpdateThread} className="flex-1 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1">
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Moderasi</span>
              </button>
              <button onClick={() => setEditingThread(null)} className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1: Verifikasi WA (TanStack Table) */}
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
            <p className="text-xs text-slate-400 italic text-center py-10">Belum ada pendaftaran berkas.</p>
          )}
        </div>
      )}

      {/* Tab Content 2: Kelola Mahasiswa (CRUD User) */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest">Daftar Akun Mahasiswa</h4>
            <button
              onClick={() => setIsCreatingUser(!isCreatingUser)}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-850 transition flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah User Manual</span>
            </button>
          </div>

          {isCreatingUser && (
            <div className="hm-card p-5 rounded-2xl border border-dashed border-brand-500/40 space-y-4">
              <h4 className="font-bold text-xs text-brand-500">Form Pendaftaran Mahasiswa Manual (Admin Control)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  value={newUserForm.name}
                  onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="px-3 py-2 text-xs rounded border bg-transparent"
                />
                <input
                  type="text"
                  placeholder="NIM (Awalan 26)"
                  value={newUserForm.nim}
                  onChange={e => setNewUserForm({ ...newUserForm, nim: e.target.value })}
                  className="px-3 py-2 text-xs rounded border bg-transparent font-mono-tag"
                />
                <input
                  type="text"
                  placeholder="Nomor WA"
                  value={newUserForm.whatsapp}
                  onChange={e => setNewUserForm({ ...newUserForm, whatsapp: e.target.value })}
                  className="px-3 py-2 text-xs rounded border bg-transparent font-mono-tag"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUserForm.email}
                  onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="px-3 py-2 text-xs rounded border bg-transparent"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUserForm.password}
                  onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })}
                  className="px-3 py-2 text-xs rounded border bg-transparent"
                />
                <select
                  value={newUserForm.role}
                  onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value as any })}
                  className="px-3 py-2 text-xs rounded border bg-transparent dark:bg-slate-900"
                >
                  <option value="user">User (Mahasiswa)</option>
                  <option value="admin">Admin (Pengurus)</option>
                </select>
              </div>
              <div className="flex space-x-2 pt-1 justify-end">
                <button onClick={handleCreateUser} className="px-4 py-2 bg-brand-500 text-white font-bold rounded-xl text-xs">
                  Simpan Mahasiswa
                </button>
                <button onClick={() => setIsCreatingUser(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
                  Batal
                </button>
              </div>
            </div>
          )}

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
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setEditingUser(u)}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-brand-500 transition"
                            title="Edit Akun"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {u.id !== currentUser?.id && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-500 transition"
                              title="Hapus Akun"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 3: Kelola Buletin (CRUD News) */}
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
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:outline-none"
              />
              <input
                type="text"
                value={newNews.summary}
                onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                placeholder="Sub-judul Ringkasan"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:outline-none"
              />
              <textarea
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                rows={3}
                placeholder="Konten Pengumuman Lengkap..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:outline-none"
              ></textarea>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={newNews.pinned}
                    onChange={(e) => setNewNews({ ...newNews, pinned: e.target.checked })}
                  />
                  <span>Sematkan Berita (Pinned)</span>
                </label>
                <button
                  onClick={() => {
                    if (!newNews.title) return;
                    createNewsMutation.mutate(newNews, {
                      onSuccess: () => {
                        onShowToast('Berita Terbit', 'Pengumuman berhasil diterbitkan!', 'success');
                        setNewNews({ title: '', category: 'Pengumuman Resmi', summary: '', content: '', pinned: false });
                      }
                    });
                  }}
                  className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs"
                >
                  Publish Buletin
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {newsList.map(n => (
              <div key={n.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{n.date} • {n.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setEditingNews(n)} className="p-1 text-slate-400 hover:text-brand-500 transition">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Hapus berita ini?')) {
                        deleteNewsMutation.mutate(n.id, {
                          onSuccess: () => onShowToast('Hapus', 'Berita berhasil dihapus.', 'info')
                        });
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Kelola Tugas (CRUD Tasks) */}
      {adminTab === 'tasks' && (
        <div className="space-y-4">
          <div className="hm-card p-6 rounded-3xl border space-y-4">
            <h3 className="font-bold text-sm">Publish Tugas Resmi Baru</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={newTask.title}
                onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Judul Tugas Resmi"
                className="px-3.5 py-2 text-xs rounded border bg-transparent"
              />
              <input
                type="text"
                value={newTask.course}
                onChange={e => setNewTask({ ...newTask, course: e.target.value })}
                placeholder="Mata Kuliah"
                className="px-3.5 py-2 text-xs rounded border bg-transparent"
              />
              <input
                type="date"
                value={newTask.deadline}
                onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
                className="px-3.5 py-2 text-xs rounded border bg-transparent"
              />
              <select
                value={newTask.priority}
                onChange={e => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="px-3.5 py-2 text-xs rounded border bg-transparent dark:bg-slate-900"
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
                    onShowToast('Tugas Baru', 'Tugas kuliah berhasil didaftarkan!', 'success');
                    setNewTask({ title: '', course: 'Dasar Pemrograman', deadline: '', priority: 'Sedang', description: '' });
                  }
                });
              }}
              className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl text-xs"
            >
              Publish Tugas
            </button>
          </div>

          <div className="space-y-2">
            {tasksList.map(t => (
              <div key={t.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{t.title}</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.course} • Deadline: {t.deadline}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setEditingTask(t)} className="p-1 text-slate-400 hover:text-brand-500 transition">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Hapus tugas ini?')) {
                        deleteTaskMutation.mutate(t.id, {
                          onSuccess: () => onShowToast('Hapus', 'Tugas berhasil dihapus.', 'info')
                        });
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 5: Moderasi Forum & Komentar */}
      {adminTab === 'forum' && (
        <div className="space-y-4">
          <h4 className="font-bold text-xs text-slate-500 uppercase tracking-widest">Pusat Moderasi Diskusi Forum</h4>

          <div className="space-y-4">
            {forumList.map(thread => (
              <div key={thread.id} className="hm-card p-5 rounded-2xl border space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{thread.title}</h4>
                    <p className="text-[10px] text-slate-400">Diposting oleh: {thread.author} ({thread.nim})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setEditingThread(thread)} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-brand-500 transition">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDeleteThread(thread.id)} className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {thread.replies.length > 0 && (
                  <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-800 space-y-2 mt-2">
                    <p className="text-[10px] font-bold text-slate-400">Balasan Diskusi:</p>
                    {thread.replies.map((rep, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] p-2 rounded bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                        <div className="pr-4 truncate">
                          <span className="font-bold">{rep.author}:</span> <span className="text-slate-600 dark:text-slate-300">{rep.content}</span>
                        </div>
                        <button onClick={() => handleDeleteReply(thread.id, idx)} className="text-[10px] text-rose-500 hover:underline font-bold shrink-0">
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
