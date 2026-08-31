'use client';

import { FormEvent, useState } from 'react';

export default function TestimonialForm() {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true); setMessage('');
    const data = new FormData(event.currentTarget);
    const response = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ displayName: data.get('displayName'), studyProgram: data.get('studyProgram'), content: data.get('content'), rating: Number(data.get('rating')) || null, consent: data.get('consent') === 'on' }) });
    const result = await response.json();
    setSending(false);
    if (response.ok) { event.currentTarget.reset(); setMessage('Terima kasih. Testimonimu sedang menunggu peninjauan.'); }
    else setMessage(result.error || 'Testimoni belum dapat dikirim.');
  }

  return <form onSubmit={submit} className="glass p-6 space-y-4">
    <label className="block font-bold">Nama yang ditampilkan<input name="displayName" required maxLength={60} placeholder="Contoh: Naila R." className="testimonial-input" /></label>
    <label className="block font-bold">Program studi / kampus <span className="font-normal">(opsional)</span><input name="studyProgram" maxLength={100} placeholder="Contoh: Teknik Informatika" className="testimonial-input" /></label>
    <label className="block font-bold">Rating <span className="font-normal">(opsional)</span><select name="rating" defaultValue="" className="testimonial-input"><option value="">Tidak menampilkan rating</option>{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} dari 5</option>)}</select></label>
    <label className="block font-bold">Testimoni<textarea name="content" required minLength={20} maxLength={800} rows={6} placeholder="Ceritakan pengalamanmu memakai StudentLab..." className="testimonial-input" /></label>
    <label className="flex gap-3 items-start text-sm"><input name="consent" type="checkbox" required className="mt-1" />Saya mengizinkan StudentLab menampilkan nama, program studi (jika diisi), rating, dan isi testimoni ini secara publik setelah ditinjau.</label>
    <button disabled={sending} className="btn-fill px-5 py-3 disabled:opacity-50">{sending ? 'Mengirim...' : 'Kirim testimoni'}</button>
    {message && <p role="status" className="text-sm font-semibold">{message}</p>}
  </form>;
}
