'use client';

import { useState } from 'react';
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

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center text-4xl">
              📄
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Tentang{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300">
                Perangkum Dokumen AI
              </span>
            </h1>
          </div>

          <div className="space-y-6 text-gray-700 dark:text-gray-200">
            <section>
              <h2 className="text-xl font-semibold mb-2">✨ Apa itu?</h2>
              <p className="leading-relaxed">
                Perangkum Dokumen AI adalah platform yang membantu Anda mengubah dokumen
                menjadi rangkuman yang lengkap dan terstruktur secara otomatis. Cukup
                unggah file, dan AI akan menyusunnya menjadi catatan rapi yang siap
                dipelajari.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">🎯 Apa saja yang bisa dilakukan?</h2>
              <div className="space-y-2">
                {FEATURES.map((feature, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div
                      key={feature.title}
                      className="glass-soft rounded-2xl overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-white/30 dark:hover:bg-gray-700/40 transition"
                      >
                        <span className="flex items-center gap-3 font-medium text-gray-800 dark:text-gray-100">
                          <span className="text-xl">{feature.icon}</span>
                          {feature.title}
                        </span>
                        <span
                          className={`shrink-0 text-gray-500 dark:text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        >
                          ▾
                        </span>
                      </button>
                      {isOpen && (
                        <ul className="px-4 pb-4 space-y-2 list-disc list-inside text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.points.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
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
