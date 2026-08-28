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
  },
});
