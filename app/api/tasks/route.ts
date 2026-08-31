import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/db';
import { extractText } from '@/lib/fileParser';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const res = await pool.query(
    `SELECT id, title, "dueDate", done, "fileName", content, "createdAt"
       FROM tasks
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC`,
    [userId]
  );
  const tasks = res.rows.map((r) => ({
    id: r.id,
    title: r.title,
    dueDate: r.dueDate,
    done: Boolean(r.done),
    fileName: r.fileName,
    content: r.content,
    createdAt: r.createdAt,
  }));
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const rate = checkRateLimit(`tasks:write:${userId}`, 40, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Terlalu banyak perubahan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });

  let title: string;
  let dueDate: string | null = null;
  let fileName: string | null = null;
  let content: string | null = null;

  const contentType = req.headers.get('content-type') || '';
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    title = String(form.get('title') ?? '').trim();
    const dd = String(form.get('dueDate') ?? '');
    dueDate = dd ? dd : null;
    const file = form.get('file') as File | null;
    if (file && file.size > 0) {
      const text = await extractText(file);
      fileName = file.name;
      content = text || null;
    }
  } else {
    let body: { title?: string; dueDate?: string; done?: boolean };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
    title = (body.title ?? '').trim();
    dueDate = body.dueDate ?? null;
  }

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO tasks (id, "userId", title, "dueDate", done, "fileName", content)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [id, userId, title, dueDate, false, fileName, content]
  );
  return NextResponse.json({
    id,
    title,
    dueDate,
    done: false,
    fileName,
    content,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const rate = checkRateLimit(`tasks:write:${userId}`, 40, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Terlalu banyak perubahan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  let body: { id?: string; title?: string; dueDate?: string | null; done?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  if (!body.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  if (typeof body.done === 'boolean') {
    await pool.query(`UPDATE tasks SET done = $1 WHERE id = $2 AND "userId" = $3`, [
      body.done,
      body.id,
      userId,
    ]);
  }

  if (body.title !== undefined || body.dueDate !== undefined) {
    const cur = await pool.query(
      `SELECT title, "dueDate" FROM tasks WHERE id = $1 AND "userId" = $2`,
      [body.id, userId]
    );
    const current = cur.rows[0];
    if (current) {
      const title = body.title !== undefined ? body.title.trim() : current.title;
      const dueDate =
        body.dueDate !== undefined
          ? (body.dueDate ?? null)
          : current.dueDate;
      await pool.query(`UPDATE tasks SET title = $1, "dueDate" = $2 WHERE id = $3 AND "userId" = $4`, [
        title,
        dueDate,
        body.id,
        userId,
      ]);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const rate = checkRateLimit(`tasks:write:${userId}`, 40, 60_000);
  if (!rate.allowed) return NextResponse.json({ error: 'Terlalu banyak perubahan. Coba lagi sebentar.' }, { status: 429, headers: { 'Retry-After': String(rate.retryAfter) } });
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  await pool.query(`DELETE FROM tasks WHERE id = $1 AND "userId" = $2`, [id, userId]);
  return NextResponse.json({ ok: true });
}
