/* Hallmark · component: WAVerifyView · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState, useRef } from 'react';
import { MessageCircle, FileUp, Clock, CheckCircle2, XCircle, AlertTriangle, Cpu, Send, Shield, Eye, Loader2 } from 'lucide-react';
import { useWAVerify } from '../../hooks/useWAVerify';
import { WASubmission } from '../../types';
import { secureStorage } from '../../utils/secureStorage';
import {
  extractTextFromDigitalPDF,
  renderPDFPageToCanvas,
  scanCanvasWithTesseract,
  verifyExtractedText
} from '../../utils/ocr';
import { mockApi } from '../../services/mockApi';
import { useAuth } from '../../context/AuthContext';

interface WAVerifyViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
  userSubmission?: WASubmission | null;
}

type ScanPhase =
  | 'idle'
  | 'reading-pdf'
  | 'tesseract'
  | 'verifying'
  | 'submitting'
  | 'done';

export const WAVerifyView: React.FC<WAVerifyViewProps> = ({ onShowToast, userSubmission }) => {
  const { currentUser } = useAuth();
  const { submitWAVerificationMutation, updateWAStatusMutation } = useWAVerify();

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    nim: currentUser?.nim || '',
    whatsapp: currentUser?.whatsapp || ''
  });

  React.useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        nim: currentUser.nim,
        whatsapp: currentUser.whatsapp
      });
    }
  }, [currentUser]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanPhase, setScanPhase] = useState<ScanPhase>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [ocrText, setOcrText] = useState('');
  const logsRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setScanLogs(prev => {
      const next = [...prev, msg];
      setTimeout(() => {
        if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
      }, 30);
      return next;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      onShowToast('File Tidak Valid', 'Format file harus berupa PDF (Surat Lolos Seleksi PMB)!', 'danger');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onShowToast('File Terlalu Besar', 'Ukuran file maksimal 5 MB.', 'warning');
      return;
    }
    setSelectedFile(file);
    onShowToast('File Terpilih', `${file.name} siap dipindai.`, 'info');
  };

  const handleStartVerification = async () => {
    if (!form.name || !form.nim || !form.whatsapp) {
      onShowToast('Formulir Belum Lengkap', 'Nama, NIM, dan Nomor WhatsApp wajib diisi!', 'warning');
      return;
    }
    if (!selectedFile) {
      onShowToast('File Belum Ada', 'Wajib mengunggah berkas PDF Surat Lolos Seleksi!', 'warning');
      return;
    }

    setScanLogs([]);
    setScanProgress(0);
    setScanPhase('reading-pdf');

    try {
      addLog('?? Memulai mesin OCR & pemindaian dokumen...');
      addLog('?? Mencoba ekstraksi teks digital dari PDF...');
      setScanProgress(15);

      let extractedText = '';

      try {
        extractedText = await extractTextFromDigitalPDF(selectedFile);
        if (extractedText.trim().length < 20) {
          throw new Error('PDF tidak memiliki layer teks yang cukup. Beralih ke OCR gambar...');
        }
        addLog(`? Berhasil ekstrak ${extractedText.length} karakter teks dari PDF digital.`);
        setScanProgress(40);
      } catch (pdfErr: any) {
        addLog(`?? ${pdfErr.message}`);
        addLog('??? Merender halaman PDF ke canvas untuk OCR gambar...');
        setScanPhase('tesseract');
        setScanProgress(25);

        const canvas = await renderPDFPageToCanvas(selectedFile, 1);
        addLog('?? Tesseract.js sedang menganalisis gambar...');

        extractedText = await scanCanvasWithTesseract(canvas, (p) => {
          setScanProgress(25 + Math.round(p * 0.4));
          if (p % 25 === 0) addLog(`   ? Tesseract progress: ${p}%`);
        });
        addLog(`? OCR Gambar selesai. ${extractedText.length} karakter terbaca.`);
        setScanProgress(65);
      }

      setOcrText(extractedText);

      setScanPhase('verifying');
      addLog('?? Mencocokkan Nama, NIM, Prodi, dan Tahun dengan data PDF...');
      setScanProgress(75);

      const result = verifyExtractedText(extractedText, form.name, form.nim);

      addLog(`   • Nama cocok   : ${result.checks.nameMatches ? '?' : '?'} (${result.details.nameTokensFound}/${result.details.totalNameTokens} token)`);
      addLog(`   • NIM cocok    : ${result.checks.nimMatches ? '?' : '?'}`);
      addLog(`   • Prodi TI     : ${result.checks.prodiMatches ? '?' : '?'}`);
      addLog(`   • Tahun 2026   : ${result.checks.yearMatches ? '?' : '?'}`);
      addLog(result.success ? '?? Semua cek lolos! Mengirim data ke server...' : '?? Cek gagal. Membuat laporan penolakan...');
      setScanProgress(85);

      setScanPhase('submitting');
      addLog('?? Menghasilkan token enkripsi AES-256-CBC...');
      addLog('?? Mengirim data terenkripsi ke server verifikasi...');

      submitWAVerificationMutation.mutate({
        name: form.name,
        nim: form.nim,
        whatsapp: form.whatsapp,
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        ocrSuccess: result.success && form.nim.trim().startsWith('26'),
        ocrChecks: result.checks
      }, {
        onSuccess: (data) => {
          setScanProgress(100);
          setScanPhase('done');
          if (data.status === 'Approved') {
            addLog('? Server berhasil memverifikasi! Status: DISETUJUI.');
            onShowToast('Verifikasi Berhasil!', 'Dokumen OCR lolos. Akses Grup WA disetujui.', 'success');
          } else {
            addLog('? Server memproses penolakan berdasarkan hasil OCR.');
            onShowToast('Verifikasi Ditolak', 'Data tidak lolos validasi OCR server.', 'danger');
          }
        },
        onError: () => {
          setScanProgress(100);
          setScanPhase('done');
          addLog('?? Koneksi server gagal, data disimpan di localStorage.');
          onShowToast('Server Tidak Tersedia', 'Data disimpan lokal. Hubungi admin untuk sinkronisasi.', 'warning');
        }
      });

    } catch (err: any) {
      setScanPhase('done');
      addLog(`?? Error kritis: ${err.message}`);
      onShowToast('Error OCR', err.message || 'Terjadi kesalahan fatal pada engine OCR.', 'danger');
    }
  };

  const handleJoinWaitlist = () => {
    if (!userSubmission) return;
    updateWAStatusMutation.mutate({ ticketId: userSubmission.id, status: 'Waitlist' }, {
      onSuccess: () => {
        onShowToast('Waitlist Terdaftar', 'Tiket kamu dipindahkan ke Antrean Waitlist untuk peninjauan manual.', 'success');
      }
    });
  };

  const isScanning = ['reading-pdf', 'tesseract', 'verifying', 'submitting'].includes(scanPhase);

  const phaseLabel: Record<ScanPhase, string> = {
    idle: '',
    'reading-pdf': 'Membaca PDF Digital...',
    tesseract: 'Memindai Gambar (Tesseract OCR)...',
    verifying: 'Mencocokkan Data Formulir...',
    submitting: 'Mengirim ke Server & Enkripsi...',
    done: 'Selesai'
  };

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-hallmark-md">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Akses Grup WhatsApp Official</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Hanya Mahasiswa Baru TI 2026 yang dapat diverifikasi secara otomatis menggunakan mesin pemindai PDF+OCR nyata.
          </p>
        </div>

        {/* OCR Scanner Live Terminal */}
        {(isScanning || (scanPhase === 'done' && scanLogs.length > 0)) && (
          <div className="hm-card p-6 rounded-3xl space-y-4 border border-brand-500/30 bg-slate-900 text-white shadow-glow-indigo">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tag font-bold text-brand-400 flex items-center space-x-1.5">
                {isScanning ? (
                  <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
                ) : (
                  <Cpu className="w-4 h-4 text-emerald-400" />
                )}
                <span className={isScanning ? 'animate-pulse' : ''}>
                  {isScanning ? phaseLabel[scanPhase] : 'Pemindaian Selesai'}
                </span>
              </span>
              <span className="text-xs font-mono-tag text-slate-400">{scanProgress}%</span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2 relative overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${scanPhase === 'done' ? 'bg-emerald-500' : 'bg-brand-500 shadow-glow-indigo'}`}
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            <div
              ref={logsRef}
              className="bg-slate-950 p-4 rounded-xl font-mono text-[10px] text-emerald-400 h-44 overflow-y-auto space-y-1 scrollbar-none border border-slate-800"
            >
              {scanLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                  <span className="text-slate-500 select-none">[{new Date().toLocaleTimeString('id-ID')}] </span>
                  {log}
                </div>
              ))}
              {isScanning && <div className="animate-pulse text-slate-400">_</div>}
            </div>

            {ocrText && (
              <details className="text-xs">
                <summary className="cursor-pointer text-slate-400 hover:text-slate-200 select-none flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Lihat teks mentah OCR ({ocrText.length} karakter)
                </summary>
                <div className="mt-2 bg-slate-950 border border-slate-700 rounded-lg p-3 text-[10px] text-slate-300 font-mono max-h-32 overflow-y-auto whitespace-pre-wrap scrollbar-none">
                  {ocrText.slice(0, 800)}{ocrText.length > 800 ? '…' : ''}
                </div>
              </details>
            )}
          </div>
        )}

        {/* Form / Status Card */}
        {!isScanning && (
          <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-hallmark-md">
            {!userSubmission ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                      <span>Nama Lengkap Sesuai SIM-PMB</span>
                      <span className="text-[9px] font-extrabold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-lg border border-brand-500/20">Terkunci via Akun</span>
                    </label>
                    <input type="text" value={form.name} disabled={true}
                      placeholder="Nama lengkap sesuai akun"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-200/50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-slate-505 focus:outline-none opacity-80 cursor-not-allowed font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                      <span>NIM Mahasiswa</span>
                      <span className="text-[9px] font-extrabold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-lg border border-brand-500/20">Terkunci via Akun</span>
                    </label>
                    <input type="text" value={form.nim} disabled={true}
                      placeholder="NIM akun"
                      className="w-full px-4 py-2.5 text-xs font-mono-tag rounded-xl bg-slate-200/50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-slate-505 focus:outline-none opacity-80 cursor-not-allowed font-medium" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-between">
                    <span>Nomor WhatsApp Aktif</span>
                    <span className="text-[9px] font-extrabold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-lg border border-brand-500/20">Terkunci via Akun</span>
                  </label>
                  <input type="text" value={form.whatsapp} disabled={true}
                    placeholder="Nomor WA akun"
                    className="w-full px-4 py-2.5 text-xs font-mono-tag rounded-xl bg-slate-200/50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 text-slate-505 focus:outline-none opacity-80 cursor-not-allowed font-medium" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Upload Surat Kelulusan PMB (PDF)</label>
                  <div className={`border-2 border-dashed rounded-2xl p-6 text-center space-y-2 cursor-pointer transition relative ${selectedFile ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-300 dark:border-slate-700 hover:border-brand-500 bg-slate-50/50 dark:bg-slate-900/50'}`}>
                    <input type="file" accept="application/pdf" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <FileUp className={`w-8 h-8 mx-auto ${selectedFile ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {selectedFile ? selectedFile.name : 'Klik untuk memilih PDF Surat Kelulusan/SIM-PMB'}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono-tag">
                      {selectedFile ? `Ukuran: ${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : 'Ukuran maks 5 MB • Khusus format PDF'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 text-[11px] font-medium">
                  <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Menggunakan <strong>PDF.js</strong> + <strong>Tesseract.js</strong> + <strong>AES-256-CBC</strong> token terenkripsi.</span>
                </div>

                <button
                  onClick={handleStartVerification}
                  disabled={isScanning}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition disabled:opacity-50"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Pindai PDF & Verifikasi OCR (Real Engine)</span>
                </button>
              </div>
            ) : (
              <SubmissionStatus
                submission={userSubmission}
                onJoinWaitlist={handleJoinWaitlist}
                onReset={() => { secureStorage.removeItem('infotik_my_wa_submission'); window.location.reload(); }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

/* -- Sub-component: Submission Status Card ----------------------------------- */
interface SubmissionStatusProps {
  submission: WASubmission;
  onJoinWaitlist: () => void;
  onReset: () => void;
}

const SubmissionStatus: React.FC<SubmissionStatusProps> = ({ submission, onJoinWaitlist, onReset }) => {
  const [copied, setCopied] = useState(false);
  const adminWALink = mockApi.buildAdminWANotifLink(submission);

  const handleCopyToken = () => {
    if (submission.verificationToken) {
      navigator.clipboard.writeText(submission.verificationToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 text-center py-4">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-md ${
        submission.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
        : submission.status === 'Rejected' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
        : 'bg-amber-500/20 text-amber-500 border border-amber-500/40 animate-pulse'
      }`}>
        {submission.status === 'Approved' ? <CheckCircle2 className="w-7 h-7" /> : submission.status === 'Rejected' ? <XCircle className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
      </div>

      <div className="space-y-2">
        <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
          submission.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
          : submission.status === 'Rejected' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
        }`}>
          {submission.status === 'Waitlist' ? '? Antrean Waitlist' : `Status: ${submission.status}`}
        </span>

        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
          {submission.status === 'Approved' ? 'Verifikasi Disetujui Mesin OCR!'
            : submission.status === 'Rejected' ? 'Otomatisasi Verifikasi Ditolak'
            : submission.status === 'Waitlist' ? 'Menunggu Peninjauan Manual'
            : 'Data Sedang Diverifikasi oleh Admin'}
        </h3>

        {submission.rejectionReason && submission.status === 'Rejected' && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs leading-relaxed max-w-md mx-auto">
            <p className="font-semibold mb-1">Alasan Penolakan:</p>
            <p>{submission.rejectionReason}</p>
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-left text-xs space-y-1 max-w-md mx-auto font-mono-tag">
        <p><strong>Tiket ID:</strong> {submission.id}</p>
        <p><strong>NIM:</strong> {submission.nim}</p>
        <p><strong>Nama:</strong> {submission.name}</p>
        <p><strong>Nomor WA:</strong> {submission.whatsapp}</p>
        <p><strong>Berkas:</strong> {submission.fileName} ({submission.fileSize})</p>
        <p><strong>Waktu Submit:</strong> {submission.submittedAt}</p>
      </div>

      {submission.verificationToken && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-brand-500/30 text-left max-w-md mx-auto space-y-2">
          <p className="text-[10px] font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1">
            <Shield className="w-3 h-3" /> Token Verifikasi Terenkripsi (AES-256-CBC)
          </p>
          <p className="text-[10px] text-slate-400 break-all font-mono leading-relaxed">{submission.verificationToken}</p>
          <button onClick={handleCopyToken} className="text-[10px] font-bold text-brand-400 hover:text-brand-300 transition">
            {copied ? '? Tersalin!' : '?? Salin Token'}
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        {submission.status === 'Approved' && (
          <a href={submission.waLink} target="_blank" rel="noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition">
            <MessageCircle className="w-4 h-4" />
            <span>Masuk Grup WhatsApp Official</span>
          </a>
        )}

        <a href={adminWALink} target="_blank" rel="noreferrer"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-sm transition">
          <Send className="w-3.5 h-3.5" />
          <span>Kirim Notifikasi ke Admin WA</span>
        </a>
      </div>

      {submission.status === 'Rejected' && (
        <div className="pt-2 max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-900 dark:text-white text-xs text-left space-y-2">
            <p className="font-bold flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" />
              <span>Punya Masalah Verifikasi Otomatis?</span>
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              NIM diawali 26 tapi gagal OCR? Daftarkan ke antrean <strong>Waitlist Manual</strong> untuk diverifikasi langsung oleh Admin angkatan.
            </p>
            <button onClick={onJoinWaitlist}
              className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm transition">
              Daftar Antrean Waitlist Manual
            </button>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        <button onClick={onReset}
          className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-200 dark:hover:bg-slate-700 transition">
          ?? Reset & Verifikasi Ulang
        </button>
      </div>
    </div>
  );
};
