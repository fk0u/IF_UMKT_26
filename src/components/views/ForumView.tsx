import React, { useState } from 'react';
import { MessageSquarePlus, ThumbsUp } from 'lucide-react';
import { useForum } from '../../hooks/useForum';
import { useAuth } from '../../context/AuthContext';

interface ForumViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
}

export const ForumView: React.FC<ForumViewProps> = ({ onShowToast }) => {
  const { currentUser } = useAuth();
  const { forumQuery, createThreadMutation, upvoteThreadMutation, addReplyMutation } = useForum();
  const forumList = forumQuery.data || [];
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  const [newThread, setNewThread] = useState({
    title: '',
    category: 'Umum & Peralatan',
    content: ''
  });

  const [replyInputs, setReplyInputs] = useState<{ [threadId: string]: string }>({});

  const filteredForum = forumList.filter((f) => {
    if (categoryFilter === 'Semua') return true;
    return f.category === categoryFilter;
  });

  const handleCreateThread = () => {
    if (!newThread.title || !newThread.content) {
      onShowToast('Peringatan', 'Judul dan isi pertanyaan wajib diisi!', 'warning');
      return;
    }

    createThreadMutation.mutate({
      ...newThread,
      author: currentUser?.name || 'Maba TI 2026'
    }, {
      onSuccess: () => {
        onShowToast('Forum Diskusi', 'Diskusi baru berhasil diterbitkan!', 'success');
        setNewThread({ title: '', category: 'Umum & Peralatan', content: '' });
      }
    });
  };

  const handleUpvote = (threadId: string) => {
    upvoteThreadMutation.mutate(threadId, {
      onSuccess: () => {
        onShowToast('Upvote', 'Terima kasih atas apresiasi Anda!', 'info');
      }
    });
  };

  const handleReply = (threadId: string) => {
    const text = replyInputs[threadId];
    if (!text || text.trim() === '') return;

    addReplyMutation.mutate(
      { threadId, content: text, author: currentUser?.name || 'Maba TI 2026' },
      {
        onSuccess: () => {
          onShowToast('Balasan Forum', 'Balasan kamu berhasil diposting!', 'success');
          setReplyInputs({ ...replyInputs, [threadId]: '' });
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Forum Diskusi Mahasiswa TI '26</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Wadah bertanya, berdiskusi koding, info kost, dan topik perkuliahan sesama maba.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-slate-900 rounded-xl overflow-x-auto no-scrollbar border border-slate-300/40 dark:border-slate-800/60">
          {['Semua', 'Umum & Peralatan', 'Info Kost', 'Tugas & Coding', 'Masta 2026'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs transition whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* New Thread Form */}
      <div className="hm-card p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-sm flex items-center space-x-2 text-slate-900 dark:text-white">
          <MessageSquarePlus className="w-4 h-4 text-brand-500" />
          <span>Buat Diskusi / Pertanyaan Baru</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            value={newThread.title}
            onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
            placeholder="Judul pertanyaan / topik bahasan..."
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <textarea
          value={newThread.content}
          onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
          rows={2}
          placeholder="Tuliskan pertanyaan atau informasi selengkapnya..."
          className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:border-brand-500 focus:outline-none"
        ></textarea>

        <div className="flex items-center justify-between pt-1">
          <select
            value={newThread.category}
            onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 focus:border-brand-500 focus:outline-none"
          >
            <option value="Umum & Peralatan">Umum & Peralatan</option>
            <option value="Info Kost">Info Kost</option>
            <option value="Tugas & Coding">Tugas & Coding</option>
            <option value="Masta 2026">Masta 2026</option>
          </select>

          <button
            onClick={handleCreateThread}
            disabled={createThreadMutation.isPending}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs shadow-md transition disabled:opacity-50"
          >
            {createThreadMutation.isPending ? 'Menerbitkan...' : 'Terbitkan Thread'}
          </button>
        </div>
      </div>

      {/* Forum List */}
      {forumQuery.isLoading ? (
        <div className="text-center py-8 text-xs text-slate-500">Memuat diskusi forum...</div>
      ) : (
        <div className="space-y-4">
          {filteredForum.map((item) => (
            <div key={item.id} className="hm-card p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={item.avatar} alt="avatar" className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.author}</h4>
                    <p className="text-[11px] text-slate-400 font-mono-tag">{item.date}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tag font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                  {item.category}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.content}</p>
              </div>

              <div className="flex items-center space-x-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => handleUpvote(item.id)}
                  className="flex items-center space-x-1.5 text-slate-500 hover:text-brand-500 font-semibold transition"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="font-mono-tag">{`${item.upvotes} Upvotes`}</span>
                </button>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-medium">{`${item.replies.length} Balasan`}</span>
              </div>

              {item.replies.length > 0 && (
                <div className="space-y-2 pt-2">
                  {item.replies.map((r, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800/80 text-xs space-y-1 ml-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white text-[11px]">{r.author}</span>
                        <span className="text-[10px] text-slate-400 font-mono-tag">{r.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  value={replyInputs[item.id] || ''}
                  onChange={(e) => setReplyInputs({ ...replyInputs, [item.id]: e.target.value })}
                  placeholder="Tulis balasan..."
                  className="flex-1 px-3.5 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-brand-500 focus:outline-none"
                />
                <button
                  onClick={() => handleReply(item.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs hover:bg-brand-700 transition"
                >
                  Kirim
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
