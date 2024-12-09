import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { authConfig } from './auth.config';

import { authUser } from './app/lib/api/actions';

//https://api.hackru.org/dev/authorize

//ADD BACK EMAIL TO VALIDATION

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          // .object({ email: z.string().email(), password: z.string() })
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const resp = await authUser(email, password);
          let user = null;
          if (resp.response != '')
            user = { email: email, id: email, name: resp.response };

          return user;
        }
        return null;
      },
    }),
  ],
});
