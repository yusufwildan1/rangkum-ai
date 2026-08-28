'use client';

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SparkleIcon, ScrollIcon, FileIcon } from '@/components/icons/NeonIcons';

interface DocSection {
  title: string;
  body: string[];
}

interface DocExample {
  title: string;
  badge: string;
  fileUrl: string;
  fileName: string;
  note: string;
}

interface VisualExample {
  title: string;
  note: string;
  view: React.ReactNode;
}

interface DocProps {
  title: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  overview: string;
  capabilities: string[];
  examples?: DocExample[];
  visualExamples?: VisualExample[];
  sections: DocSection[];
  toolHref: string;
  toolLabel: string;
}

export default function DocPage({
  title,
  tagline,
  badge,
  icon,
  color,
  glow,
  overview,
  capabilities,
  examples,
  visualExamples,
  sections,
  toolHref,
  toolLabel,
}: DocProps) {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/#dokumentasi" className="hover:text-cyan-400 transition">Documentation</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300 dark:text-gray-200">{title}</span>
          </nav>

          <div className="glass rounded-3xl p-6 md:p-10">
            <div className="text-center mb-8">
              <div
                className="mx-auto mb-6 w-20 h-20 rounded-3xl flex items-center justify-center ring-1 ring-white/15"
                style={{ background: `radial-gradient(circle at 30% 30%, ${glow}, transparent 70%)`, boxShadow: `0 0 40px ${glow}` }}
              >
                {icon}
              </div>
              <span className="inline-block mb-3" style={{ color, boxShadow: `0 0 14px ${glow}` }}>
                <span className="text-sm font-bold uppercase tracking-widest border border-current rounded-full px-4 py-1">{badge}</span>
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Documentation: <span style={{ color }}>{title}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{tagline}</p>
            </div>

            <section className="mb-8 text-gray-700 dark:text-gray-200 leading-relaxed">
              <p>{overview}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3">
                <SparkleIcon size={22} className="inline align-[-2px] mr-2" /> What you can create &amp; do
              </h2>
              <ul className="space-y-2">
                {capabilities.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-none" style={{ background: color, boxShadow: `0 0 10px ${glow}` }} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            {(examples?.length || visualExamples?.length) && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-3">
                  <FileIcon size={22} className="inline align-[-2px] mr-2" /> Output examples
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {examples?.map((ex) => (
                    <div key={ex.fileUrl} className="glass-soft rounded-2xl p-4">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">{ex.title}</p>
                          <p className="text-xs text-gray-500">{ex.note}</p>
                        </div>
                        <a
                          href={ex.fileUrl}
                          download={ex.fileName}
                          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-white hover:scale-105 transition-all"
                          style={{ background: `linear-gradient(135deg, ${color}, var(--neon-purple))`, boxShadow: `0 0 12px ${glow}` }}
                        >
                          Download
                        </a>
                      </div>
                      <iframe
                        title={ex.title}
                        src={`${ex.fileUrl}#toolbar=0&navpanes=0`}
                        className="w-full h-64 rounded-xl border border-white/10 bg-white"
                      />
                    </div>
                  ))}
                  {visualExamples?.map((ve) => (
                    <div key={ve.title} className="glass-soft rounded-2xl p-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">{ve.title}</p>
                      <p className="text-xs text-gray-500 mb-3">{ve.note}</p>
                      <div className="rounded-xl border border-white/10 overflow-hidden">{ve.view}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-xl font-semibold mb-3">
                <ScrollIcon size={22} className="inline align-[-2px] mr-2" /> Usage guide
              </h2>
              <div className="space-y-3">
                {sections.map((section, index) => {
                  const open = active === index;
                  return (
                    <motion.div key={section.title} whileHover={{ scale: 1.008 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
                      <button
                        type="button"
                        onClick={() => setActive((prev) => (prev === index ? null : index))}
                        className="w-full glass-soft rounded-2xl px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-white/10 dark:hover:bg-gray-700/30 transition"
                      >
                        <span className="font-medium text-gray-800 dark:text-gray-100">{section.title}</span>
                        <motion.span
                          animate={{ rotate: open ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                          className={`flex items-center justify-center w-7 h-7 rounded-full text-sm ${
                            open ? 'text-white' : 'text-gray-400'
                          }`}
                          style={{ background: open ? `linear-gradient(135deg, ${color}, var(--neon-purple))` : 'rgba(255,255,255,0.06)', boxShadow: open ? `0 0 14px ${glow}` : 'none' }}
                        >
                          ▾
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden px-4 py-3 text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            {section.body.map((b, i) => (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.08 * i, duration: 0.22 }}
                                className="mb-2"
                              >
                                {b}
                              </motion.p>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <div className="mt-8 pt-6 border-t border-white/10 dark:border-gray-700/50 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={toolHref}
                className="px-8 py-3 rounded-full text-white font-semibold hover:scale-[1.03] transition-all duration-300"
                style={{ background: `linear-gradient(135deg, ${color}, var(--neon-purple))`, boxShadow: `0 0 24px ${glow}` }}
              >
                Buka {toolLabel} →
              </Link>
              <Link href="/#dokumentasi" className="px-6 py-3 rounded-full border border-white/20 text-gray-600 dark:text-gray-300 hover:bg-white/5 transition">
                ← Back to documentation
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
