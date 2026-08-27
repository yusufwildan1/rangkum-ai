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

const SummaryOutput: React.FC<Props> = ({ summary, fileName }) => {
  const [copied, setCopied] = React.useState(false);

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

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex justify-end space-x-2 mb-4">
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
          ⬇️ Download .md
        </button>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none">
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
