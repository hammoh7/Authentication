"use server";

import { database } from "@/lib/database";
import { getUserByMail } from "@/data/user";
import { TokenVerificationByToken } from "@/data/token-verification";

export const confirmVerification = async (token: string) => {
  const existingToken = await TokenVerificationByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token expired!" };
  }

  const existingUser = await getUserByMail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exists" };
  }

  await database.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await database.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Email verified successfully" };
};
