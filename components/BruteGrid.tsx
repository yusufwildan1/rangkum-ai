'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const OFFSETS = [0, 96, 192, 288, 384];

export default function BruteGrid() {
  const pathname = usePathname();

  const seed = hashString(pathname || '/');
  const ox = OFFSETS[seed % OFFSETS.length];
  const oy = OFFSETS[(seed >> 3) % OFFSETS.length];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="brute-grid"
        style={{ backgroundPosition: `${ox}px ${oy}px` }}
        initial={{ opacity: 0, scale: 1.04, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -24 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </AnimatePresence>
  );
}
