"use server"

import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getTranslations } from "next-intl/server"
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const t = await getTranslations('action');
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) return { error: t("invalidF") }
  const { email, password, token } = validatedFields.data
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: t("emailNotexist") };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (token) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: t("invalidCode") };
      }
      if (twoFactorToken.token != token) {
        return { error: t("invalidCode") };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      console.log({ hasExpired });
      if (hasExpired) {
        return { error: t("codeExpired") };
      }
      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      console.log({ existingConfirmation });
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: t("invalidC") }

        default:
          return { error: t("sWrong") }
      }
    }
    throw error
  }
  return { error: t("sWrong") }
}