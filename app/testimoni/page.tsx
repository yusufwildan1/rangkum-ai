import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import TestimonialForm from '@/components/TestimonialForm';
import { auth } from '@/lib/auth';

export const metadata = { title: 'StudentLab - Kirim Testimoni' };

export default async function TestimoniPage() {
  if (!(await auth())?.user?.id) redirect('/login');
  return <><Header /><main className="min-h-screen p-4 md:p-6"><div className="max-w-2xl mx-auto"><div className="text-center mb-8"><h1 className="hero-title"><span className="swash"><span className="squiggle">Bagikan</span></span>{' '}<span className="rot">Pengalamanmu</span></h1><p className="hero-note mt-3">Kiriman akan ditinjau sebelum ditampilkan di beranda.</p></div><TestimonialForm /></div></main></>;
}
