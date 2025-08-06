"use server"

import { cookies } from "next/headers"

export async function logout(){
    const userCookies = await cookies();

    userCookies.delete("token")
}