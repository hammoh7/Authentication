// For Edge compatibility

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByMail } from "./data/user";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"


export default {
  providers: [
    Google({
      clientId: process.env.Google_Id,
      clientSecret: process.env.Google_Secret,
    }),
    Github({
      clientId: process.env.Github_Id,
      clientSecret: process.env.Github_Secret,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByMail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
