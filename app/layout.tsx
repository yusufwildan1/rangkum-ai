import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/neon.css';
import { ThemeProvider } from 'next-themes';
import Provider from '@/components/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Student Lab',
  description: 'Rangkum dokumen dengan AI & kelola jadwal tugas — PDF, DOCX, TXT, Markdown',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Nunito:wght@400;600;700;800&family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} nk-body min-h-screen text-gray-100 transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
