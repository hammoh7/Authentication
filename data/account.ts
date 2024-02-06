import { database } from "@/lib/database";

export const accountByUserId = async (userId: string) => {
  try {
    const account = await database.account.findFirst({
      where: { userId },
    });
    return account;
  } catch (error) {
    return null;
  }
};
