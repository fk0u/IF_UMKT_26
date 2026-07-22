/* Hallmark · component: ForumDetailView · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState } from 'react';
import { ArrowLeft, Send, ThumbsUp } from 'lucide-react';
import { useForum } from '../../hooks/useForum';
import { useAuth } from '../../context/AuthContext';

interface ForumDetailViewProps {
  threadId: string;
  onBack: () => void;
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const ForumDetailView: React.FC<ForumDetailViewProps> = ({ threadId, onBack, onShowToast }) => {
  const { currentUser } = useAuth();
  const { forumQuery, upvoteThreadMutation, addReplyMutation } = useForum();
  const [replyText, setReplyText] = useState('');

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

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <button onClick={onBack} className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Forum</span>
      </button>

      {/* Main Post Card */}
      <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={thread.avatar} alt="avatar" className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border" />
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">{thread.author}</h4>
              <p className="text-[10px] text-slate-400 font-mono-tag">NIM: {thread.nim} • {thread.date}</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
            {thread.category}
          </span>
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
      </div>

      {/* Replies Timeline Section */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">{`Diskusi (${thread.replies.length} Balasan)`}</h4>

        <div className="space-y-3">
          {thread.replies.map((reply, idx) => (
            <div key={idx} className="hm-card p-4 rounded-2xl space-y-2 bg-white/60 dark:bg-surface-900/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img src={reply.avatar} alt="avatar" className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 border shrink-0" />
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{reply.author}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono-tag">{reply.date}</span>
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
