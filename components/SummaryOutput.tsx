'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface Props {
  summary: string;
  fileName?: string;
}

const PAPER_SIZES = [
  { value: 'a5', label: 'A5' },
  { value: 'b5', label: 'B5' },
  { value: 'a4', label: 'A4' },
  { value: 'folio', label: 'Folio' },
];

const SummaryOutput: React.FC<Props> = ({ summary, fileName }) => {
  const [copied, setCopied] = React.useState(false);
  const [paperSize, setPaperSize] = React.useState('a4');
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = PAPER_SIZES.find((s) => s.value === paperSize)?.label || 'A4';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Gagal menyalin ke clipboard');
    }
  };

  const downloadMarkdown = () => {
    const safeName = fileName ? fileName.replace(/\.[^.]+$/, '') : 'rangkuman';
    const blob = new Blob([summary], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeName}-rangkuman-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const html = document.documentElement;
    const body = document.body;

    const prevPage = html.className.match(/\bpage-[a-z0-9]+/)?.[0] || '';
    html.classList.remove('page-a5', 'page-b5', 'page-a4', 'page-folio');
    html.classList.add(`page-${paperSize}`);
    body.classList.add('printing-summary');

    const cleanup = () => {
      html.classList.remove('page-a5', 'page-b5', 'page-a4', 'page-folio');
      if (prevPage) html.classList.add(prevPage);
      body.classList.remove('printing-summary');
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    // Fallback untuk browser yang tidak memicu afterprint
    setTimeout(cleanup, 2000);

    window.print();
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-wrap justify-end items-center gap-2 mb-4">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-soft text-gray-700 dark:text-gray-200 hover:scale-105 transition text-sm"
          >
            📄 {currentLabel}
            <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 z-30 min-w-[7rem] glass rounded-2xl overflow-hidden p-1">
              {PAPER_SIZES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    setPaperSize(s.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
                    paperSize === s.value
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300 font-semibold'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-700/40'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded-full glass-soft text-gray-700 dark:text-gray-200 hover:scale-105 transition text-sm flex items-center gap-1"
        >
          {copied ? '✅ Tersalin' : '📋 Salin'}
        </button>
        <button
          onClick={downloadMarkdown}
          className="px-4 py-2 rounded-full glass-soft text-gray-700 dark:text-gray-200 hover:scale-105 transition text-sm flex items-center gap-1"
        >
          ⬇️ .md
        </button>
        <button
          onClick={downloadPDF}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition text-sm flex items-center gap-1 shadow"
        >
          🖨️ PDF
        </button>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none print-area">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1({ children }) {
              return (
                <h1 className="border-b border-gray-200 dark:border-gray-700 pb-2">
                  {children}
                </h1>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto">
                  <table className="border-collapse border border-gray-300 dark:border-gray-600">
                    {children}
                  </table>
                </div>
              );
            },
            th({ children }) {
              return (
                <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-700">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
                  {children}
                </td>
              );
            },
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SummaryOutput;
