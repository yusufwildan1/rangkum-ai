'use client';

import React from 'react';
import Link from 'next/link';
import NavMenu from './NavMenu';

export default function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nk-topbar sticky top-0 z-50${scrolled ? ' nk-topbar-scrolled' : ''}`}>
      <div className="max-w-4xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="j4-logo text-xl md:text-2xl flex items-center gap-1">
          <img src="/studentlab-icon.svg" width="32" height="32" alt="" className="studentlab-header-icon" /> Student<span className="hidden sm:inline">Lab</span>
        </Link>
        <div className="flex items-center gap-2">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
