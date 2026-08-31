'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Student Lab - Masuk';
    if (status === 'authenticated') {
      router.push('/rangkum');
    }
  }, [status, router]);

  const handleGoogle = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl: '/rangkum' });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md glass p-8 text-center">
          <div className="mx-auto mb-6 w-16 h-16 bg-[#2F49FF] border-[3px] border-[--ink] shadow-[4px_4px_0_0_#15161B] flex items-center justify-center text-3xl text-white">
            🔐
          </div>
          <h1 className="text-2xl font-bold mb-2">Masuk</h1>
          <p className="mb-8">
            Masuk untuk menyimpan riwayat rangkuman dan jadwal tugas kamu secara aman.
          </p>

          <button
            onClick={handleGoogle}
            disabled={loading || status === 'loading'}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#EFE6D3] text-[#15161B] border-2 border-[#15161B] shadow-[6px_6px_0_0_#15161B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#15161B] transition disabled:opacity-50 font-bold font-mono"
          >
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.4 6.1 29.5 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.4 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 44c5.2 0 9.8-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
            </svg>
            {loading || status === 'loading' ? 'Memuat...' : 'Masuk dengan Google'}
          </button>

          {status === 'authenticated' && (
            <p className="mt-4 text-sm text-[#00C389] font-bold">
              Berhasil masuk! Mengarahkan...
            </p>
          )}
        </div>
      </main>
    </>
  );
}
