import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { extractText } from '@/lib/fileParser';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const rate = checkRateLimit(`extract:${session.user.id}`, 15, 60_000);
    if (!rate.allowed) {
      return NextResponse.json({ error: 'Terlalu banyak unggahan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    const text = await extractText(file);
    return NextResponse.json({ text, fileName: file.name });
  } catch (error: unknown) {
    console.error('Extract error:', error);
    return NextResponse.json({ error: 'Gagal mengekstrak teks dari file. Periksa format dan ukuran file.' }, { status: 500 });
  }
}
