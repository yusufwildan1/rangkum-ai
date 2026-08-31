'use client';

import { useEffect, useState } from 'react';

type Testimonial = { id: string; displayName: string; studyProgram: string | null; content: string; rating: number | null };

export default function TestimonialSlider() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials').then((res) => (res.ok ? res.json() : [])).then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) return null;
  const item = items[active];
  const move = (direction: number) => setActive((current) => (current + direction + items.length) % items.length);

  return (
    <section className="slab-section" id="testimoni" aria-label="Testimoni pengguna">
      <div className="slab-wrap">
        <div className="slab-section-head"><div><span className="slab-tag">Cerita pengguna</span><h2>Pengalaman yang dibagikan pengguna StudentLab.</h2></div><p>Setiap kiriman ditinjau sebelum ditampilkan.</p></div>
        <div className="slab-testimonial-card">
          <span className="slab-file-tag">TESTIMONI {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          {item.rating && <p className="slab-rating" aria-label={`Rating ${item.rating} dari 5`}>{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</p>}
          <blockquote>“{item.content}”</blockquote>
          <p className="slab-testimonial-author">{item.displayName}{item.studyProgram ? ` · ${item.studyProgram}` : ''}</p>
          {items.length > 1 && <div className="slab-slider-controls"><button type="button" onClick={() => move(-1)} aria-label="Testimoni sebelumnya">←</button><span aria-live="polite">{active + 1} / {items.length}</span><button type="button" onClick={() => move(1)} aria-label="Testimoni berikutnya">→</button></div>}
        </div>
      </div>
    </section>
  );
}
