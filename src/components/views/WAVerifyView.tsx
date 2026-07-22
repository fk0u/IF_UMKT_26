import React, { useState } from 'react';
import { MessageCircle, FileUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useWAVerify } from '../../hooks/useWAVerify';
import { WASubmission } from '../../types';

interface WAVerifyViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
  userSubmission?: WASubmission | null;
}

export const WAVerifyView: React.FC<WAVerifyViewProps> = ({ onShowToast, userSubmission }) => {
  const { submitWAVerificationMutation, updateWAStatusMutation } = useWAVerify();

  const [form, setForm] = useState({
    name: '',
    nim: '',
    fileName: '',
    fileSize: ''
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      onShowToast('File Tidak Valid', 'Format file harus berupa PDF (Surat Lolos Seleksi SIM-PMB)!', 'danger');
      return;
    }

    setForm({
      ...form,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    });
    onShowToast('File Terpilih', `File ${file.name} berhasil diunggah secara lokal.`, 'info');
  };

  const handleSubmit = () => {
    if (!form.name || !form.nim) {
      onShowToast('Form Incomplete', 'Nama Lengkap dan NIM wajib diisi!', 'warning');
      return;
    }
    if (!form.fileName) {
      onShowToast('File Missing', 'Wajib mengunggah Surat Keterangan Lolos Seleksi (PDF)!', 'warning');
      return;
    }

    submitWAVerificationMutation.mutate(form, {
      onSuccess: () => {
        onShowToast('Pendaftaran Berhasil', 'Data verifikasi grup WA kamu berhasil terkirim!', 'success');
      }
    });
  };

  const handleSimulateStatus = (status: WASubmission['status']) => {
    if (!userSubmission) return;
    updateWAStatusMutation.mutate({ ticketId: userSubmission.id, status });
  };

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <MessageCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Akses Grup WhatsApp Official</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Untuk mencegah akun palsu/penipuan, setiap Mahasiswa Baru TI 2026 wajib melakukan verifikasi Surat Lolos Seleksi (SIM-PMB UMKT).
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-3xl border space-y-6 shadow-xl">
          {!userSubmission ? (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Nama Lengkap Sesuai SIM-PMB</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Muhammad Fajar Pratama"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">NIM / Nomor Pendaftaran SIM-PMB</label>
                <input
                  type="text"
                  value={form.nim}
                  onChange={(e) => setForm({ ...form, nim: e.target.value })}
                  placeholder="Contoh: 261110001"
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Upload Surat Keterangan Lolos Seleksi (PDF)</label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center space-y-2 cursor-pointer transition relative bg-slate-50/50 dark:bg-slate-900/50">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <FileUp className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {form.fileName ? form.fileName : 'Klik atau seret file Surat Lolos Seleksi (PDF) ke sini'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {form.fileSize ? `Ukuran: ${form.fileSize}` : 'Ukuran maksimal 5MB (Format PDF)'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitWAVerificationMutation.isPending}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50"
              >
                <span>{submitWAVerificationMutation.isPending ? 'Mengunggah via TanStack Mutation...' : 'Kirim Data Verifikasi'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg ${
                  userSubmission.status === 'Approved'
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                    : userSubmission.status === 'Rejected'
                    ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                }`}
              >
                {userSubmission.status === 'Approved' ? (
                  <CheckCircle2 className="w-8 h-8" />
                ) : userSubmission.status === 'Rejected' ? (
                  <XCircle className="w-8 h-8" />
                ) : (
                  <Clock className="w-8 h-8 animate-pulse" />
                )}
              </div>

              <div className="space-y-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    userSubmission.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                      : userSubmission.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                  }`}
                >
                  {`Status Tiket: ${userSubmission.status}`}
                </span>

                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {userSubmission.status === 'Approved'
                    ? 'Verifikasi Disetujui Admin!'
                    : userSubmission.status === 'Rejected'
                    ? 'Verifikasi Ditolak'
                    : 'Data Sedang Diverifikasi oleh Admin Angkatan'}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {userSubmission.status === 'Approved'
                    ? 'Selamat! Identitas kamu telah terkonfirmasi. Silakan klik tombol di bawah untuk bergabung ke WhatsApp Official TI 2026.'
                    : userSubmission.status === 'Rejected'
                    ? 'File PDF atau data yang dilampirkan tidak sesuai. Silakan kirim ulang dokumen resmi SIM-PMB.'
                    : `Terima kasih ${userSubmission.name}. Admin angkatan 2026 sedang mengecek kecocokan dokumen SIM-PMB kamu.`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border text-left text-xs space-y-1 max-w-md mx-auto">
                <p><strong>Kode Tiket:</strong> {userSubmission.id}</p>
                <p><strong>Nama:</strong> {userSubmission.name}</p>
                <p><strong>NIM:</strong> {userSubmission.nim}</p>
                <p><strong>Dokumen:</strong> {userSubmission.fileName}</p>
              </div>

              {userSubmission.status === 'Approved' && (
                <a
                  href={userSubmission.waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Masuk Grup WhatsApp Official Sekarang</span>
                </a>
              )}

              {/* Simulation buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[11px] text-slate-400 mb-2">Simulasi Status Cepat (TanStack Mutation Test):</p>
                <div className="flex justify-center space-x-2">
                  <button onClick={() => handleSimulateStatus('Approved')} className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 font-bold text-[11px]">Approved ✅</button>
                  <button onClick={() => handleSimulateStatus('Pending')} className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 font-bold text-[11px]">Pending ⏳</button>
                  <button onClick={() => handleSimulateStatus('Rejected')} className="px-3 py-1 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 font-bold text-[11px]">Rejected ❌</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
