'use client';

import { useRouter } from 'next/navigation';
import LandingHero from '@/components/LandingHero';

export default function Home() {
  const router = useRouter();

  return <LandingHero onStart={() => router.push('/about')} />;
}
