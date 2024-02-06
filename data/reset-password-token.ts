import { database } from "@/lib/database";

export const PasswordResetByToken = async (token: string) => {
  try {
    const passwordResetToken = await database.resetPasswordToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};

export const PasswordResetByEmail = async (email: string) => {
  try {
    const passwordResetToken = await database.resetPasswordToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
