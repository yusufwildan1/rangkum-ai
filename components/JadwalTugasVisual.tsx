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
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  React.useEffect(() => {
    const runSequence = () => {
      setDone([false, false, false]);
      const timers = items.map((_, i) =>
        setTimeout(() => setDone((prev) => prev.map((v, j) => (j === i ? true : v))), 900 + i * 1600)
      );
      timeoutRef.current = timers;
    };

    runSequence();
    const interval = setInterval(runSequence, 900 + items.length * 1600 + 1200);
    return () => {
      clearInterval(interval);
      timeoutRef.current?.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="p-3" style={{ background: '#EFE6D3' }}>
      <div className="border-2 border-[#15161B] bg-[#FFD100] px-3 py-2 flex items-center justify-between shadow-[3px_3px_0_0_#15161B] mb-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#15161B]">
          Task List
        </span>
        <span className="font-mono text-[10px] font-bold uppercase text-[#00C389]">
          ● live
        </span>
      </div>
      <p className="font-mono text-[11px] font-semibold text-[#15161B] mb-2">
        Upcoming assignments
      </p>
      <div className="flex flex-col gap-2">
        {items.map((t, i) => (
          <div
            key={t.label}
            className="flex items-center gap-3 bg-white border-2 border-[#15161B] px-3 py-2.5 shadow-[3px_3px_0_0_#15161B]"
          >
            <motion.span
              className="w-[18px] h-[18px] flex-none border-2 border-[#15161B] flex items-center justify-center text-[#15161B]"
              animate={
                done[i]
                  ? { background: '#00C389', opacity: 1 }
                  : { background: 'transparent', opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            >
              <motion.span
                initial={false}
                animate={done[i] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-bold leading-none"
              >
                ✓
              </motion.span>
            </motion.span>
            <motion.span
              className="flex-1 min-w-0 text-sm font-semibold text-[#15161B]"
              animate={
                done[i] ? { opacity: 0.5, textDecoration: 'line-through' as const } : { opacity: 1, textDecoration: 'none' as const }
              }
              transition={{ duration: 0.3 }}
            >
              {t.label}
            </motion.span>
            <span className="flex-none font-mono text-[10px] font-bold tracking-wide text-[#15161B] bg-[#2F49FF] text-white border-2 border-[#15161B] px-2 py-0.5 shadow-[2px_2px_0_0_#15161B]">
              {t.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
