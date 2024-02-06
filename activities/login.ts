"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn, signOut } from "@/auth";
import { Default_Login_Redirect } from "@/routes";
import { AuthError } from "next-auth";
import { getVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";
import { getUserByMail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByMail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email not verified" };
  }

  // SignIn after email verification

  if (!existingUser.emailVerified) {
    const verificationToken = await getVerificationToken(existingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: Default_Login_Redirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
