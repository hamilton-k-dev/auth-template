"use server"
import { db } from "@/lib/db"


export const getUserByEId = async (id:string) => {
    try {
        const user = await db.user.findUnique({
            where:{
                id
            }
        })
        return user
    } catch (error) {
        console.log("Error trying to get the user by id in action", error)
        return null
    }
  
}
