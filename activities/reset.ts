"use server";

import { ResetSchema } from "@/schemas";
import { getUserByMail } from "@/data/user";
import * as z from "zod";
import { sendPasswordResetEmail } from "@/lib/email";
import { getPasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByMail(email);

  if (!existingUser) {
    return { error: "Email not recognized" };
  }

  const passwordResetToken = await getPasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Mail sent successfully!" };
};
