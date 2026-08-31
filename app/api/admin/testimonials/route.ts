import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/admin';
import { pool } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

async function adminSession() {
  const session = await auth();
  return session?.user?.id && isAdminEmail(session.user.email) ? session : null;
}

export async function GET() {
  try {
    if (!(await adminSession())) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const result = await pool.query(
      `SELECT id, "displayName", "studyProgram", content, rating, status, "createdAt"
       FROM testimonials ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, "createdAt" DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Admin testimonials error:', error);
    return NextResponse.json({ error: 'Data testimoni belum tersedia.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await adminSession();
    if (!session?.user?.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    const rate = checkRateLimit(`admin:testimonials:${session.user.id}`, 40, 60_000);
    if (!rate.allowed) return NextResponse.json({ error: 'Terlalu banyak perubahan. Coba lagi sebentar.' }, { status: 429 });
    const { id, status } = await req.json();
    if (typeof id !== 'string' || !['approved', 'rejected'].includes(status)) return NextResponse.json({ error: 'Permintaan tidak valid.' }, { status: 400 });
    await pool.query(`UPDATE testimonials SET status = $1, "reviewedAt" = CURRENT_TIMESTAMP WHERE id = $2`, [status, id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Review testimonial error:', error);
    return NextResponse.json({ error: 'Status testimoni belum dapat diperbarui.' }, { status: 500 });
  }
}
