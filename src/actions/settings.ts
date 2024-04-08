"use server"

import bcrypt from "bcryptjs"

import * as z from "zod"
import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/data/user"
import { db } from "@/lib/db"
import getAuthUser from "./get-auth-user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { getVerificationTokenByToken } from "@/data/verification-token"
export const settings = async (values:z.infer<typeof SettingsSchema>)=>{
    try {
      const validatedFields = SettingsSchema.safeParse(values)
    if(!validatedFields.success) return {error :"invalid fields !"}
    
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await getAuthUser()
    if (user!.isOAuth) {
      validatedFields.data.email = undefined;
      validatedFields.data.password = undefined;
      validatedFields.data.newPassword = undefined;
      validatedFields.data.isTwoFactorEnabled = false;
    }
    if ( validatedFields.data.email &&  validatedFields.data.email != user!.email && ! validatedFields.data.token) {
      const existingUser = await getUserByEmail(validatedFields.data.email);
      if (existingUser && existingUser.id != user!.id) {
        return { error: "email deja utilisé", email: "Email deja utilisé" };
      }
      const verificationToken = await generateVerificationToken(validatedFields.data.email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return {
        success: "Email de verification envoyé",
        verificationToken: true,
      };
    }
    if ( validatedFields.data.email &&  validatedFields.data.email != user!.email && validatedFields.data.token) {
      const existingUser = await getUserByEmail(validatedFields.data.email);
      if (existingUser && existingUser.id != user!.id) {
        return { error: "email deja utilisé", email: "Email deja utilisé" };
      }
      const verificationToken = getVerificationTokenByToken(validatedFields.data.token)
      if(!verificationToken){
        return {error :"invalid token"}
      }
    }
    
    const dbUser = await getUserById(user!.id)
    if (validatedFields.data.password && validatedFields.data.newPassword && dbUser!.password) {
      const passwordMatch = await bcrypt.compare(
        validatedFields.data.password,
        dbUser!.password
      );
      if (!passwordMatch) {
        return {
          error: "Mots de passe incorrect",
          password: "Mots de passe incorrect",
        };
      }
      const hashedPassword = await bcrypt.hash(validatedFields.data.newPassword, 10);
      validatedFields.data.password = hashedPassword;
      validatedFields.data.newPassword = undefined;
    }else{
      validatedFields.data.password = undefined;
      validatedFields.data.newPassword = undefined;
    }
    validatedFields.data.token = undefined;
    const updatedUser = await db.user.update({
      where:{
       id:user!.id
      },
      data:{
        ...validatedFields.data
      }
    })
    return {success :"User info updated!"}
    } catch (error) {
      console.log("Error updatings user information", error)
      return { error: "Non authorisé" };
      
    }
}