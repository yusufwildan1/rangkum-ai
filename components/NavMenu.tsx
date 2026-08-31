'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeIcon,
  InfoIcon,
  RocketIcon,
  CalendarIcon,
  LogoutIcon,
  LoginIcon,
  ScrollIcon,
} from '@/components/icons/NeonIcons';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  description?: string;
}

interface Props {
  items?: MenuItem[];
}

const DEFAULT_ITEMS: MenuItem[] = [
  { label: 'Beranda', icon: <HomeIcon size={20} />, href: '/' },
  { label: 'Tentang', icon: <InfoIcon size={20} />, href: '/about' },
  { label: 'Rangkum AI', icon: <RocketIcon size={20} />, href: '/rangkum', description: 'Upload & rangkum dokumen' },
  { label: 'Jadwal Tugas', icon: <CalendarIcon size={20} />, href: '/jadwal-tugas', description: 'Kelola deadline tugas' },
  { label: 'Kirim Testimoni', icon: <InfoIcon size={20} />, href: '/testimoni', description: 'Bagikan pengalamanmu' },
  { label: 'Documentation', icon: <ScrollIcon size={20} />, href: '/documentation', description: 'Panduan lengkap tools' },
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
        className="nk-chip w-11 h-11 flex items-center justify-center text-lg hover:scale-110 transition-all duration-200"
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

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-panel"
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="nk-menu-panel absolute right-0 mt-2 z-30 w-64 overflow-hidden p-2 shadow-2xl origin-top-right"
          >
            <div className="px-3 pb-2 pt-1 text-xs uppercase tracking-wider text-gray-500">
              Menu
            </div>
            <nav className="space-y-1">
              {items.map((item, i) => (
                <motion.div
                  key={item.href + item.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, type: 'spring', stiffness: 320, damping: 26 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 border-2 transition ${
                      isActive(item.href)
                        ? 'bg-[#FFD100] border-[--ink] text-[--ink] shadow-[3px_3px_0_0_#15161B]'
                        : 'border-transparent hover:bg-[#FFD100] hover:border-[--ink] hover:text-[--ink] hover:shadow-[3px_3px_0_0_#15161B]'
                    }`}
                  >
                    <span className="flex items-center">{item.icon}</span>
                    <span className="flex-1">
                      <span className="block font-bold">{item.label}</span>
                      {item.description && (
                        <span className="block text-xs text-[--ink-soft]">
                          {item.description}
                        </span>
                      )}
                    </span>
                    {isActive(item.href) && <span className="text-[--ink]">■</span>}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 + items.length * 0.05, duration: 0.25 }}
              className="mt-2 pt-2 border-t border-[--nk-border]/60"
            >
              {status === 'authenticated' && session?.user ? (
                <div className="px-3 py-2 flex items-center gap-3">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="avatar"
                      className="w-9 h-9 object-cover border-2 border-[--ink]"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-[#2F49FF] border-2 border-[--ink] flex items-center justify-center text-white font-bold">
                      {(session.user.name?.[0] || '?').toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">
                      {session.user.name || 'Pengguna'}
                    </p>
                    {session.user.email && (
                      <p className="text-xs text-[--ink-soft] truncate">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="px-3 py-2 text-sm">
                  <p className="text-[--ink-soft] mb-1">
                    Masuk untuk menyimpan data kamu.
                  </p>
                </div>
              )}

              <div className="p-1">
                {status === 'authenticated' ? (
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-2 px-3 py-2 border-2 border-transparent text-left text-[#E8352B] hover:bg-[#E8352B] hover:text-white hover:border-[--ink] hover:shadow-[3px_3px_0_0_#15161B] transition"
                  >
                    <LogoutIcon size={19} /> Keluar
                  </button>
                ) : (
                  <button
                    onClick={() => signIn('google', { callbackUrl: '/rangkum' })}
                    className="w-full flex items-center gap-2 px-3 py-2 border-2 border-transparent text-left text-[#2F49FF] hover:bg-[#2F49FF] hover:text-white hover:border-[--ink] hover:shadow-[3px_3px_0_0_#15161B] transition"
                  >
                    <LoginIcon size={19} /> Masuk
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMenu;
