import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { loginByGoogle } from "/services/authenticationServices";

import { store } from "/store";
import { login } from "/store/reducers/user";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions };

export { handler as GET, handler as POST };
