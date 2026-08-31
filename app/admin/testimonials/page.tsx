import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import TestimonialReview from '@/components/TestimonialReview';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/admin';

export const metadata = { title: 'StudentLab - Moderasi Testimoni' };

export default async function AdminTestimonialsPage() {
  const session = await auth();
  if (!session?.user?.id || !isAdminEmail(session.user.email)) redirect('/');
  return <><Header /><main className="min-h-screen p-4 md:p-6"><div className="max-w-3xl mx-auto"><div className="mb-8"><h1 className="hero-title">Moderasi Testimoni</h1><p className="hero-note mt-3">Setujui hanya testimoni yang pantas dan telah memberi persetujuan publikasi.</p></div><TestimonialReview /></div></main></>;
}
