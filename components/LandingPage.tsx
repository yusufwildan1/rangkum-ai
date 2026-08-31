'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import TestimonialSlider from '@/components/TestimonialSlider';

const features = [
  { tag: 'TOOL 01', title: 'Rangkum AI', description: 'Ubah PDF, DOCX, TXT, atau Markdown menjadi catatan belajar yang lebih terstruktur.', href: '/documentation/rangkum', color: 'var(--blue)', icon: 'document' },
  { tag: 'TOOL 02', title: 'Jadwal Tugas', description: 'Catat deadline, lampirkan materi, dan lihat tugas mana yang perlu diselesaikan lebih dulu.', href: '/documentation/jadwal-tugas', color: 'var(--orange)', icon: 'calendar' },
];

export default function LandingPage() {
  const { data: session, status } = useSession();
  const loginLabel = status === 'authenticated' ? (session.user?.name || 'Profile') : 'Login';
  return (
    <div className="slab-root">
      <header className="slab-header">
        <div className="slab-wrap">
          <nav className="slab-nav" aria-label="Navigasi utama">
            <Link href="/" className="slab-logo"><img src="/studentlab-icon.svg" width="38" height="38" alt="" className="slab-logo-icon" />StudentLab</Link>
            <div className="slab-nav-links">
              <a href="#tools">Tools</a>
              <a href="#testimoni">Testimonials</a>
              <a href="#cara-pakai">How It Works</a>
            </div>
            <div className="slab-nav-cta"><Link href={status === 'authenticated' ? '/rangkum' : '/login'} className="slab-btn slab-btn--sm" title={status === 'authenticated' ? 'Buka workspace' : 'Login'}>{loginLabel}</Link><Link href="#tools" className="slab-btn slab-btn--solid slab-btn--sm">Lihat tools</Link></div>
          </nav>
        </div>
      </header>
      <main>
        <section className="slab-hero slab-wrap">
          <div>
            <span className="slab-eyebrow">Ruang kerja mahasiswa</span>
            <h1>KULIAH LEBIH<br />TERARAH, <span className="slab-hl">BUKAN LEBIH RUMIT.</span></h1>
            <p>StudentLab adalah ruang kerja sederhana untuk merangkum materi dan menjaga deadline kuliah tetap terlihat.</p>
            <div className="slab-hero-actions"><Link href="/login" className="slab-btn slab-btn--solid">Mulai sekarang →</Link><a href="#tools" className="slab-btn">Lihat yang tersedia</a></div>
            <p className="slab-hero-note">Dibuat untuk membantu materi dan deadline tetap mudah ditinjau.</p>
          </div>
          <aside className="slab-lab-card" aria-label="Ringkasan fungsi StudentLab">
            <div className="slab-lab-card-head"><div><span className="slab-tag">Ruang kerja</span><h3>Dua hal yang dijaga</h3></div></div>
            <div className="slab-lab-card-row"><span>Materi kuliah</span><b>Ringkas</b></div>
            <div className="slab-lab-card-row"><span>Deadline tugas</span><b>Terlihat</b></div>
            <p className="slab-lab-card-foot">Mulai dari dua alat yang memang sudah bisa digunakan.</p>
          </aside>
        </section>
        <section className="slab-section" id="tools">
          <div className="slab-wrap">
            <div className="slab-section-head"><div><span className="slab-tag">Tersedia sekarang</span><h2>Alat yang benar-benar bisa dipakai hari ini.</h2></div><p>Fitur baru diumumkan setelah siap digunakan, bukan hanya saat masih berupa rencana.</p></div>
            <div className="slab-toolkit slab-toolkit--two">
              {features.map((feature) => <Link key={feature.href} href={feature.href} className="slab-file-card slab-file-card--link"><span className="slab-file-tag">{feature.tag}</span><span className="slab-file-icon" style={{ background: feature.color }} aria-hidden="true">{feature.icon === 'document' ? <svg viewBox="0 0 24 24" fill="none"><path d="M7 3h7l4 4v14H7V3Z" /><path d="M10 12h5M10 16h5" /></svg> : <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="1" /><path d="M8 3v4M16 3v4M4 10h16M8 14h3M8 17h6" /></svg>}</span><h3>{feature.title}</h3><p>{feature.description}</p><span className="slab-card-link">Buka alat →</span></Link>)}
            </div>
          </div>
        </section>
        <TestimonialSlider />
        <section className="slab-section" id="cara-pakai"><div className="slab-wrap slab-testi"><div className="slab-note"><p>Mulai dengan satu materi atau satu deadline. Tujuannya bukan membuatmu sibuk, tetapi memberi gambaran yang lebih jelas tentang pekerjaan kuliahmu.</p></div><div className="slab-testi-side"><span className="slab-tag">Cara pakai</span><h2>Masuk, pilih alat, lalu simpan progresmu.</h2><p>Riwayat rangkuman dan tugas tersimpan pada akunmu. Kamu juga bisa membagikan pengalamanmu setelah memakai StudentLab.</p><Link href="/testimoni" className="slab-btn slab-btn--sm">Kirim testimoni</Link></div></div></section>
        <section className="slab-cta-final"><div className="slab-wrap"><span className="slab-tag">StudentLab</span><h2>SIAP MENATA<br />SEMESTERMU?</h2><Link href="/login" className="slab-btn">Mulai sekarang</Link></div></section>
      </main>
      <footer className="slab-footer"><div className="slab-wrap slab-footer-bottom"><span>© 2026 StudentLab.</span><span><Link href="/privacy">Privasi</Link> · <Link href="/terms">Syarat &amp; Ketentuan</Link> · <Link href="/documentation">Dokumentasi</Link></span></div></footer>
    </div>
  );
}
