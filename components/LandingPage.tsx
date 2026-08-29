'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LiveVisitorCount from '@/components/LiveVisitorCount';

// ===== count-up untuk stats (dari portfolio asli) =====
function useCountUp(end: number, ref: React.RefObject<HTMLDivElement>, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * end));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, ref, duration]);
  return val;
}

// ===== skill bar animasi (dari portfolio asli) =====
function SkillBar({ label, value, color, glow }: { label: string; value: number; color: string; glow: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const dur = 3000;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setPct(Math.round(eased * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <div className="bar-row" ref={ref}>
      <span className="bar-label">{label}</span>
      <div className="bar">
        <div className="bar-fill" style={{ background: color, width: `${pct}%`, '--bar-glow': glow } as React.CSSProperties}></div>
      </div>
      <span className="bar-val">{pct}%</span>
    </div>
  );
}

// ===== icon skill (dari portfolio asli) =====
function SkillIcon({ icon, color, glow }: { icon: string; color: string; glow: string }) {
  const paths: Record<string, React.ReactNode> = {
    design: (
      <>
        <circle cx="12" cy="17" r="5" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M12 12V5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9.5 7.5 12 5.5l2.5 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="18" r="1" fill={color} />
      </>
    ),
    web: (
      <>
        <rect x="3.5" y="5" width="17" height="13" rx="2.5" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M3.5 9.5h17" stroke={color} strokeWidth="1.5" />
        <path d="M6 7h.01M8 7h.01M10 7h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    motion: (
      <>
        <path d="M3 12l3.2 3.2L12 9l3.8 3.8L21 6.5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5.2a.4.4 0 1 1-.8 0 .4.4 0 0 1 .8 0z" fill={color} />
        <path d="M18.5 12.5l2 2-2 2" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" className="skill-icon" style={{ filter: `drop-shadow(0 0 6px ${glow})`, color }} fill="none" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

// ===== mock preview proyek (dari portfolio asli) =====

function ProjectArtJ4() {
  const summaryWords = ['Rangkuman', 'AI', 'mengubah', 'dokumen', 'menjadi', 'catatan', 'ringkas', '&', 'terstruktur', 'untuk', 'dipelajari.'];
  return (
    <div className="j4-app">
      <div className="j4-top">
        <span className="j4-dot"></span>
        <span className="j4-name">Rangkum AI</span>
        <span className="j4-live">● live</span>
      </div>
      <div className="j4-ai-bar">
        <span className="j4-ai-bar-label">✨ Merangkum dokumen...</span>
        <div className="j4-ai-bar-track"><span className="j4-ai-bar-fill"></span></div>
      </div>
      <div className="j4-summary">
        <p className="j4-summary-line">
          {summaryWords.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.14 }}
              className="j4-w"
            >
              {w}{' '}
            </motion.span>
          ))}
        </p>
      </div>
      <div className="j4-progress">
        <div className="j4-progress-fill">
          <span className="j4-progress-label">Rangkuman 68%</span>
        </div>
      </div>
    </div>
  );
}

function ProjectArtUpcoming({ color }: { color: string }) {
  return (
    <div className="up-app">
      <div className="up-top">
        <span className="up-dot"></span>
        <span className="up-name">COMING SOON</span>
      </div>
      <div className="up-body">
        <span className="up-spinner" style={{ borderTopColor: color }}></span>
        <p className="up-text" style={{ color }}>Segera hadir</p>
        <div className="up-bars" style={{ ['--pc' as string]: color } as React.CSSProperties}>
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}

const tugasItems = [
  { label: 'Makalah Ekonomi', due: 'Sen 12' },
  { label: 'Latihan Kalkulus', due: 'Rab 14' },
  { label: 'PPT Bahasa Inggris', due: 'Jum 16' },
];

function ProjectArtTugas() {
  return (
    <div className="j4-app" style={{ ['--pc' as string]: 'var(--neon-pink)' } as React.CSSProperties}>
      <div className="j4-top">
        <span className="j4-dot"></span>
        <span className="j4-name">Jadwal Tugas</span>
        <span className="j4-live">● live</span>
      </div>
      <div className="j4-heading">Tugas Terdekat</div>
      {tugasItems.map((t, i) => (
        <div className="j4-task" key={t.label}>
          <span
            className="j4-check"
            style={{ animation: `taskCheck 4.5s ease-in-out ${i * 1.5}s infinite` }}
          ></span>
          <span
            className="j4-task-label"
            style={{ animation: `taskDim 4.5s ease-in-out ${i * 1.5}s infinite` }}
          >
            {t.label}
          </span>
          <span className="j4-due">{t.due}</span>
        </div>
      ))}
    </div>
  );
}

// ===== data (dari portfolio asli + integrasi tools) =====
const statsDefs = [
  { end: 2, suffix: '+', label: 'Tahun Pengalaman' },
  { end: 2, suffix: '', label: 'Proyek (Demo)' },
];

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const val = useCountUp(end, ref);
  return (
    <div className="stat" ref={ref}>
      <strong>{val}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

const skills = [
  { name: 'Desain Visual', icon: 'design', note: 'komposisi', color: 'var(--neon-cyan)', glow: 'rgba(34, 224, 255, 0.5)', rows: [{ k: 'Branding', v: 90 }, { k: 'Ilustrasi', v: 80 }, { k: 'Tipografi', v: 95 }] },
  { name: 'Web Development', icon: 'web', note: 'kode', color: 'var(--neon-pink)', glow: 'rgba(255, 79, 216, 0.5)', rows: [{ k: 'HTML/CSS', v: 95 }, { k: 'JavaScript', v: 88 }, { k: 'React', v: 85 }] },
  { name: 'Motion & Interaksi', icon: 'motion', note: 'gerak', color: 'var(--neon-green)', glow: 'rgba(57, 255, 176, 0.5)', rows: [{ k: 'Animasi CSS', v: 92 }, { k: 'WebGL', v: 70 }, { k: 'UX Flow', v: 86 }] },
];

// Proyek: 01 J4Students = gerbang akses tools (Rangkum AI / Jadwal Tugas)
const projects = [
  {
    num: '01',
    title: 'J4Students',
    desc: 'Tools belajar untuk mahasiswa — membantu mengelola materi, tugas, dan jadwal dalam satu tempat.',
    tags: ['Belajar', 'Mahasiswa'],
    color: 'var(--neon-cyan)',
    glow: 'rgba(34, 224, 255, 0.35)',
    kind: 'j4',
    href: '/rangkum',
  },
  {
    num: '02',
    title: 'Tugas',
    desc: 'Kelola tugas kuliah — tambah deadline, tandai selesai, dan rapiin jadwalmu dalam satu tempat.',
    tags: ['Deadline', 'Checklist'],
    color: 'var(--neon-pink)',
    glow: 'rgba(255, 79, 216, 0.35)',
    kind: 'tugas',
    href: '/jadwal-tugas',
  },
  {
    num: '03',
    title: 'Coming Soon',
    desc: 'Segera hadir.',
    tags: ['Segera'],
    color: 'var(--neon-green)',
    glow: 'rgba(57, 255, 176, 0.35)',
    kind: 'up',
  },
];

const toolsNav = [
  { href: '#tentang', label: 'About' },
  { href: '#karya', label: 'Portfolio' },
  { href: '#kontak', label: 'Contact' },
];

function Marquee({ words }: { words: string[] }) {
  const row = (key: string) => (
    <span className="marquee-content" key={key}>
      {words.map((w) => (
        <span key={key + w} className="mq-item">{w} <span className="mq-star">✳</span></span>
      ))}
    </span>
  );
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}

// ===== Documentation (kartu bergaya portfolio, menuju halaman dokumentasi per tools) =====
const docs = [
  {
    title: 'Rangkum AI',
    desc: 'Baca dokumentasi lengkap Rangkum AI — cara mengunggah, merangkum, mengekspor, hingga tips hasil terbaik.',
    tags: ['Panduan', 'Generate'],
    color: 'var(--neon-cyan)',
    glow: 'rgba(34, 224, 255, 0.35)',
    href: '/documentation/rangkum',
    art: <ProjectArtJ4 />,
  },
  {
    title: 'Jadwal Tugas',
    desc: 'Baca dokumentasi lengkap Jadwal Tugas — kelola deadline, tandai selesai, hingga tips menjaga produktivitas.',
    tags: ['Panduan', 'Kelola'],
    color: 'var(--neon-pink)',
    glow: 'rgba(255, 79, 216, 0.35)',
    href: '/documentation/jadwal-tugas',
    art: <ProjectArtTugas />,
  },
];

export default function LandingPage() {
  const marqueeWords = ['Suka bermain warna', 'Desain kreatif', 'Cerita dibalik layar', 'Tanpa batas imajinasi'];

  return (
    <div className="j4-app-root relative">
      <div className="nk-container">
        {/* Topbar portfolio asli (sejajar dengan konten, seperti default portfolio) */}
        <header className="topbar">
          <a href="#beranda" className="logo">
            <span className="logo-dot"></span> Zyn<span className="logo-star">*</span>
          </a>
          <nav className="nav">
            {toolsNav.map((n) => (
              <a key={n.label} href={n.href} className="nav-link">{n.label}</a>
            ))}
          </nav>
          <Link href="/rangkum" className="nav-cta">Tools <span>→</span></Link>
        </header>

        <main>
          {/* Hero (isi asli) */}
          <section id="beranda" className="hero">
            <div className="hero-top">
              <p className="tag"><span className="tag-dot"></span> Creative Developer</p>
            </div>

            <div className="hero-ttl">
              <h1 className="hero-title">
                <span className="swash"><span className="squiggle">Desain</span></span>{' '}
                yang <br />
                <span className="u-underline">bercerita</span>,
                <br />
                <span className="hing">kode yang</span>{' '}
                <span className="rot">berbicara.</span>
              </h1>
              <p className="hero-note text-[4.5rem] leading-none">pecut ai semaksimal mungkin</p>
            </div>

            <div className="hero-bottom">
              <p className="hero-desc">
                Hai, aku <b>Zyn</b> — membantu merek dan startup mewujudkan
                ide menjadi pengalaman digital yang ceria, berkarakter, dan tak terlupakan.
              </p>
              <div className="hero-actions">
                <a href="#karya" className="btn-fill">See my work <span>↓</span></a>
                <a href="#kontak" className="btn-line">Say hi <span>→</span></a>
              </div>
            </div>
          </section>
        </main>

        {/* Marquee */}
        <Marquee words={marqueeWords} />

        {/* Stats */}
        <section className="stats" style={{ marginTop: 76 }}>
          {statsDefs.map((s) => <StatItem key={s.label} {...s} />)}
          <LiveVisitorCount />
        </section>

        {/* Tentang */}
        <section id="tentang" className="section">
          <div className="section-head">
            <span className="section-num">01</span>
            <h2 className="section-title">About me</h2>
          </div>
          <div className="about-grid">
            <div className="about-card neon-cyan">
              <p>
                Aku percaya <span className="u-underline">desain yang baik itu
                seperti teman lama</span> — akrab, hangat, dan membuatmu betah.
                Aku mencampur seni visual dengan teknikal yang andal supaya
                setiap piksel punya alasan hadir.
              </p>
            </div>
            <div className="about-card neon-pink">
              <p>
                Dari <b>sketsa di atas kertas</b> sampai <b>kode di layar</b>,
                aku menikmati seluruh proses. Hasilnya: website yang tidak
                hanya tampil cantik, tapi juga terasa hidup.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="section">
          <div className="section-head">
            <span className="section-num">02</span>
            <h2 className="section-title">Skills</h2>
          </div>
          <div className="skill-cols">
            {skills.map((s) => (
              <div key={s.name} className="skill-card" style={{ borderColor: s.color }}>
                <div className="skill-head">
                  <SkillIcon icon={s.icon} color={s.color} glow={s.glow} />
                  <h3>{s.name}</h3>
                  <span className="skill-note">{s.note}</span>
                </div>
                <div className="skill-rows">
                  {s.rows.map((r) => <SkillBar key={r.k} label={r.k} value={r.v} color={s.color} glow={s.glow} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Karya / Portfolio */}
        <section id="karya" className="section">
          <div className="section-head">
            <span className="section-num">03</span>
            <h2 className="section-title">Portfolio</h2>
          </div>
          <div className="projects">
            {projects.map((p) => (
              <div key={p.num} className="project" style={{ '--pc': p.color, '--pc-glow': p.glow } as React.CSSProperties}>
                <div className={`project-art ${p.kind === 'j4' ? 'project-art-j4' : p.kind === 'tugas' ? 'project-art-tugas' : 'project-art-up'}`}>
                  {p.kind === 'j4' ? <ProjectArtJ4 /> : p.kind === 'tugas' ? <ProjectArtTugas /> : <ProjectArtUpcoming color={p.color} />}
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t} className="ptag">{t}</span>)}
                </div>
                {p.href ? (
                  <Link href={p.href} className="project-link" style={{ marginTop: 'auto' }}>buka tools <span>→</span></Link>
                ) : (
                  <span className="project-link" style={{ cursor: 'default' }}>lihat studi kasus <span>→</span></span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Documentation */}
        <section id="dokumentasi" className="section">
          <div className="section-head">
            <span className="section-num">04</span>
            <h2 className="section-title">Documentation</h2>
          </div>
          <p className="section-sub">
            Pilih tools untuk membaca dokumentasi lengkap &amp; apa yang bisa dibuat.
          </p>
          <div className="projects">
            {docs.map((d) => (
              <div key={d.title} className="project" style={{ '--pc': d.color, '--pc-glow': d.glow } as React.CSSProperties}>
                <div className="project-art project-art-j4">{d.art}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <div className="project-tags">
                  {d.tags.map((t) => <span key={t} className="ptag">{t}</span>)}
                </div>
                <Link href={d.href} className="project-link" style={{ marginTop: 'auto' }}>buka dokumentasi <span>→</span></Link>
              </div>
            ))}
          </div>
        </section>

        {/* Kontak */}
        <section id="kontak" className="section">
          <div className="section-head">
            <span className="section-num">05</span>
            <h2 className="section-title">Contact</h2>
          </div>
          <div className="contact-card">
            <p className="contact-big">
              Punya ide seru? <br />
              Ayo wujudkan <span className="u-underline">bersama.</span>
            </p>
            <a href="mailto:zyn@gmail.com" className="btn-fill email-btn">
              zyn@gmail.com <span>↗</span>
            </a>
            <div className="socials">
              <a href="#" className="soc">GitHub</a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="nk-container">
        <div className="footer">
          <span>© 2026 Zyn</span>
          <span className="footer-heart">dibuat dengan ♥ &amp; banyak kopi</span>
          <nav className="footer-links" aria-label="Footer">
            <a href="/privacy">Privasi</a>
            <span className="footer-links-sep">·</span>
            <a href="/terms">Syarat &amp; Ketentuan</a>
          </nav>
          <a href="#beranda" className="footer-top">ke atas ↑</a>
        </div>
      </footer>
    </div>
  );
}
