'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import NavMenu from './NavMenu';
import { SunIcon, MoonIcon } from './icons/NeonIcons';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nk-topbar sticky top-0 z-20 shadow-lg${scrolled ? ' nk-topbar-scrolled' : ''}`}>
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="j4-logo text-xl md:text-2xl flex items-center gap-1">
          <span className="j4-logo-dot" /> J4<span className="hidden sm:inline">Students</span>
          <span className="j4-logo-star">*</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            className="nk-chip w-11 h-11 flex items-center justify-center rounded-full text-lg hover:scale-110 transition-all duration-200"
          >
            {mounted ? (resolvedTheme === 'dark' ? <SunIcon size={22} /> : <MoonIcon size={22} />) : ''}
          </button>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
