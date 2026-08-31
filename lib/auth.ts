import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import NeonAdapter from '@auth/neon-adapter';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NeonAdapter(pool),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        (session.user as { id: string }).id = user.id;
      }
      return session;
    },
    signIn({ user }) {
      const email = user?.email;
      if (!email) return false;

      const allowed = (process.env.ALLOWED_EMAILS || '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      // Empty allowlist means public access. Fill ALLOWED_EMAILS only when a private rollout is needed.
      return allowed.length === 0 || allowed.includes(email.toLowerCase());
    },
  },
});
