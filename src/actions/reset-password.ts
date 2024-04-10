"use server"

import bcrypt from "bcryptjs"

import * as z from "zod"
import { ResetPasswordSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { getTranslations } from "next-intl/server"
export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const t = await getTranslations('action');
    try {

        const validatedFields = ResetPasswordSchema.safeParse(values)
        if (!validatedFields.success) return { error: t("invalidF") }
        const { email, password, token } = validatedFields.data
        if (!email && !token && !password) return { error: t("emailNotexist") }
        if (email && !token && !password) {
            const dbUser = await getUserByEmail(email)
            if (!dbUser) return { error: t("noUser") }
            const resetToken = await generatePasswordResetToken(email);
            await sendPasswordResetEmail(resetToken.email, resetToken.token)
            return { success: t("passwordRTS"), validEmail: true }
        }
        if (email && token && !password) {
            const validatedFields = ResetPasswordSchema.safeParse(values)
            if (!validatedFields.success) return { error: t("invalidF") }
            const dbToken = await getPasswordResetTokenByToken(token)
            if (!dbToken) return { error: t("invalidT") }
            return { success: "type your new password!", validEmail: true, validToken: true }
        }
        if (email && token && password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const dbUser = await getUserByEmail(email)
            if (!dbUser) return { error: t("noUser") }
            await db.user.update({
                where: {
                    email,
                },
                data: {
                    password: hashedPassword
                }
            })
            return { success: t("passwordReset"), validEmail: true, validToken: true, passwordReset: true }
        }
        return { error: "something went wrong" }

    } catch (error) {
        console.log(error)
        return { error: "something went wrong" }
    }
}