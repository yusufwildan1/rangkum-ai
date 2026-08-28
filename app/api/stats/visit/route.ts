import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export const runtime = 'nodejs';

const COOKIE = 'sl_visited';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export async function POST(req: NextRequest) {
  try {
    const cookieAlready = req.cookies.get(COOKIE)?.value === '1';
    if (!cookieAlready) {
      await pool.query(
        `INSERT INTO "site_stats" ("id", "total_visits", "updatedAt")
         VALUES ('site', 1, CURRENT_TIMESTAMP)
         ON CONFLICT ("id")
         DO UPDATE SET "total_visits" = "site_stats"."total_visits" + 1,
                       "updatedAt" = CURRENT_TIMESTAMP`
      );
    }

    const res = await pool.query('SELECT "total_visits" FROM "site_stats" WHERE "id" = $1', ['site']);
    const totalVisits = Number(res.rows[0]?.total_visits ?? 0);

    const response = NextResponse.json({ totalVisits });
    if (!cookieAlready) {
      response.cookies.set(COOKIE, '1', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: COOKIE_MAX_AGE,
      });
    }
    return response;
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
