import React from 'react';
import { useTheme } from 'next-themes';

interface Props {
  onHome?: () => void;
}

export default function Header({ onHome }: Props) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-b border-white/50 dark:border-gray-700/30 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
        <button
          onClick={onHome}
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300"
        >
          📄 <span className="hidden sm:inline">Perangkum</span> Dokumen AI
        </button>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-white/40 dark:bg-gray-800/50 backdrop-blur-md border border-white/60 dark:border-gray-700/40 text-lg hover:scale-110 transition-all duration-200 shadow"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
