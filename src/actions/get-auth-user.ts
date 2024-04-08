"use server"

import { auth } from "@/auth"

const getAuthUser = async () => {
 try {
    const session = await auth();
    return session!.user
 } catch (error) {
    console.log("Error trying to get auth user in actionn", error)
    return null
 }
}

export default getAuthUser