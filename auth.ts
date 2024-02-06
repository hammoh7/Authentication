import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { database } from "@/lib/database";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { accountByUserId } from "./data/account";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/Login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await database.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allowing OAuth without email verification
      if (account?.provider === "credentials") {
        return true;
      }

      // Prevent to SignIn without email verification

      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      const existingAccount = await accountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.role = existingUser.role as string; // type error (can be ignored when focusing on functionality)
      token.name = existingUser.name;
      token.email = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(database),
  session: { strategy: "jwt" },
  ...authConfig,
});
