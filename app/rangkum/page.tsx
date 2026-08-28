import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import RangkumTool from '@/components/RangkumTool';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function SummarizePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }
  const userId = session.user.id;

  const res = await pool.query(
    `SELECT id, "fileName", summary, "createdAt"
       FROM histories
      WHERE "userId" = $1
      ORDER BY "createdAt" DESC`,
    [userId]
  );

  const initialHistory = res.rows.map((r) => ({
    id: r.id,
    fileName: r.fileName ?? 'dokumen',
    summary: r.summary,
    createdAt: r.createdAt,
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <RangkumTool initialHistory={initialHistory} />
        </div>
      </main>
    </>
  );
}
