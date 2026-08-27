'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import LandingHero from '@/components/LandingHero';
import FileUpload from '@/components/FileUpload';
import SummaryOutput from '@/components/SummaryOutput';
import History from '@/components/History';
import { PREVIEW_LENGTH } from '@/lib/constants';

interface HistoryItem {
  id: string;
  fileName: string;
  summary: string;
  createdAt: string;
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const toolRef = useRef<HTMLDivElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [rawText, setRawText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('summaryHistory');
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('summaryHistory', JSON.stringify(history));
    } catch {
      // ignore storage errors
    }
  }, [history]);

  const handleStart = () => {
    setShowIntro(false);
    setTimeout(() => {
      toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleGoHome = () => {
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        const newEntry: HistoryItem = {
          id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
          fileName: file?.name || 'dokumen',
          summary: data.summary,
          createdAt: new Date().toISOString(),
        };
        setHistory((prev) => [newEntry, ...prev]);
      } else {
        setError(data.error || 'Gagal merangkum dokumen');
      }
    } catch {
      setError('Terjadi kesalahan saat menghubungi server.');
    }
    setLoading(false);
  };

  return (
    <>
      {!showIntro && <Header onHome={handleGoHome} />}
      {showIntro && <LandingHero onStart={handleStart} />}
      <main
        ref={toolRef}
        className={`min-h-screen p-4 md:p-6 ${showIntro ? 'hidden' : ''}`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300">
              📄 Perangkum Dokumen AI
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
            onClear={(id) => setHistory((prev) => prev.filter((item) => item.id !== id))}
            onClearAll={() => setHistory([])}
          />
        </div>
      </main>
    </>
  );
}
