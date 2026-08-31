'use client';

import React from 'react';
import { ScrollIcon } from '@/components/icons/NeonIcons';

interface HistoryItem {
  id: string;
  fileName: string;
  summary: string;
  createdAt: string;
}

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: (id: string) => void;
  onClearAll: () => void;
}

const History: React.FC<Props> = ({ history, onSelect, onClear, onClearAll }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 p-5 glass">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-[--ink] flex items-center gap-2">
          <ScrollIcon size={22} /> Riwayat Rangkuman
        </h2>
        <button
          onClick={onClearAll}
          className="px-3 py-1 text-sm glass-soft font-bold uppercase tracking-wide text-[#E8352B] hover:bg-[#E8352B] hover:text-white transition"
        >
          Hapus semua
        </button>
      </div>
      <ul className="divide-y-2 divide-[--ink]">
        {history.map((item) => (
          <li key={item.id} className="py-3 flex justify-between items-start gap-3">
            <button
              onClick={() => onSelect(item)}
              className="text-left flex-1 group"
            >
              <p className="font-bold text-[--ink] group-hover:text-[#2F49FF] transition">
                {item.fileName}
              </p>
              <p className="text-sm text-[--ink-soft]">
                {new Date(item.createdAt).toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-[--ink] line-clamp-2">
                {item.summary.slice(0, 150)}...
              </p>
            </button>
            <button
              onClick={() => onClear(item.id)}
              className="text-[#E8352B] hover:text-black text-sm shrink-0 font-bold"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
