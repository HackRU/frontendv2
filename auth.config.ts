import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
   pages: {
     signIn: '/login',
   },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  session:{
    maxAge: 259200,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return true; // Redirect unauthenticated users to login page
      } 
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnLogin && isLoggedIn){
        //return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
