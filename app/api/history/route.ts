import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const res = await pool.query(
    `SELECT id, "fileName", summary, "createdAt"
       FROM histories
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC`,
    [userId]
  );
  return NextResponse.json(res.rows);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const rate = checkRateLimit(`history:write:${userId}`, 30, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Terlalu banyak perubahan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  let body: { fileName?: string; summary?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  const summary = (body.summary ?? '').trim();
  if (!summary) {
    return NextResponse.json({ error: 'Summary is required' }, { status: 400 });
  }
  const fileName = (body.fileName ?? 'dokumen').trim();
  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO histories (id, "userId", "fileName", summary)
     VALUES ($1, $2, $3, $4)`,
    [id, userId, fileName, summary]
  );
  return NextResponse.json({ id, fileName, summary, createdAt: new Date().toISOString() });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const rate = checkRateLimit(`history:write:${userId}`, 30, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Terlalu banyak perubahan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const id = req.nextUrl.searchParams.get('id');
  const all = req.nextUrl.searchParams.get('all');

  if (id) {
    await pool.query(`DELETE FROM histories WHERE id = $1 AND "userId" = $2`, [id, userId]);
  } else if (all === '1') {
    await pool.query(`DELETE FROM histories WHERE "userId" = $1`, [userId]);
  } else {
    return NextResponse.json({ error: 'Missing id or all' }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
