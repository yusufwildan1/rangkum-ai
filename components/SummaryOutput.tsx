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
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-soft text-sm text-gray-700 dark:text-gray-200">
          <span>📄</span>
          <select
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
            className="bg-transparent focus:outline-none text-sm"
          >
            {PAPER_SIZES.map((s) => (
              <option key={s.value} value={s.value} className="text-gray-900">
                {s.label}
              </option>
            ))}
          </select>
        </label>
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
