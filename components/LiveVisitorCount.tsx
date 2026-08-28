'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function LiveVisitorCount() {
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState(0);
  const [live, setLive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch('/api/stats', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setCount(Number(data.totalVisits ?? 0));
      } catch {
        /* ignore polling errors */
      }
    }

    (async () => {
      try {
        const res = await fetch('/api/stats/visit', { method: 'POST', cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setCount(Number(data.totalVisits ?? 0));
            setLive(true);
          }
        }
      } catch {
        /* if visit fails, still try reading */
      }
      if (cancelled) return;
      refresh();
    })();

    const interval = setInterval(refresh, 5000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const from = countRef.current;
      const to = count;
      const dur = Math.min(1200, Math.max(400, Math.abs(to - from) * 60));
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const v = Math.round(from + (to - from) * eased);
        countRef.current = v;
        setDisplay(v);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <div className="stat" ref={ref}>
      <strong>{display}</strong>
      <span>Kunjungan {live && <em className="stat-live">● LIVE</em>}</span>
    </div>
  );
}
