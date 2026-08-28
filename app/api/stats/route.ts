import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const res = await pool.query('SELECT "total_visits" FROM "site_stats" WHERE "id" = $1', ['site']);
    const totalVisits = Number(res.rows[0]?.total_visits ?? 0);
    return NextResponse.json({ totalVisits });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
