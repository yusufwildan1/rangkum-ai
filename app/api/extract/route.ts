import { NextRequest, NextResponse } from 'next/server';
import { extractText } from '@/lib/fileParser';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 });
    }

    const text = await extractText(file);
    return NextResponse.json({ text, fileName: file.name });
  } catch (error: any) {
    console.error('Extract error:', error);
    return NextResponse.json(
      { error: 'Gagal mengekstrak teks: ' + (error?.message || 'unknown') },
      { status: 500 }
    );
  }
}
