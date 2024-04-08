"use server"

import bcrypt from "bcryptjs"

import * as z from "zod"
import { ResetPasswordSchema} from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"
import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
export const resetPassword = async (values:z.infer<typeof ResetPasswordSchema>)=>{
    try {
    const validatedFields = ResetPasswordSchema.safeParse(values)
    if(!validatedFields.success) return {error :"invalid fields !"}
    const {email,password,token} = validatedFields.data
    if(!email && !token && !password) return {error :"this email does'nt exist !"}
    if(email && !token && !password){
        const dbUser = await getUserByEmail(email)
        if(!dbUser)  return {error :"there is not user with this email address"}
        const resetToken = await generatePasswordResetToken(email);
        await sendPasswordResetEmail(resetToken.email, resetToken.token)
        return {success :"password reset token send ! check your email",validEmail:true}
    }
    if(email && token && !password){
        const validatedFields = ResetPasswordSchema.safeParse(values)
        if(!validatedFields.success) return {error :"invalid fields !"}
        const dbToken = await getPasswordResetTokenByToken(token)
        if(!dbToken)  return {error :"invalid token !"}
        return {success :"Enter your new password!",validEmail:true,validToken:true}
    }
    if(email && token && password){
        const hashedPassword = await bcrypt.hash(password, 10);
        const dbUser = await getUserByEmail(email)
        if(!dbUser)  return {error :"there is not useer with this email addres"}
        await db.user.update({
            where:{
                email,
            },
            data:{
                password:hashedPassword
            }
        })
        return {success :"password reset succesfully!",validEmail:true,validToken:true,passwordReset:true}
    } 
    return {error :"something went wrong"}
    
    } catch (error) {
        console.log(error)
        return {error :"something went wrong"}
    }
}