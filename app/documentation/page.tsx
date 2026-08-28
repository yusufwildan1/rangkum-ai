import Header from '@/components/Header';
import Link from 'next/link';
import { RocketIcon, CalendarIcon } from '@/components/icons/NeonIcons';

export const metadata = {
  title: 'Documentation | Student Lab',
};

const docs = [
  {
    title: 'Rangkum AI',
    desc: 'Panduan lengkap mengubah dokumen menjadi catatan belajar dengan AI — mulai, tips, dan cara ekspor.',
    color: 'var(--neon-cyan)',
    glow: 'rgba(34, 224, 255, 0.35)',
    href: '/documentation/rangkum',
    icon: <RocketIcon size={30} />,
  },
  {
    title: 'Jadwal Tugas',
    desc: 'Panduan lengkap mengelola deadline dan tugas kuliah — tambah, tandai selesai, dan hapus.',
    color: 'var(--neon-pink)',
    glow: 'rgba(255, 79, 216, 0.35)',
    href: '/documentation/jadwal-tugas',
    icon: <CalendarIcon size={30} />,
  },
];

export default function DocumentationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Panduan lengkap untuk setiap tools di Student Lab. Pilih salah satu untuk memulai.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 doc-index-grid">
            {docs.map((d) => (
              <Link
                key={d.title}
                href={d.href}
                className="glass doc-index-card rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 block"
                style={{ ['--dc' as string]: d.color, ['--dg' as string]: d.glow } as React.CSSProperties}
              >
                <div
                  className="mb-4 w-16 h-16 rounded-2xl flex items-center justify-center ring-1 ring-white/15 doc-index-icon"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${d.glow}, transparent 70%)` }}
                >
                  {d.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: d.color }}>{d.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{d.desc}</p>
                <span className="font-bold inline-flex items-center gap-1" style={{ color: d.color }}>
                  Baca panduan <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
