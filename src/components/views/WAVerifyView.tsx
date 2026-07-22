/* Hallmark · component: WAVerifyView · genre: modern-minimal · theme: Custom Indigo-Midnight */
import React, { useState, useEffect } from 'react';
import { MessageCircle, FileUp, Clock, CheckCircle2, XCircle, AlertTriangle, Cpu, ListOrdered } from 'lucide-react';
import { useWAVerify } from '../../hooks/useWAVerify';
import { WASubmission } from '../../types';
import { secureStorage } from '../../utils/secureStorage';

interface WAVerifyViewProps {
  onShowToast: (title: string, msg: string, type?: 'info' | 'success' | 'warning' | 'danger') => void;
  userSubmission?: WASubmission | null;
}

export const WAVerifyView: React.FC<WAVerifyViewProps> = ({ onShowToast, userSubmission }) => {
  const { submitWAVerificationMutation, updateWAStatusMutation } = useWAVerify();

  const [form, setForm] = useState({
    name: '',
    nim: '',
    whatsapp: '',
    fileName: '',
    fileSize: ''
  });

  // OCR simulation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [ocrFailed, setOcrFailed] = useState(false);
  const [ocrTestData, setOcrTestData] = useState({
    namaSurat: '',
    nimSurat: '',
    prodiSurat: 'Teknik Informatika',
    tanggalSurat: '18 Juli 2026'
  });

  // Initialize OCR mock fields when user types name/nim to make it default match
  useEffect(() => {
    setOcrTestData(prev => ({
      ...prev,
      namaSurat: form.name,
      nimSurat: form.nim
    }));
  }, [form.name, form.nim]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      onShowToast('File Tidak Valid', 'Format file harus berupa PDF (Surat Lolos Seleksi PMB)!', 'danger');
      return;
    }

    setForm(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));
    onShowToast('File Terpilih', `File ${file.name} terunggah. Siap diproses OCR.`, 'info');
  };

  const handleStartVerification = () => {
    if (!form.name || !form.nim || !form.whatsapp) {
      onShowToast('Formulir Belum Lengkap', 'Nama Lengkap, NIM, dan Nomor WhatsApp wajib diisi!', 'warning');
      return;
    }
    if (!form.fileName) {
      onShowToast('File Belum Ada', 'Wajib mengunggah berkas PDF Surat Lolos Seleksi!', 'warning');
      return;
    }

    // Start OCR Laser Scanner Animation
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    setOcrFailed(false);

    const logMessages = [
      'Memulai mesin OCR & pemindaian dokumen...',
      'Membaca teks terenkripsi PDF...',
      'Mendeteksi stempel resmi & tanda tangan rektorat...',
      `Mencari Nama Lengkap... [Ditemukan: "${ocrTestData.namaSurat || 'Tidak Sesuai'}"]`,
      `Mencari Nomor NIM... [Ditemukan: "${ocrTestData.nimSurat || 'Tidak Sesuai'}"]`,
      `Mencari Program Studi... [Ditemukan: "${ocrTestData.prodiSurat}"]`,
      `Mencari Tanggal Kelulusan... [Ditemukan: "${ocrTestData.tanggalSurat}"]`,
      'Menghubungkan ke basis data kemahasiswaan TI...'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishVerification();
          return 100;
        }
        
        // Add log message periodically
        if (prev % 12 === 0 && currentLogIndex < logMessages.length) {
          setScanLogs(logs => [...logs, logMessages[currentLogIndex]]);
          currentLogIndex++;
        }
        
        return prev + 4;
      });
    }, 80);
  };

  const finishVerification = () => {
    // Determine OCR match status
    const isAngkatan2026 = form.nim.trim().startsWith('26');
    const nameMatches = ocrTestData.namaSurat.toLowerCase().trim() === form.name.toLowerCase().trim();
    const nimMatches = ocrTestData.nimSurat.trim() === form.nim.trim();
    const prodiMatches = ocrTestData.prodiSurat.toLowerCase().includes('teknik informatika');
    const dateMatches = ocrTestData.tanggalSurat.includes('2026');

    const ocrMatches = nameMatches && nimMatches && prodiMatches && dateMatches;

    // Send request to API
    submitWAVerificationMutation.mutate({
      name: form.name,
      nim: form.nim,
      whatsapp: form.whatsapp,
      fileName: form.fileName,
      fileSize: form.fileSize,
      ocrSimulateSuccess: isAngkatan2026 && ocrMatches,
      ocrData: ocrTestData
    }, {
      onSuccess: (data) => {
        setIsScanning(false);
        if (data.status === 'Approved') {
          onShowToast('Verifikasi Berhasil', 'Dokumen lolos OCR! Akses Grup WA disetujui.', 'success');
        } else {
          setOcrFailed(true);
          onShowToast('Verifikasi Otomatis Gagal', 'Data OCR tidak cocok dengan input formulir.', 'danger');
        }
      }
    });
  };

  const handleJoinWaitlist = () => {
    if (!userSubmission) return;
    
    // Change status to Waitlist for manual verification
    updateWAStatusMutation.mutate({
      ticketId: userSubmission.id,
      status: 'Waitlist'
    }, {
      onSuccess: () => {
        onShowToast('Waitlist Terdaftar', 'Tiket kamu dipindahkan ke Antrean Waitlist untuk peninjauan manual.', 'success');
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
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-hallmark-md">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Akses Grup WhatsApp Official</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Hanya Mahasiswa Baru TI 2026 (NIM diawali `26`) yang dapat diverifikasi secara otomatis menggunakan mesin pemindai PDF OCR.
          </p>
        </div>

        {/* OCR Scanner Loading Overlay */}
        {isScanning && (
          <div className="hm-card p-6 rounded-3xl space-y-4 border border-brand-500/30 bg-slate-900 text-white shadow-glow-indigo">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tag font-bold text-brand-400 flex items-center space-x-1.5 animate-pulse">
                <Cpu className="w-4 h-4 text-brand-500" />
                <span>Simulasi OCR Scanner Sedang Memproses Berkas...</span>
              </span>
              <span className="text-xs font-mono-tag text-slate-400">{scanProgress}%</span>
            </div>

            {/* Glowing Scan Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 relative overflow-hidden">
              <div 
                className="bg-brand-500 h-2 rounded-full transition-all duration-75 shadow-glow-indigo"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>

            {/* Real-time OCR Terminal Logs */}
            <div className="bg-slate-950 p-4 rounded-xl font-mono text-[10px] text-emerald-400 h-40 overflow-y-auto space-y-1 scrollbar-none border border-slate-800">
              {scanLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
              <div className="animate-pulse text-slate-400">_</div>
            </div>
          </div>
        )}

        {!isScanning && (
          <div className="hm-card p-6 sm:p-8 rounded-3xl space-y-6 shadow-hallmark-md">
            {!userSubmission ? (
              <div className="space-y-5">
                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Nama Lengkap Sesuai SIM-PMB</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Contoh: Muhammad Fajar Pratama"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">NIM Mahasiswa</label>
                    <input
                      type="text"
                      value={form.nim}
                      onChange={(e) => setForm({ ...form, nim: e.target.value })}
                      placeholder="NIM Angkatan 2026 (Awalan 26...)"
                      className="w-full px-4 py-2.5 text-xs font-mono-tag rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Nomor WhatsApp Aktif</label>
                  <input
                    type="text"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2.5 text-xs font-mono-tag rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/60 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">Upload Surat Kelulusan PMB (PDF)</label>
                  <div className="border-2 border-dashed border-slate-350 dark:border-slate-750 hover:border-emerald-500 rounded-2xl p-6 text-center space-y-2 cursor-pointer transition relative bg-slate-50/50 dark:bg-slate-900/50">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <FileUp className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {form.fileName ? form.fileName : 'Klik untuk memilih PDF Surat Kelulusan/SIM-PMB'}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono-tag">
                      {form.fileSize ? `Ukuran: ${form.fileSize}` : 'Ukuran maks 5MB • Khusus format PDF'}
                    </p>
                  </div>
                </div>

                {/* TEST RUN OCR OPTIONS */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100 dark:border-slate-800 space-y-3">
                  <h4 className="font-bold text-[11px] text-brand-600 dark:text-brand-400 uppercase tracking-wider">Simulasi Setelan OCR (Untuk Percobaan):</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-500">Nama Lengkap di PDF:</label>
                      <input 
                        type="text" 
                        value={ocrTestData.namaSurat} 
                        onChange={(e) => setOcrTestData({...ocrTestData, namaSurat: e.target.value})}
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500">NIM di PDF:</label>
                      <input 
                        type="text" 
                        value={ocrTestData.nimSurat} 
                        onChange={(e) => setOcrTestData({...ocrTestData, nimSurat: e.target.value})}
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500">Prodi di PDF:</label>
                      <input 
                        type="text" 
                        value={ocrTestData.prodiSurat} 
                        onChange={(e) => setOcrTestData({...ocrTestData, prodiSurat: e.target.value})}
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-950 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500">Tanggal Surat di PDF:</label>
                      <input 
                        type="text" 
                        value={ocrTestData.tanggalSurat} 
                        onChange={(e) => setOcrTestData({...ocrTestData, tanggalSurat: e.target.value})}
                        className="w-full p-1.5 border rounded bg-white dark:bg-slate-950 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartVerification}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition"
                >
                  <span>Pindai PDF & Verifikasi OCR</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-md ${
                    userSubmission.status === 'Approved'
                      ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                      : userSubmission.status === 'Rejected'
                      ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                      : 'bg-amber-500/20 text-amber-500 border border-amber-500/40 animate-pulse'
                  }`}
                >
                  {userSubmission.status === 'Approved' ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : userSubmission.status === 'Rejected' ? (
                    <XCircle className="w-7 h-7" />
                  ) : (
                    <Clock className="w-7 h-7" />
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
                    {userSubmission.status === 'Waitlist' ? '⏳ Antrean Waitlist' : `Status: ${userSubmission.status}`}
                  </span>

                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                    {userSubmission.status === 'Approved'
                      ? 'Verifikasi Disetujui Mesin OCR!'
                      : userSubmission.status === 'Rejected'
                      ? 'Otomatisasi Verifikasi Ditolak'
                      : userSubmission.status === 'Waitlist'
                      ? 'Menunggu Peninjauan Manual'
                      : 'Data Sedang Diverifikasi oleh Admin'}
                  </h3>

                  {userSubmission.rejectionReason && userSubmission.status === 'Rejected' && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs leading-relaxed max-w-md mx-auto space-y-2">
                      <p className="font-semibold">Alasan Penolakan:</p>
                      <p>{userSubmission.rejectionReason}</p>
                    </div>
                  )}

                  {/* WAITLIST OPT-IN BUTTON IF REJECTED OR PENDING */}
                  {userSubmission.status === 'Rejected' && (
                    <div className="pt-2">
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-900 dark:text-white text-xs max-w-md mx-auto text-left space-y-2">
                        <p className="font-bold flex items-center space-x-1">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" />
                          <span>Punya Masalah Verifikasi Otomatis?</span>
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">
                          NIM diawali 26 tapi gagal OCR? Kamu bisa mendaftarkan data WhatsApp ini ke antrean **Waitlist Manual** untuk diverifikasi langsung oleh Admin angkatan.
                        </p>
                        <button
                          onClick={handleJoinWaitlist}
                          className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm transition"
                        >
                          Daftar Antrean Waitlist Manual
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-left text-xs space-y-1 max-w-md mx-auto font-mono-tag">
                  <p><strong>NIM:</strong> {userSubmission.nim}</p>
                  <p><strong>Nama:</strong> {userSubmission.name}</p>
                  <p><strong>Nomor WA:</strong> {userSubmission.whatsapp}</p>
                  <p><strong>Berkas PDF:</strong> {userSubmission.fileName} ({userSubmission.fileSize})</p>
                </div>

                {userSubmission.status === 'Approved' && (
                  <a
                    href={userSubmission.waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Masuk Grup WhatsApp Official</span>
                  </a>
                )}

                {/* Reset button to clear simulation */}
                <div className="pt-4 border-t border-slate-250 dark:border-slate-800">
                  <p className="text-[11px] text-slate-400 mb-2">Simulasi Status Admin (Untuk Pengujian):</p>
                  <div className="flex justify-center space-x-2">
                    <button onClick={() => handleSimulateStatus('Approved')} className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 font-bold text-[11px]">Approved ✅</button>
                    <button onClick={() => handleSimulateStatus('Waitlist')} className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 font-bold text-[11px]">Waitlist ⏳</button>
                    <button onClick={() => {
                      secureStorage.removeItem('infotik_my_wa_submission');
                      window.location.reload();
                    }} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold text-[11px]">Reset Form 🔄</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
