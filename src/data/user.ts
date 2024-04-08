import { db } from "@/lib/db";

export const getUserByEmail = async (email:string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getUserById = async (id:string|undefined) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const getAccountByUserId = async (id:string) => {
  try {
    const account = await db.account.findFirst({ 
        where: { 
            userId: id
        }
     });
    return account;
  } catch (error) {
    return null;
  }
};
