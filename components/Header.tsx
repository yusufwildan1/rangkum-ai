'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import NavMenu from './NavMenu';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-b border-white/50 dark:border-gray-700/30 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/"
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300"
        >
          📄 <span className="hidden sm:inline">Perangkum</span> Dokumen AI
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700/50 shadow-lg text-lg hover:scale-110 transition-all duration-200"
          >
            {mounted ? (resolvedTheme === 'dark' ? '☀️' : '🌙') : ''}
          </button>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
