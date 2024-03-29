"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { database } from "@/lib/database";
import { RegisterSchema } from "@/schemas";
import { getUserByMail } from "@/data/user";
import { getVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByMail(email);

  if (existingUser) {
    return { error: "Email already exists!" };
  }
  await database.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await getVerificationToken(email);

  // To send verification token email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Verify email for confirmation" };
};
