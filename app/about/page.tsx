'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';

interface Feature {
  icon: string;
  title: string;
  points: string[];
}

const FEATURES: Feature[] = [
  {
    icon: '🚀',
    title: 'Rangkum AI',
    points: [
      'Merangkum dokumen berformat PDF, DOCX, TXT, dan Markdown secara otomatis.',
      'Output lengkap: ringkasan eksekutif, poin penting, glosarium, tips menghafal, dan action items.',
      'Menyimpan & membagikan hasil: salin, unduh sebagai file Markdown, atau ekspor menjadi PDF.',
      'Pilihan ukuran kertas PDF: A5, B5, A4, dan Folio.',
      'Mode gelap yang nyaman dibaca siang maupun malam.',
    ],
  },
  {
    icon: '📅',
    title: 'Jadwal Tugas',
    points: [
      'Menambahkan tugas dengan tanggal jatuh tempo.',
      'Menandai tugas yang sudah selesai.',
      'Menghapus tugas yang tidak diperlukan lagi.',
    ],
  },
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Student Lab - Tentang';
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-fuchsia-600 shadow-[0_0_40px_rgba(34,224,255,0.45),0_0_70px_rgba(255,79,216,0.35)] ring-1 ring-white/20 flex items-center justify-center">
              <span className="font-extrabold text-3xl tracking-tight text-white [text-shadow:0_0_14px_rgba(255,255,255,0.9)]">
                SL
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Tentang{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400">
                J4Students
              </span>
            </h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-200">
            <section>
              <h2 className="text-xl font-semibold mb-2">✨ Apa itu?</h2>
              <p className="leading-relaxed">
                J4Students adalah platform yang membantu Anda mengubah dokumen
                menjadi rangkuman yang lengkap dan terstruktur secara otomatis. Cukup
                unggah file, dan AI akan menyusunnya menjadi catatan rapi yang siap
                dipelajari.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">🎯 Apa saja yang bisa dilakukan?</h2>
              <div className="space-y-3">
                {FEATURES.map((feature, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <motion.div
                      key={feature.title}
                      animate={{ scale: isOpen ? 1 : 1 }}
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className={`glass-soft rounded-2xl overflow-hidden transition-shadow duration-300 ${
                        isOpen
                          ? 'ring-1 ring-cyan-400/30 shadow-[0_0_26px_rgba(34,224,255,0.25)]'
                          : 'ring-1 ring-transparent'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-200 hover:bg-white/20 dark:hover:bg-gray-700/30"
                      >
                        <span className="flex items-center gap-3 font-medium text-gray-800 dark:text-gray-100">
                          <motion.span
                            animate={{ rotate: isOpen ? 8 : 0, scale: isOpen ? 1.15 : 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 15 }}
                            className="text-xl"
                          >
                            {feature.icon}
                          </motion.span>
                          {feature.title}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                          className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full text-sm ${
                            isOpen
                              ? 'bg-cyan-400/20 text-cyan-400'
                              : 'bg-gray-500/10 text-gray-500 dark:text-gray-300'
                          }`}
                        >
                          ▾
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden px-4 pb-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300 leading-relaxed"
                          >
                            {feature.points.map((point, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i, duration: 0.2 }}
                              >
                                {point}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">🚀 Cara memulai</h2>
              <p className="leading-relaxed">
                Klik menu <strong>☰</strong> di pojok kanan atas, lalu pilih{' '}
                <strong>Rangkum AI</strong> untuk mulai mengunggah dokumen dan mendapatkan
                rangkumannya.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
