import Credentials from "next-auth/providers/credentials";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "@/data/user";

import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { NextAuthConfig } from "next-auth";
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          email: profile.email,
          firstName:profile.given_name,
          lastName:profile.family_name,
          image: profile.picture
        }
      }
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          email: profile.email,
          firstName:profile.name?.split(" ")[0],
          lastName:profile.name?.split(" ")[1],
          image: profile.avatar_url
        }
      }
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if(validatedFields.success){
            const {email,password} = validatedFields.data
            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;
            const passwordsMatch = await bcrypt.compare(
            password,
            user.password
            );
            if (passwordsMatch) return user;
        } 
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig
