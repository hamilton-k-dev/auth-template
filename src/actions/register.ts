"use server"

import bcrypt from "bcryptjs"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db"
import { getTranslations } from "next-intl/server"
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const t = await getTranslations('action');

  try {

    const validatedFields = RegisterSchema.safeParse(values)
    if (!validatedFields.success) return { error: t("invalidF") }
    const { email, token, firstName, lastName, password } = validatedFields.data
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { error: t("emailAU") };
    }
    if (email && !token) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(verificationToken.email, verificationToken.token);
      return { success: t("tokenSend"), emailSend: true }
    }
    if (email && token && !firstName && !password) {
      const dbToken = await getVerificationTokenByToken(token)
      if (!dbToken) return { error: t("invalidT") }
      return { success: t("validT"), emailSend: true, validToken: true }
    }
    if (email && token && firstName && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const dbToken = await getVerificationTokenByToken(token)
      if (!dbToken) return { error: t("invalidT"), validToken: false }
      await db.user.create({
        data: {
          firstName,
          lastName,
          email: dbToken!.email,
          password: hashedPassword,
        },
      });
      await db.verificationToken.deleteMany({
        where: {
          token,
        },
      });

      return { success: t("accountC"), emailSend: true, validToken: true, registrationCompleted: true }
    }

    return { error: t("sWrong") }
  } catch (error) {
    console.log("error on registration", error)
    return { error: t("sWrong") }

  }
}