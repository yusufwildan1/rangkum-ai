import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const res = await pool.query(
    `SELECT id, title, "dueDate", done, "createdAt"
       FROM tasks
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC`,
    [userId]
  );
  const tasks = res.rows.map((r) => ({
    ...r,
    done: Boolean(r.done),
  }));
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  let body: { title?: string; dueDate?: string; done?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
  const title = (body.title ?? '').trim();
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }
  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO tasks (id, "userId", title, "dueDate", done)
     VALUES ($1, $2, $3, $4, $5)`,
    [id, userId, title, body.dueDate ?? null, body.done ? true : false]
  );
  return NextResponse.json({ id, title, dueDate: body.dueDate ?? null, done: body.done ? true : false });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
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
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  await pool.query(`DELETE FROM tasks WHERE id = $1 AND "userId" = $2`, [id, userId]);
  return NextResponse.json({ ok: true });
}
