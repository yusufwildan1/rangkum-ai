'use client';

import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { label: 'Economics Essay', due: 'Mon 12' },
  { label: 'Calculus Exercise', due: 'Wed 14' },
  { label: 'English PPT', due: 'Fri 16' },
];

export default function JadwalTugasVisual() {
  const [done, setDone] = React.useState<boolean[]>([false, false, false]);

  React.useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setDone((prev) => prev.map((v, j) => (j === i ? true : v))), 900 + i * 1600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="j4-app" style={{ height: 200 }}>
      <div className="j4-top">
        <span className="j4-dot" style={{ background: 'var(--neon-pink)', boxShadow: '0 0 12px rgba(255,79,216,0.6)' }}></span>
        <span className="j4-name">Task List</span>
        <span className="j4-live">● live</span>
      </div>
      <div className="j4-heading">Upcoming assignments</div>
      {items.map((t, i) => (
        <div className="j4-task" key={t.label}>
          <motion.span
            className="j4-check j4-check-static"
            animate={done[i] ? { background: 'var(--neon-green)', boxShadow: '0 0 10px rgba(57,255,176,0.8)' } : { background: 'transparent', boxShadow: 'none' }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="j4-task-label"
            animate={done[i] ? { opacity: 0.55, textDecoration: 'line-through' } : { opacity: 1, textDecoration: 'none' }}
            transition={{ duration: 0.3 }}
          >
            {t.label}
          </motion.span>
          <span className="j4-due">{t.due}</span>
        </div>
      ))}
    </div>
  );
}
