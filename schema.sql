-- NextAuth (Auth.js) schema untuk @auth/neon-adapter
-- (nama tabel & kolom harus PERSIS sesuai yang dipakai adapter)

-- users: id otomatis (adapter tidak mengirim id saat createUser)
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT,
  "email" TEXT,
  "emailVerified" TIMESTAMP WITH TIME ZONE,
  "image" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE
);

-- accounts: butuh kolom id otomatis (adapter RETURNING id)
CREATE TABLE IF NOT EXISTS "accounts" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" BIGINT,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_providerAccountId"
  ON "accounts"("provider", "providerAccountId");

-- sessions: butuh kolom id otomatis (adapter RETURNING id)
CREATE TABLE IF NOT EXISTS "sessions" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "sessionToken" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP WITH TIME ZONE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- verification_token (TUNGGAL, sesuai adapter)
CREATE TABLE IF NOT EXISTS "verification_token" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP WITH TIME ZONE NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE,
  CONSTRAINT "verification_token_pkey" PRIMARY KEY ("identifier", "token")
);

-- Tabel aplikasi: riwayat rangkuman per user (id dibuat oleh aplikasi)
CREATE TABLE IF NOT EXISTS "histories" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "fileName" TEXT,
  "summary" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "histories_userId_idx" ON "histories"("userId");

-- Tabel aplikasi: jadwal tugas per user (id dibuat oleh aplikasi)
CREATE TABLE IF NOT EXISTS "tasks" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "dueDate" TEXT,
  "done" BOOLEAN DEFAULT FALSE,
  "fileName" TEXT,
  "content" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "tasks_userId_idx" ON "tasks"("userId");

-- Tabel aplikasi: statistik kunjungan situs (visitor counter)
-- Satu baris tunggal menyimpan total kunjungan unik.
CREATE TABLE IF NOT EXISTS "site_stats" (
  "id" TEXT PRIMARY KEY DEFAULT 'site',
  "total_visits" BIGINT NOT NULL DEFAULT 0,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
