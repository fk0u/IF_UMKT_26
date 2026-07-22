/* Hallmark · component: ForumDetailView · pre-emit critique: P5 H5 E5 S5 R5 V5 · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState } from 'react';
import { ArrowLeft, Send, ThumbsUp, Trash2, Edit, Save, X, MessageSquare, AlertTriangle } from 'lucide-react';
import { useForum } from '../../hooks/useForum';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../services/mockApi';

interface ForumDetailViewProps {
  threadId: string;
  onBack: () => void;
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const ForumDetailView: React.FC<ForumDetailViewProps> = ({ threadId, onBack, onShowToast }) => {
  const { currentUser } = useAuth();
  const { forumQuery, upvoteThreadMutation, addReplyMutation } = useForum();
  
  // Local state variables
  const [replyText, setReplyText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    category: '',
    content: ''
  });

  const thread = (forumQuery.data || []).find((t) => t.id === threadId);

  if (!thread) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-xs text-slate-400">Postingan diskusi tidak ditemukan.</p>
        <button onClick={onBack} className="text-brand-500 text-xs font-bold hover:underline">
          Kembali ke Forum
        </button>
      </div>
    );
  }

  const isAdmin = currentUser?.role === 'admin';

  const handleUpvote = () => {
    upvoteThreadMutation.mutate(thread.id, {
      onSuccess: () => {
        onShowToast('Upvote', 'Apresiasi Anda berhasil dikirim!', 'info');
      }
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    addReplyMutation.mutate(
      { threadId: thread.id, content: replyText, author: currentUser?.name || 'Maba TI 2026' },
      {
        onSuccess: () => {
          onShowToast('Balasan Terkirim', 'Komentar Anda berhasil diterbitkan.', 'success');
          setReplyText('');
        }
      }
    );
  };

  // Admin inline edits
  const handleStartEdit = () => {
    setEditForm({
      title: thread.title,
      category: thread.category,
      content: thread.content
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      onShowToast('Peringatan', 'Judul dan isi tidak boleh kosong!', 'warning');
      return;
    }
    try {
      await mockApi.updateThread(thread.id, editForm);
      onShowToast('Moderasi Sukses', 'Postingan berhasil diedit/dimoderasi.', 'success');
      setIsEditing(false);
      forumQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal menyimpan perubahan.', 'danger');
    }
  };

  const handleDeleteThread = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus diskusi ini secara permanen dari forum?')) return;
    try {
      await mockApi.deleteThread(thread.id);
      onShowToast('Hapus Sukses', 'Utas diskusi berhasil dihapus.', 'info');
      forumQuery.refetch();
      onBack();
    } catch (e) {
      onShowToast('Error', 'Gagal menghapus diskusi.', 'danger');
    }
  };

  const handleDeleteReply = async (replyIdx: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus balasan komentar ini?')) return;
    try {
      await mockApi.deleteReply(thread.id, replyIdx);
      onShowToast('Hapus Komentar', 'Komentar berhasil dihapus.', 'info');
      forumQuery.refetch();
    } catch (e) {
      onShowToast('Error', 'Gagal menghapus balasan.', 'danger');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <button onClick={onBack} className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Forum</span>
      </button>

      {/* Admin Moderation Alert Banner */}
      {isAdmin && (
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-900 dark:text-purple-200 flex items-center justify-between text-xs">
          <span className="font-bold flex items-center space-x-1.5">
            <ShieldCheckIcon className="w-4 h-4 shrink-0 text-purple-500" />
            <span>Mode Moderasi Admin Aktif. Anda dapat langsung mengedit atau menghapus konten di halaman ini.</span>
          </span>
        </div>
      )}

      {/* Main Post Card */}
      <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-4 relative overflow-hidden">
        {isEditing ? (
          /* Inline Editor Form */
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-500">Judul Pertanyaan</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-3 py-2 border rounded bg-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-500">Kategori</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded bg-white dark:bg-slate-950"
                >
                  <option value="Umum & Peralatan">Umum & Peralatan</option>
                  <option value="Info Kost">Info Kost</option>
                  <option value="Tugas & Coding">Tugas & Coding</option>
                  <option value="Masta 2026">Masta 2026</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-500">Isi Diskusi</label>
              <textarea
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 border rounded bg-transparent"
              ></textarea>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-xl flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          /* Normal Post Render */
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={thread.avatar} alt="avatar" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border" />
                <div>
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{thread.author}</h4>
                  <p className="text-[10px] text-slate-400 font-mono-tag">NIM: {thread.nim} • {thread.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                  {thread.category}
                </span>
                
                {/* Admin Quick Action Dropdown/Buttons */}
                {isAdmin && (
                  <div className="flex items-center space-x-1 border-l pl-2 border-slate-200 dark:border-slate-800">
                    <button
                      onClick={handleStartEdit}
                      className="p-1 rounded text-slate-400 hover:text-brand-500 transition"
                      title="Edit Utas"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleDeleteThread}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 transition"
                      title="Hapus Utas"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-extrabold text-xl text-slate-900 dark:text-white leading-snug">{thread.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{thread.content}</p>
            </div>

            <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <button
                onClick={handleUpvote}
                className="flex items-center space-x-1.5 text-slate-500 hover:text-brand-500 font-semibold transition"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="font-mono-tag">{`${thread.upvotes} Upvotes`}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Replies Timeline Section */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">{`Diskusi (${thread.replies.length} Balasan)`}</h4>

        <div className="space-y-3">
          {thread.replies.map((reply, idx) => (
            <div key={idx} className="hm-card p-4 rounded-2xl space-y-2 bg-white/60 dark:bg-surface-900/40 relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img src={reply.avatar} alt="avatar" className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border shrink-0" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{reply.author}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400 font-mono-tag">{reply.date}</span>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteReply(idx)}
                      className="p-1 rounded text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition duration-150"
                      title="Hapus Balasan Komentar"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-9">{reply.content}</p>
            </div>
          ))}

          {thread.replies.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-6">Belum ada tanggapan. Jadilah yang pertama memberikan balasan!</p>
          )}
        </div>
      </div>

      {/* Input reply bar */}
      <div className="hm-card p-4 rounded-2xl flex items-center space-x-3 bg-white dark:bg-surface-900">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendReply()}
          placeholder="Tulis pendapat atau solusi Anda..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-950 border border-transparent focus:border-brand-500 focus:outline-none"
        />
        <button
          onClick={handleSendReply}
          className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs hover:bg-slate-800 transition flex items-center space-x-1.5 shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Kirim</span>
        </button>
      </div>
    </div>
  );
};

// Helper micro-icon component
const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);
