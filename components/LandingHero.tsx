'use client';

import React from 'react';

interface Props {
  onStart: () => void;
}

const FILE_BADGES = [
  { label: 'PDF', icon: '📕' },
  { label: 'DOCX', icon: '📘' },
  { label: 'TXT', icon: '📄' },
  { label: 'MD', icon: '✅' },
];

const LandingHero: React.FC<Props> = ({ onStart }) => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100vh] text-center px-6 overflow-hidden">
      {/* Dekorasi: lingkaran blur */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-400/40 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-purple-400/40 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-pink-300/40 blur-3xl"></div>

      {/* Dekorasi: grid titik-titik */}
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,#6366f1_1px,transparent_0)] [background-size:30px_30px] dark:opacity-15"></div>

      {/* Kartu kaca utama untuk hero */}
      <div className="relative glass rounded-[2.5rem] px-8 py-14 md:px-16 md:py-16 max-w-2xl w-full">
        {/* Ikon besar */}
        <div className="mx-auto mb-8 w-24 h-24 md:w-28 md:h-28 rounded-[1.75rem] bg-gradient-to-br from-sky-500 via-blue-500 to-purple-600 shadow-2xl flex items-center justify-center text-5xl md:text-6xl rotate-3 hover:rotate-0 transition-transform duration-500">
          📄
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 dark:text-white leading-tight">
          Perangkum Dokumen AI
        </h1>

        <p className="max-w-lg mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Upload dokumen Anda, biarkan AI yang merangkumnya menjadi catatan super
          lengkap dengan glosarium, tips, dan action items.
        </p>

        <button
          onClick={onStart}
          className="group px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold shadow-2xl shadow-purple-500/30 hover:scale-105 hover:shadow-purple-400/40 active:scale-95 transition-all duration-300"
        >
          🚀 Mulai Rangkum
          <span className="inline-block ml-1 transition-transform group-hover:translate-y-1">↓</span>
        </button>

        {/* Badge format file */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {FILE_BADGES.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/40 dark:bg-gray-800/50 backdrop-blur-md border border-white/50 dark:border-gray-700/40 text-gray-700 dark:text-gray-200 text-sm shadow"
            >
              <span>{b.icon}</span>
              <span className="font-medium">{b.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
