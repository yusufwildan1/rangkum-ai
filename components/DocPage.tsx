'use client';

import React from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

interface DocSection {
  title: string;
  body: string[];
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
            <Link href="/" className="hover:text-cyan-400 transition">Beranda</Link>
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
              <h2 className="text-xl font-semibold mb-3">✨ Yang bisa dibuat &amp; dilakukan</h2>
              <ul className="space-y-2">
                {capabilities.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                    <span className="mt-1.5 w-2 h-2 rounded-full flex-none" style={{ background: color, boxShadow: `0 0 10px ${glow}` }} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">📖 Panduan penggunaan</h2>
              <div className="space-y-3">
                {sections.map((section, index) => {
                  const open = active === index;
                  return (
                    <div key={section.title}>
                      <button
                        type="button"
                        onClick={() => setActive((prev) => (prev === index ? null : index))}
                        className="w-full glass-soft rounded-2xl px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-white/10 dark:hover:bg-gray-700/30 transition"
                      >
                        <span className="font-medium text-gray-800 dark:text-gray-100">{section.title}</span>
                        <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▾</span>
                      </button>
                      {open && (
                        <div className="px-4 py-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                          {section.body.map((b, i) => (
                            <p key={i} className="mb-2">{b}</p>
                          ))}
                        </div>
                      )}
                    </div>
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
                ← Kembali ke dokumentasi
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
