'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const COLORS = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-yellow)', 'var(--neon-green)'];

export default function BlobBackdrop() {
  const pathname = usePathname();
  const seed = hashString(pathname || '/');

  return (
    <div className="brute-blobs" aria-hidden="true">
      {COLORS.map((color, i) => {
        const size = 90 + ((seed >> (i * 3 + 1)) % 55);
        const rotate = ((seed >> (i * 2 + 3)) % 24) - 12;
        const top = (seed % (i * 17 + 15)) + i * 13; // tersebar vertikal di seluruh tinggi
        const side = (seed >> (i * 5 + 2)) % 2; // 0 = kiri, 1 = kanan
        const style: React.CSSProperties = {
          background: color,
          width: size,
          height: size,
          top: `${top}%`,
          rotate: `${rotate}deg`,
        };
        // hanya pinggir: dekat sisi kiri atau kanan, sebagian menggantung ke luar tepi
        if (side === 0) {
          style.left = `${(-(seed % 5) + ((seed >> 6) % 4))}%`;
        } else {
          style.right = `${(-(seed % 5) + ((seed >> 7) % 4))}%`;
        }
        return <span key={i} className="blob-fixed" style={style} />;
      })}
    </div>
  );
}
