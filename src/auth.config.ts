import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboardPage = nextUrl.pathname.startsWith('/dashboard');
      const isAuthPage = nextUrl.pathname === '/sign-in' || nextUrl.pathname === '/sign-up';

      if (isDashboardPage) {
        if (isLoggedIn) return true;
        return false;
      }

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
