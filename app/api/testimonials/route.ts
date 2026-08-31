import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, "displayName", "studyProgram", content, rating, "createdAt"
       FROM testimonials WHERE status = 'approved'
       ORDER BY "reviewedAt" DESC NULLS LAST, "createdAt" DESC LIMIT 12`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Public testimonials error:', error);
    return NextResponse.json({ error: 'Testimoni belum tersedia.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const rate = checkRateLimit(`testimonials:${session.user.id}`, 3, 60 * 60 * 1000);
    if (!rate.allowed) return NextResponse.json({ error: 'Kamu sudah mengirim beberapa testimoni. Coba lagi nanti.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });

    const body = await req.json();
    const displayName = typeof body.displayName === 'string' ? body.displayName.trim().slice(0, 60) : '';
    const studyProgram = typeof body.studyProgram === 'string' ? body.studyProgram.trim().slice(0, 100) : null;
    const content = typeof body.content === 'string' ? body.content.trim().slice(0, 800) : '';
    const rating = Number.isInteger(body.rating) && body.rating >= 1 && body.rating <= 5 ? body.rating : null;

    if (!displayName || content.length < 20 || body.consent !== true) {
      return NextResponse.json({ error: 'Lengkapi nama, testimoni minimal 20 karakter, dan persetujuan publikasi.' }, { status: 400 });
    }
    const id = crypto.randomUUID();
    await pool.query(
      `INSERT INTO testimonials (id, "userId", "displayName", "studyProgram", content, rating, consent)
       VALUES ($1, $2, $3, $4, $5, $6, true)`,
      [id, session.user.id, displayName, studyProgram || null, content, rating]
    );
    return NextResponse.json({ id, status: 'pending' }, { status: 201 });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json({ error: 'Testimoni belum dapat dikirim. Coba lagi.' }, { status: 500 });
  }
}
