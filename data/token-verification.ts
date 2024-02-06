import { database } from "@/lib/database";

export const TokenVerificationByEmail = async (email: string) => {
  try {
    const verificationToken = await database.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
export const TokenVerificationByToken = async (token: string) => {
  try {
    const verificationToken = await database.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
