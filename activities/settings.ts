"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { database } from "@/lib/database";
import { SettingsSchema } from "@/schemas";
import { getUserById, getUserByMail } from "@/data/user";
import { currentUserAuth } from "@/lib/auth";
import { update } from "@/auth";
import { getVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/email";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUserAuth();
  if (!user) {
    return { error: "Access Denied" };
  }

  const databaseUser = await getUserById(user.id);
  if (!databaseUser) {
    return { error: "Access Denied" };
  }

  if (user.isOAuth) {
    (values.email = undefined),
    (values.password = undefined),
    (values.newPassword = undefined);
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByMail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }
    const verificationToken = await getVerificationToken(values.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    
    return { success: "Verification Email sent!" } 
  }

  if (values.password && values.newPassword && databaseUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password, databaseUser.password
    )
    if (!passwordMatch) {
      return { error: "Incorrect password!" }
    }
    const hashedPassword = await bcrypt.hash(
      values.newPassword, 10
    )
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await database.user.update({
    where: { id: databaseUser.id },
    data: {
      ...values,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    }
  });

  return { success: "Updated !!!" };
};
