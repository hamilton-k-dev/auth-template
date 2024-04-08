import NextAuth from "next-auth"


import {PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db"
import authConfig from "@/auth.config"
import { getAccountByUserId, getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

export const {
  handlers: { GET, POST },
  auth,
  signIn,signOut
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/error/auth",
      },
      events: {
        async linkAccount({ user }) {
          await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              emailVerified: new Date(),
            },
          });
        },
      },
      callbacks: {
        async signIn({ user, account }) {
          if (account?.provider !== "credentials") return true;
          const existingUser = await getUserById(user.id);
          //Prevent loging witout email verification.
          if (!existingUser || !existingUser.emailVerified) return false;
          if (existingUser.isTwoFactorEnabled) {
            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
              existingUser.id
            );
            console.log({ twoFactorConfirmation });
            if (!twoFactorConfirmation) return false;
            await db.twoFactorConfirmation.delete({
              where: {
                id: twoFactorConfirmation.id,
              },
            });
          }
          return true;
        },
        async session({ token, session }) {
          if (token.sub && session.user) {
            session.user.id = token.sub;
          }
          if (token.firstName && session.user) {
            session.user.firstName = token.firstName as string ;
          }
          if (token.lastName && session.user) {
            session.user.lastName = token.lastName as string ;
          }
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
          session.user.image = token.image as string;
          session.user.isOAuth = token.isOAuth as boolean ;
          return session;
        },
        async jwt({ token }) {
          if (!token.sub) return token;
          const existingUser = await getUserById(token.sub);
          if (!existingUser) return token;
          const existingAccount = await getAccountByUserId(token.sub);
          token.isOAuth = !!existingAccount;
         
          token.firstName = existingUser.firstName;
          token.lastName = existingUser.lastName;
          token.image = existingUser.image;
          token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
          return token;
        },
      },
    adapter :PrismaAdapter(db),
    session:{strategy:"jwt"},
  ...authConfig
})
