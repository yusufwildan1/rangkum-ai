import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import JadwalTugas from '@/components/JadwalTugas';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function JadwalTugasPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }
  const userId = session.user.id;

  const res = await pool.query(
    `SELECT id, title, "dueDate", done, "fileName", content, "createdAt"
       FROM tasks
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC`,
    [userId]
  );

  const initialTasks = res.rows.map((r) => ({
    id: r.id,
    title: r.title,
    dueDate: r.dueDate ?? '',
    done: Boolean(r.done),
    fileName: r.fileName ?? null,
    content: r.content ?? null,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <JadwalTugas initialTasks={initialTasks} />
        </div>
      </main>
    </>
  );
}
