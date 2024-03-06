import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId:string) => {
  try {
    const twofactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return twofactorConfirmation;
  } catch (error) {
    console.log("getTwoFactorConfirmationByUserId", error);
    return null;
  }
};
