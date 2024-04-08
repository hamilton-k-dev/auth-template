import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email:string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email: email,
      },
    });
    return verificationToken;
  } catch (error) {
    null;
  }
};
export const getVerificationTokenByToken = async (token:string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch (error) {
    null;
  }
};
