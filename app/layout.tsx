import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Perangkum Dokumen AI',
  description: 'Rangkum otomatis dokumen Anda dengan AI - PDF, DOCX, TXT, Markdown',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-[#b3e5fc] via-[#dbeafe] to-[#d1c4e9] dark:from-[#1a1a2e] dark:via-[#1a1a2e] dark:to-[#16213e] text-gray-900 dark:text-gray-100 transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
