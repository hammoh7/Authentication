import { PasswordResetByEmail } from "@/data/reset-password-token";
import { v4 as uuidv4 } from "uuid";
import { database } from "./database";
import { TokenVerificationByEmail } from "@/data/token-verification";

export const getVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000); //expires in 20 minutes

  const existingToken = await TokenVerificationByEmail(email);
  if (existingToken) {
    await database.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await database.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const getPasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 20 * 60 * 1000);

  const existingToken = await PasswordResetByEmail(email);
  if (existingToken) {
    await database.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await database.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return passwordResetToken;
};
