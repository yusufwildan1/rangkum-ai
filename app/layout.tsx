import type { Metadata } from 'next';
import '../styles/globals.css';
import '../styles/neon.css';
import '../styles/studentlab.css';
import { ThemeProvider } from 'next-themes';
import Provider from '@/components/Provider';
import PageTransition from '@/components/PageTransition';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Student Lab',
  description: 'Rangkum dokumen dengan AI & kelola jadwal tugas — PDF, DOCX, TXT, Markdown',
  icons: {
    icon: '/studentlab-icon.svg',
  },
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
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;600;800&family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Nunito:wght@400;600;700;800&family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`nk-body min-h-screen text-gray-900 transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Provider>
            <PageTransition>{children}</PageTransition>
          </Provider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
