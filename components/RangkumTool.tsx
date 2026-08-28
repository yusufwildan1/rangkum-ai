'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import SummaryOutput from '@/components/SummaryOutput';
import History from '@/components/History';
import { PREVIEW_LENGTH } from '@/lib/constants';

export interface HistoryItem {
  id: string;
  fileName: string;
  summary: string;
  createdAt: string;
}

interface Props {
  initialHistory: HistoryItem[];
}

export default function RangkumTool({ initialHistory }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [rawText, setRawText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);

  const saveHistory = async (newSummary: string, name: string) => {
    try {
      const res = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: name, summary: newSummary }),
      });
      if (res.ok) {
        const item: HistoryItem = await res.json();
        setHistory((prev) => [item, ...prev]);
      }
    } catch {
      // gagal menyimpan riwayat ke server
    }
  };

  const handleFileChange = async (selectedFile: File) => {
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');
    setSummary('');
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const res = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengekstrak teks');
      }
      setRawText(data.text);
      if (!data.text || data.text.length < 10) {
        setError('File kosong atau tidak ada teks yang bisa diekstrak.');
      }
    } catch (err) {
      setError('Gagal mengekstrak teks dari file: ' + (err as Error).message);
      setRawText('');
    }
  };

  const handleSummarize = async () => {
    if (!rawText) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText }),
      });
      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
        await saveHistory(data.summary, file?.name || 'dokumen');
      } else {
        setError(data.error || 'Gagal merangkum dokumen');
      }
    } catch {
      setError('Terjadi kesalahan saat menghubungi server.');
    }
    setLoading(false);
  };

  const clearHistory = async (id?: string) => {
    const qs = id ? `?id=${encodeURIComponent(id)}` : '?all=1';
    try {
      await fetch(`/api/history${qs}`, { method: 'DELETE' });
    } catch {
      // abaikan kegagalan hapus
    }
    setHistory((prev) => (id ? prev.filter((i) => i.id !== id) : []));
  };

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300">
          🚀 Rangkum AI
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload file, dapatkan rangkuman lengkap dengan glosarium, tips, dan action items!
        </p>
      </div>

      <FileUpload onFileSelect={handleFileChange} />

      {file && rawText && (
        <div className="mt-4 p-4 glass-soft rounded-2xl">
          <p className="text-sm text-gray-700 dark:text-gray-200 break-all">
            <strong>📎 {fileName}</strong>
            <span className="text-gray-500 dark:text-gray-400">
              {' '}({rawText.length.toLocaleString('id-ID')} karakter)
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            <strong>Cuplikan teks:</strong> {rawText.slice(0, PREVIEW_LENGTH)}...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 glass-soft rounded-xl border-red-300/40 text-red-600 dark:text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSummarize}
          disabled={loading || !rawText}
          className="px-10 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium disabled:opacity-40 hover:scale-[1.02] hover:shadow-blue-500/30 transition-all duration-300 text-lg shadow-2xl"
        >
          {loading ? '⏳ Merangkum...' : '🚀 Rangkum Sekarang'}
        </button>
      </div>

      {loading && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="w-full max-w-md h-2 bg-gray-200/60 dark:bg-gray-700/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse w-full"></div>
          </div>
          <p className="text-blue-500">Sedang merangkum dokumen... mohon tunggu</p>
        </div>
      )}

      {summary && !loading && (
        <div className="mt-6">
          <SummaryOutput summary={summary} fileName={fileName} />
        </div>
      )}

      <History
        history={history}
        onSelect={(item) => {
          setSummary(item.summary);
          setFileName(item.fileName);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClear={(id) => clearHistory(id)}
        onClearAll={() => clearHistory()}
      />
    </>
  );
}
