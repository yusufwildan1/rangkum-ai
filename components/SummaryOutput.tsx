'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import {
  FileIcon,
  ClipboardIcon,
  CheckIcon,
  DownloadIcon,
  PrinterIcon,
} from '@/components/icons/NeonIcons';

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
  const typingSeq = React.useRef(0);

  React.useEffect(() => {
    typingSeq.current = 0;
  }, [summary]);

  const TypingWords = ({ text }: { text: string }) => {
    const words = text.split(' ');
    return (
      <>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.18, delay: (typingSeq.current + i) * 0.035 }}
            className="inline-block whitespace-pre"
          >
            {word}
          </motion.span>
        ))}
      </>
    );
  };

  const stepTyping = (count: number) => {
    typingSeq.current += count;
  };

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
    <div className="glass p-6 md:p-8">
      <div className="flex flex-wrap justify-end items-center gap-2 mb-4">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-2 px-4 py-2 glass-soft text-sm font-bold uppercase tracking-wide"
          >
            <FileIcon size={17} /> {currentLabel}
            <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 z-30 min-w-[7rem] glass p-1">
              {PAPER_SIZES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => {
                    setPaperSize(s.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm font-bold uppercase transition ${
                    paperSize === s.value
                      ? 'bg-[#FFD100] text-black'
                      : 'text-[--ink] hover:bg-white/70'
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
          className="px-4 py-2 glass-soft text-sm font-bold uppercase tracking-wide flex items-center gap-2"
        >
          {copied ? (
            <span className="flex items-center gap-1.5">
              <CheckIcon size={17} /> Tersalin
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <ClipboardIcon size={17} /> Salin
            </span>
          )}
        </button>
        <button
          onClick={downloadMarkdown}
          className="px-4 py-2 glass-soft text-sm font-bold uppercase tracking-wide flex items-center gap-2"
        >
          <DownloadIcon size={17} /> .md
        </button>
        <button
          onClick={downloadPDF}
          className="px-5 py-2 btn-fill text-sm font-bold uppercase tracking-wide flex items-center gap-2"
        >
          <PrinterIcon size={17} /> PDF
        </button>
      </div>
      <div className="prose prose-lg dark:prose-invert max-w-none print-area">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p({ children }) {
              if (typeof children === 'string') {
                const count = children.split(' ').length;
                const words = <TypingWords text={children} />;
                stepTyping(count);
                return <p>{words}</p>;
              }
              return <p>{children}</p>;
            },
            li({ children }) {
              if (typeof children === 'string') {
                const count = children.split(' ').length;
                const words = <TypingWords text={children} />;
                stepTyping(count);
                return <li>{words}</li>;
              }
              return <li>{children}</li>;
            },
            h1({ children }) {
              if (typeof children === 'string') {
                const count = children.split(' ').length;
                const words = <TypingWords text={children} />;
                stepTyping(count);
                return (
                  <h1 className="border-b-2 border-[--ink] pb-2">
                    {words}
                  </h1>
                );
              }
              return (
                <h1 className="border-b-2 border-[--ink] pb-2">
                  {children}
                </h1>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto">
                  <table className="border-collapse border-2 border-[--ink]">
                    {children}
                  </table>
                </div>
              );
            },
            th({ children }) {
              return (
                <th className="border-2 border-[--ink] px-3 py-2 bg-[#E4D8BE]">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="border-2 border-[--ink] px-3 py-2">
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
