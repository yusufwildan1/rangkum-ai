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
    <div className="mt-8 p-5 glass rounded-3xl">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <ScrollIcon size={22} /> Riwayat Rangkuman
        </h2>
        <button
          onClick={onClearAll}
          className="px-3 py-1 text-sm rounded-full glass-soft text-red-500 hover:text-red-600 hover:scale-105 transition"
        >
          Hapus semua
        </button>
      </div>
      <ul className="divide-y divide-white/20 dark:divide-gray-700/40">
        {history.map((item) => (
          <li key={item.id} className="py-3 flex justify-between items-start gap-3">
            <button
              onClick={() => onSelect(item)}
              className="text-left flex-1 group"
            >
              <p className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-500 transition">
                {item.fileName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.createdAt).toLocaleString('id-ID')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {item.summary.slice(0, 150)}...
              </p>
            </button>
            <button
              onClick={() => onClear(item.id)}
              className="text-red-500 hover:text-red-700 text-sm shrink-0"
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
