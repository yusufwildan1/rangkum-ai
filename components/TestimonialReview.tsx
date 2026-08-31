'use client';

import { useEffect, useState } from 'react';

type Item = { id: string; displayName: string; studyProgram: string | null; content: string; rating: number | null; status: 'pending' | 'approved' | 'rejected'; createdAt: string };

export default function TestimonialReview() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState('');
  useEffect(() => { fetch('/api/admin/testimonials').then((res) => res.json()).then((data) => Array.isArray(data) ? setItems(data) : setMessage(data.error || 'Data tidak tersedia.')).catch(() => setMessage('Data tidak tersedia.')); }, []);
  async function review(id: string, status: 'approved' | 'rejected') {
    const response = await fetch('/api/admin/testimonials', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    if (!response.ok) return setMessage('Status belum dapat diperbarui.');
    setItems((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  }
  if (message) return <p className="glass-soft p-4">{message}</p>;
  if (!items.length) return <p className="glass-soft p-4">Belum ada testimoni.</p>;
  return <div className="space-y-4">{items.map((item) => <article key={item.id} className="glass p-5"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold text-lg">{item.displayName}</h2><p className="text-sm text-[--ink-soft]">{item.studyProgram || 'Tanpa program studi'} · {new Date(item.createdAt).toLocaleDateString('id-ID')}</p></div><span className="px-2 py-1 border-2 border-[--ink] h-fit font-bold text-sm">{item.status}</span></div>{item.rating && <p className="mt-3 text-[#FF5A1F]">{'★'.repeat(item.rating)}</p>}<p className="mt-3 leading-relaxed">{item.content}</p>{item.status === 'pending' && <div className="mt-4 flex gap-3"><button onClick={() => review(item.id, 'approved')} className="btn-fill px-4 py-2">Setujui</button><button onClick={() => review(item.id, 'rejected')} className="btn-line px-4 py-2">Tolak</button></div>}</article>)}</div>;
}
