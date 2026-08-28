'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

interface MenuItem {
  label: string;
  icon: string;
  href: string;
  description?: string;
}

interface Props {
  items?: MenuItem[];
}

const DEFAULT_ITEMS: MenuItem[] = [
  { label: 'Beranda', icon: '🏠', href: '/' },
  { label: 'Tentang', icon: 'ℹ️', href: '/about' },
  { label: 'Rangkum AI', icon: '🚀', href: '/rangkum', description: 'Upload & rangkum dokumen' },
  { label: 'Jadwal Tugas', icon: '📅', href: '/jadwal-tugas', description: 'Kelola deadline tugas' },
];

const NavMenu: React.FC<Props> = ({ items = DEFAULT_ITEMS }) => {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Buka menu"
        className="w-11 h-11 flex items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700/50 shadow-lg text-lg hover:scale-110 transition-all duration-200"
      >
        <span className="flex flex-col gap-1.5">
          {/* Ikon hamburger */}
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          ></span>
          <span className={`block h-0.5 w-5 bg-current transition-all ${open ? 'opacity-0' : ''}`}></span>
          <span
            className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          ></span>
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 z-30 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/60 dark:border-gray-700/50 shadow-2xl rounded-3xl overflow-hidden p-2">
          <div className="px-3 pb-2 pt-1 text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Menu
          </div>
          <nav className="space-y-1">
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition ${
                  isActive(item.href)
                    ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300'
                    : 'text-gray-800 dark:text-gray-100 hover:bg-blue-500/10 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="flex-1">
                  <span className="block font-medium">{item.label}</span>
                  {item.description && (
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </span>
                  )}
                </span>
                {isActive(item.href) && <span className="text-blue-500">•</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-2 pt-2 border-t border-white/40 dark:border-gray-700/40">
            {status === 'authenticated' && session?.user ? (
              <div className="px-3 py-2 flex items-center gap-3">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {(session.user.name?.[0] || '?').toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-gray-800 dark:text-gray-100">
                    {session.user.name || 'Pengguna'}
                  </p>
                  {session.user.email && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="px-3 py-2 text-sm">
                <p className="text-gray-500 dark:text-gray-400 mb-1">
                  Masuk untuk menyimpan data kamu.
                </p>
              </div>
            )}

            <div className="p-1">
              {status === 'authenticated' ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-left text-red-600 dark:text-red-400 hover:bg-red-500/10 transition"
                >
                  <span>🚪</span> Keluar
                </button>
              ) : (
                <button
                  onClick={() => signIn('google', { callbackUrl: '/rangkum' })}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-left text-blue-600 dark:text-blue-300 hover:bg-blue-500/10 transition"
                >
                  <span>🔐</span> Masuk
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
